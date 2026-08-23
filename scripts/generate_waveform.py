import json, os, sys, urllib.request, urllib.error

USERNAME = "sahasiddharthi1"
MAX_PROJECTS = 6

def fetch_repos():
    url = f"https://api.github.com/users/{USERNAME}/repos?sort=pushed&per_page=100"
    req = urllib.request.Request(url, headers={"Accept": "application/vnd.github+json"})
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        if e.code == 403 and "rate limit" in body.lower():
            raise RuntimeError(
                "GitHub API rate limit hit. If this happens inside the Action, "
                "confirm the GITHUB_TOKEN env var is actually being passed to this step."
            ) from e
        raise RuntimeError(f"GitHub API HTTP {e.code}: {body}") from e
    if isinstance(data, dict):
        raise RuntimeError(f"GitHub API error: {data.get('message', data)}")
    # exclude the profile repo itself -- it isn't a "project", it's this README's home
    data = [r for r in data if r["name"].lower() != USERNAME.lower() and not r.get("fork")]
    data.sort(key=lambda r: r["pushed_at"], reverse=True)
    return data[:MAX_PROJECTS]

W, H = 900, 240
BG = "#040711"
BLUE = "#00E5FF"
DIM = "#3a5570"
TEXT = "#d6f0ff"

def build_svg(repos):
    baseline = 150
    n = len(repos)
    if n == 0:
        raise RuntimeError("No eligible repos found to plot")
    seg = W / (n + 0.5)
    pts = []
    for i in range(n):
        x = seg * (i + 0.75)
        peak_y = 60 if i % 2 == 0 else 90
        pts.append((x, peak_y))

    d = f"M0,{baseline} "
    prev_x = 0
    for x, py in pts:
        c1x = prev_x + (x - prev_x) * 0.35
        c2x = prev_x + (x - prev_x) * 0.65
        d += f"C{c1x:.1f},{baseline} {c2x:.1f},{py} {x:.1f},{py} "
        nxt = x + seg * 0.5
        c1x2 = x + (nxt - x) * 0.35
        c2x2 = x + (nxt - x) * 0.65
        d += f"C{c1x2:.1f},{py} {c2x2:.1f},{baseline} {nxt:.1f},{baseline} "
        prev_x = nxt
    d += f"L{W},{baseline}"

    svg = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">']
    svg.append('''<defs>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="2.5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>''')
    svg.append(f'<rect x="0" y="0" width="{W}" height="{H}" rx="16" fill="{BG}" stroke="#0d2847" stroke-width="1.5"/>')
    svg.append(f'<line x1="20" y1="{baseline}" x2="{W-20}" y2="{baseline}" stroke="#0d2847" stroke-width="1" stroke-dasharray="4 4"/>')

    DASH = 4000
    svg.append(f'<path d="{d}" fill="none" stroke="{BLUE}" stroke-width="2.5" filter="url(#glow)" '
               f'stroke-dasharray="{DASH}" stroke-dashoffset="{DASH}">'
               f'<animate attributeName="stroke-dashoffset" values="{DASH};0;0;{DASH}" '
               f'keyTimes="0;0.45;0.9;1" dur="9s" begin="0s" repeatCount="indefinite"/>'
               f'</path>')

    for i, ((x, py), repo) in enumerate(zip(pts, repos)):
        name = repo["name"]
        lang = repo["language"] or "—"
        begin = round(0.45 * 9 * (i + 1) / n, 2)
        svg.append(f'<circle cx="{x:.1f}" cy="{py}" r="3.5" fill="{BLUE}" filter="url(#glow)" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/></circle>')
        label_y = py - 16 if py < baseline else py + 26
        display_name = name if len(name) <= 14 else name[:13] + "…"
        svg.append(f'<text x="{x:.1f}" y="{label_y}" text-anchor="middle" font-family="monospace" font-weight="bold" '
                   f'font-size="15" fill="{TEXT}" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/>{display_name}</text>')
        svg.append(f'<text x="{x:.1f}" y="{label_y+16}" text-anchor="middle" font-family="monospace" font-size="9.5" '
                   f'fill="{DIM}" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/>{lang}</text>')

    svg.append('</svg>')
    return "\n".join(svg)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(script_dir, "..", "waveform-stats.svg")
    repos = fetch_repos()
    svg_content = build_svg(repos)
    with open(out_path, "w") as f:
        f.write(svg_content)
    print(f"wrote {out_path} from {len(repos)} live repos: {[r['name'] for r in repos]}")
