import json, os, re, urllib.request, urllib.error
from datetime import date
from bs4 import BeautifulSoup

USERNAME = "sahasiddharthi1"

def fetch_contribution_days():
    url = f"https://github.com/users/{USERNAME}/contributions"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode()
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"Failed to fetch contributions page: HTTP {e.code}") from e

    soup = BeautifulSoup(html, 'html.parser')
    days = []
    for td in soup.select('td.ContributionCalendar-day'):
        d, level, cell_id = td.get('data-date'), td.get('data-level'), td.get('id')
        if not d:
            continue
        tooltip = soup.find('tool-tip', attrs={'for': cell_id})
        count = 0
        if tooltip:
            m = re.match(r'(\d+|No) contributions?', tooltip.get_text())
            if m:
                count = 0 if m.group(1) == 'No' else int(m.group(1))
        days.append({'date': d, 'level': int(level) if level else 0, 'count': count})
    if not days:
        raise RuntimeError("No contribution cells found -- GitHub's page structure may have changed")
    return days

TILE_W, TILE_H = 12, 6
HEIGHT_UNIT = 8
LEVEL_COLORS = {
    0: ("#0d1b2a", "#0a1520", "#081019"),
    1: ("#0e3a5c", "#0a2c47", "#082238"),
    2: ("#0e6ba8", "#0a5384", "#083f66"),
    3: ("#00a8d6", "#0089b3", "#006d90"),
    4: ("#00E5FF", "#00b8cc", "#0094a8"),
}

def iso_project(col, row, z=0):
    x = (col - row) * (TILE_W / 2)
    y = (col + row) * (TILE_H / 2) - z
    return x, y

def draw_block(col, row, level, count, date_str):
    h = level * HEIGHT_UNIT if level > 0 else 1.5
    top_c, left_c, right_c = LEVEL_COLORS[level]
    x, yb = iso_project(col, row)
    N = (x, yb - h - TILE_H/2); E = (x + TILE_W/2, yb - h)
    S = (x, yb - h + TILE_H/2); Wc = (x - TILE_W/2, yb - h)
    Sb = (x, yb + TILE_H/2); Wb = (x - TILE_W/2, yb); Eb = (x + TILE_W/2, yb)
    title = f"{count} contribution{'s' if count != 1 else ''} on {date_str}"
    glow = ' filter="url(#glow)"' if level >= 3 else ''
    return (f'<g{glow}><title>{title}</title>'
            f'<polygon points="{N[0]:.1f},{N[1]:.1f} {E[0]:.1f},{E[1]:.1f} {S[0]:.1f},{S[1]:.1f} {Wc[0]:.1f},{Wc[1]:.1f}" fill="{top_c}"/>'
            f'<polygon points="{Wc[0]:.1f},{Wc[1]:.1f} {S[0]:.1f},{S[1]:.1f} {Sb[0]:.1f},{Sb[1]:.1f} {Wb[0]:.1f},{Wb[1]:.1f}" fill="{left_c}"/>'
            f'<polygon points="{S[0]:.1f},{S[1]:.1f} {E[0]:.1f},{E[1]:.1f} {Eb[0]:.1f},{Eb[1]:.1f} {Sb[0]:.1f},{Sb[1]:.1f}" fill="{right_c}"/></g>')

def build_svg(days):
    first_date = date.fromisoformat(days[0]['date'])
    offset = first_date.weekday() + 1 if first_date.weekday() != 6 else 0
    grid = {}
    for d in days:
        dt = date.fromisoformat(d['date'])
        col = ((dt - first_date).days + offset) // 7
        row = (dt.weekday() + 1) % 7
        grid[(col, row)] = d

    cells = sorted(grid.keys(), key=lambda cr: cr[0] + cr[1])
    xs, ys = [], []
    for col, row in cells:
        for z in (0, 4*HEIGHT_UNIT):
            x, y = iso_project(col, row, z)
            xs.append(x); ys.append(y)
    pad = 24
    minx, maxx = min(xs)-pad, max(xs)+pad
    miny, maxy = min(ys)-pad, max(ys)+pad
    W, H = maxx-minx, maxy-miny

    total = sum(d['count'] for d in days)
    active = sum(1 for d in days if d['count'] > 0)
    best = max(days, key=lambda d: d['count'])

    svg = [f'<svg viewBox="{minx:.0f} {miny:.0f} {W:.0f} {H:.0f}" xmlns="http://www.w3.org/2000/svg" role="img">',
           f'<title>Isometric contribution graph: {total} contributions in the last year</title>',
           '<defs><filter id="glow" x="-60%" y="-60%" width="220%" height="220%">'
           '<feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>'
           '</filter></defs>',
           f'<rect x="{minx:.0f}" y="{miny:.0f}" width="{W:.0f}" height="{H:.0f}" fill="#040711"/>']
    for col, row in cells:
        d = grid[(col, row)]
        svg.append(draw_block(col, row, d['level'], d['count'], d['date']))
    svg.append(f'<text x="{minx+16:.0f}" y="{miny+26:.0f}" font-family="monospace" font-size="13" font-weight="bold" fill="#d6f0ff">{total} contributions in the last year</text>')
    svg.append(f'<text x="{minx+16:.0f}" y="{miny+44:.0f}" font-family="monospace" font-size="10.5" fill="#3a5570">{active} active days &#183; best day: {best["count"]} on {best["date"]}</text>')
    svg.append('</svg>')
    return "\n".join(svg)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(script_dir, "..", "isometric-contributions.svg")
    days = fetch_contribution_days()
    with open(out_path, "w") as f:
        f.write(build_svg(days))
    print(f"wrote {out_path} from {len(days)} real days")
