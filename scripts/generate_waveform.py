import json, os, urllib.request, urllib.error
from datetime import datetime

USERNAME = "sahasiddharthi1"
BUCKETS = [
    ("NIGHT",     0, 6,  "12AM\u20136AM"),
    ("MORNING",   6, 12, "6AM\u201312PM"),
    ("AFTERNOON", 12, 18, "12PM\u20136PM"),
    ("EVENING",   18, 24, "6PM\u201312AM"),
]

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
        # a single repo's commit list can 409 (empty repo) or 404 -- skip, don't crash the whole run
        if e.code in (404, 409):
            return []
        raise RuntimeError(f"GitHub API HTTP {e.code} for {url}: {body}") from e

def fetch_commit_hours():
    token = os.environ.get("GITHUB_TOKEN")
    repos = _get(f"https://api.github.com/users/{USERNAME}/repos?per_page=100", token)
    if isinstance(repos, dict):
        raise RuntimeError(f"GitHub API error: {repos.get('message', repos)}")
    repos = [r for r in repos if r["name"].lower() != USERNAME.lower() and not r.get("fork")]

    hours = []
    for r in repos:
        commits = _get(f"https://api.github.com/repos/{USERNAME}/{r['name']}/commits?per_page=100", token)
        if not isinstance(commits, list):
            continue
        for c in commits:
            try:
                # NOTE: GitHub's API preserves the ORIGINAL git author timezone offset
                # (e.g. "+05:30"), it does not force-convert to UTC -- so parsing this
                # with fromisoformat and reading .hour gives the committer's local hour,
                # not a UTC-shifted one. Verified against GitHub's documented commit
                # object format; could not re-confirm live this session (rate-limited).
                date_str = c["commit"]["author"]["date"]
                dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
                hours.append(dt.hour)
            except (KeyError, ValueError):
                continue

    if not hours:
        raise RuntimeError("No commit timestamps found across any repo")

    counts = {name: 0 for name, *_ in BUCKETS}
    for h in hours:
        for name, start, end, _ in BUCKETS:
            if start <= h < end:
                counts[name] += 1
                break

    total = len(hours)
    usage = [(name, counts[name] / total * 100, label) for name, _, _, label in BUCKETS]
    return usage, total

W, H = 900, 240
BG = "#040711"
BLUE = "#00E5FF"
DIM = "#3a5570"
TEXT = "#d6f0ff"

def build_svg(usage, total_commits):
    """usage: list of (bucket_name, percent, time_label), one per BUCKETS entry, in NIGHT->EVENING order."""
    baseline = H - 46
    top_margin = 58
    max_pct = max(p for _, p, _ in usage) or 1
    n = len(usage)
    seg = W / (n + 0.5)

    pts = []
    for i, (name, p, label) in enumerate(usage):
        x = seg * (i + 0.75)
        peak_y = baseline - (p / max_pct) * (baseline - top_margin)
        pts.append((x, peak_y, name, p, label))

    d = f"M0,{baseline} "
    prev_x, prev_y = 0, baseline
    for x, py, *_ in pts:
        c1x = prev_x + (x - prev_x) * 0.4
        c2x = prev_x + (x - prev_x) * 0.6
        d += f"C{c1x:.1f},{prev_y:.1f} {c2x:.1f},{py:.1f} {x:.1f},{py:.1f} "
        prev_x, prev_y = x, py
    nxt = W
    c1x = prev_x + (nxt - prev_x) * 0.4
    c2x = prev_x + (nxt - prev_x) * 0.6
    d += f"C{c1x:.1f},{prev_y:.1f} {c2x:.1f},{baseline} {nxt:.1f},{baseline}"

    svg = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">']
    svg.append('''<defs>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="2.5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.28"/>
    <stop offset="100%" stop-color="#00E5FF" stop-opacity="0"/>
  </linearGradient>
</defs>''')
    svg.append(f'<rect x="0" y="0" width="{W}" height="{H}" rx="16" fill="{BG}" stroke="#0d2847" stroke-width="1.5"/>')
    svg.append(f'<line x1="20" y1="{baseline}" x2="{W-20}" y2="{baseline}" stroke="#0d2847" stroke-width="1" stroke-dasharray="4 4"/>')
    svg.append(f'<path d="{d} L{W},{H} L0,{H} Z" fill="url(#fill)" opacity="0">'
               f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.4;0.6" dur="9s" begin="0s" fill="freeze"/></path>')

    DASH = 4000
    svg.append(f'<path d="{d}" fill="none" stroke="{BLUE}" stroke-width="2.5" filter="url(#glow)" '
               f'stroke-dasharray="{DASH}" stroke-dashoffset="{DASH}">'
               f'<animate attributeName="stroke-dashoffset" values="{DASH};0;0;{DASH}" '
               f'keyTimes="0;0.45;0.9;1" dur="9s" begin="0s" repeatCount="indefinite"/></path>')

    for i, (x, py, name, p, label) in enumerate(pts):
        begin = round(0.45 * 9 * (i + 1) / n, 2)
        svg.append(f'<circle cx="{x:.1f}" cy="{py:.1f}" r="3.5" fill="{BLUE}" filter="url(#glow)" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/></circle>')
        svg.append(f'<text x="{x:.1f}" y="{py-33}" text-anchor="middle" font-family="monospace" font-weight="bold" '
                   f'font-size="14" fill="{TEXT}" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/>{name}</text>')
        svg.append(f'<text x="{x:.1f}" y="{py-19}" text-anchor="middle" font-family="monospace" font-size="9.5" '
                   f'fill="{DIM}" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/>{label}</text>')
        svg.append(f'<text x="{x:.1f}" y="{py-6}" text-anchor="middle" font-family="monospace" font-size="11" '
                   f'fill="{BLUE}" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/>{p:.0f}%</text>')

    svg.append(f'<text x="{W-24}" y="{H-14}" text-anchor="end" font-family="monospace" font-size="9" fill="{DIM}">'
               f'based on {total_commits} recent commits, local commit time</text>')
    svg.append('</svg>')
    return "\n".join(svg)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(script_dir, "..", "waveform-stats.svg")
    usage, total = fetch_commit_hours()
    svg_content = build_svg(usage, total)
    with open(out_path, "w") as f:
        f.write(svg_content)
    print(f"wrote {out_path} from {total} commits: {[(n, round(p,1)) for n,p,_ in usage]}")
