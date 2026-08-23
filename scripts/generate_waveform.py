import json, os, urllib.request, urllib.error
from datetime import datetime, timedelta, timezone

USERNAME = "sahasiddharthi1"
DAYS_PER_WINDOW = 15
NUM_WINDOWS = 2   # current 15 days + previous 15 days = 30 days of history total

# GitHub's commit API returns UTC only -- no per-commit local offset is exposed without
# one extra API call per commit, which isn't practical at this scale. This is a fixed,
# documented assumption instead of silently mislabeling UTC hours as local ones.
# Based in Hyderabad, India per resume -- change if that's ever not accurate.
LOCAL_UTC_OFFSET = timedelta(hours=5, minutes=30)

def _get(url, token):
    req = urllib.request.Request(url, headers={"Accept": "application/vnd.github+json"})
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        if e.code == 403 and "rate limit" in body.lower():
            raise RuntimeError(
                "GitHub API rate limit hit. If this happens inside the Action, "
                "confirm the GITHUB_TOKEN env var is actually being passed to this step."
            ) from e
        if e.code in (404, 409):
            return []
        raise RuntimeError(f"GitHub API HTTP {e.code} for {url}: {body}") from e

def fetch_local_commit_times():
    token = os.environ.get("GITHUB_TOKEN")
    repos = _get(f"https://api.github.com/users/{USERNAME}/repos?per_page=100", token)
    if isinstance(repos, dict):
        raise RuntimeError(f"GitHub API error: {repos.get('message', repos)}")
    repos = [r for r in repos if r["name"].lower() != USERNAME.lower() and not r.get("fork")]

    local_times = []
    for r in repos:
        commits = _get(f"https://api.github.com/repos/{USERNAME}/{r['name']}/commits?per_page=100", token)
        if not isinstance(commits, list):
            continue
        for c in commits:
            try:
                utc_dt = datetime.fromisoformat(c["commit"]["author"]["date"].replace("Z", "+00:00"))
                local_times.append(utc_dt + LOCAL_UTC_OFFSET)
            except (KeyError, ValueError):
                continue
    return local_times

W, H = 960, 300
BG = "#040711"
BLUE = "#00E5FF"
DIM = "#3a5570"
GRID = "#0d2847"
TEXT = "#d6f0ff"

def build_scatter_svg(local_times, window_index=0, today=None):
    """window_index=0 -> most recent DAYS_PER_WINDOW days; 1 -> the DAYS_PER_WINDOW before that; etc."""
    if today is None:
        today = datetime.now(timezone.utc) + LOCAL_UTC_OFFSET
    today_date = today.date()

    window_end = today_date - timedelta(days=DAYS_PER_WINDOW * window_index)
    days = [window_end - timedelta(days=i) for i in range(DAYS_PER_WINDOW - 1, -1, -1)]

    plot_left, plot_right = 60, W - 30
    plot_top, plot_bottom = 30, H - 50
    col_w = (plot_right - plot_left) / DAYS_PER_WINDOW

    def x_for(day_idx):
        return plot_left + col_w * (day_idx + 0.5)

    def y_for(hour_float):
        return plot_top + (hour_float / 24) * (plot_bottom - plot_top)

    svg = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">']
    svg.append('''<defs>
  <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
    <feGaussianBlur stdDeviation="2" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>''')
    svg.append(f'<rect x="0" y="0" width="{W}" height="{H}" rx="16" fill="{BG}" stroke="#0d2847" stroke-width="1.5"/>')

    # hour gridlines + labels (y axis)
    for h, label in [(0, "12AM"), (6, "6AM"), (12, "12PM"), (18, "6PM"), (24, "12AM")]:
        y = y_for(h)
        svg.append(f'<line x1="{plot_left}" y1="{y:.1f}" x2="{plot_right}" y2="{y:.1f}" stroke="{GRID}" stroke-width="1" stroke-dasharray="3 4"/>')
        svg.append(f'<text x="{plot_left-10}" y="{y+3:.1f}" text-anchor="end" font-family="monospace" font-size="9.5" fill="{DIM}">{label}</text>')

    # day columns + labels (x axis)
    for i, day in enumerate(days):
        x = x_for(i)
        svg.append(f'<line x1="{x:.1f}" y1="{plot_top}" x2="{x:.1f}" y2="{plot_bottom}" stroke="{GRID}" stroke-width="0.5"/>')
        label = day.strftime("%-m/%-d") if os.name != "nt" else day.strftime("%m/%d").lstrip("0")
        svg.append(f'<text x="{x:.1f}" y="{plot_bottom+18}" text-anchor="middle" font-family="monospace" font-size="9" fill="{DIM}">{label}</text>')

    # commits in true chronological order (not just by day) so the connecting line
    # reads as a single continuous path through the whole window
    day_index = {d: i for i, d in enumerate(days)}
    dated_points = [dt for dt in local_times if dt.date() in day_index]
    dated_points.sort()
    points = [(day_index[dt.date()], dt.hour + dt.minute / 60) for dt in dated_points]

    # continuous but NOT smoothed -- straight polyline segments between points, no bezier
    if len(points) >= 2:
        coords = [(x_for(di), y_for(hr)) for di, hr in points]
        path_d = f"M{coords[0][0]:.1f},{coords[0][1]:.1f} " + " ".join(
            f"L{x:.1f},{y:.1f}" for x, y in coords[1:]
        )
        approx_len = sum(
            ((coords[i][0]-coords[i-1][0])**2 + (coords[i][1]-coords[i-1][1])**2) ** 0.5
            for i in range(1, len(coords))
        )
        dash = max(int(approx_len) + 50, 100)
        svg.append(f'<path d="{path_d}" fill="none" stroke="{BLUE}" stroke-width="1.5" opacity="0.55" '
                   f'stroke-dasharray="{dash}" stroke-dashoffset="{dash}">'
                   f'<animate attributeName="stroke-dashoffset" values="{dash};0" dur="2.5s" begin="0s" fill="freeze"/></path>')

    n = max(len(points), 1)
    for i, (di, hr) in enumerate(points):
        x, y = x_for(di), y_for(hr)
        begin = round(0.7 * (i / n), 2)
        svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4" fill="{BLUE}" filter="url(#glow)" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;0.9" keyTimes="0;0.01;0.3" dur="9s" begin="{begin}s" fill="freeze"/></circle>')

    date_range = f"{days[0].strftime('%b %-d')} \u2013 {days[-1].strftime('%b %-d, %Y')}"
    svg.append(f'<text x="{plot_left}" y="18" font-family="monospace" font-size="11" fill="{TEXT}">{date_range}</text>')
    svg.append(f'<text x="{plot_right}" y="18" text-anchor="end" font-family="monospace" font-size="10" fill="{DIM}">{len(points)} commits &#183; local time (IST, UTC+5:30)</text>')

    svg.append('</svg>')
    return "\n".join(svg)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.join(script_dir, "..")
    local_times = fetch_local_commit_times()

    out_main = os.path.join(repo_root, "waveform-stats.svg")
    svg0 = build_scatter_svg(local_times, window_index=0)
    with open(out_main, "w") as f:
        f.write(svg0)
    print(f"wrote {out_main} (most recent {DAYS_PER_WINDOW} days)")

    for w in range(1, NUM_WINDOWS):
        out_w = os.path.join(repo_root, f"waveform-stats-earlier-{w}.svg")
        svgw = build_scatter_svg(local_times, window_index=w)
        with open(out_w, "w") as f:
            f.write(svgw)
        print(f"wrote {out_w} (window {w})")
