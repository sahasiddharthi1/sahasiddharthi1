import json, os, sys, urllib.request, urllib.error
from datetime import datetime, timezone

USERNAME = "sahasiddharthi1"

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
        raise RuntimeError(f"GitHub API HTTP {e.code} for {url}: {body}") from e

def fetch_tenure():
    token = os.environ.get("GITHUB_TOKEN")
    user = _get(f"https://api.github.com/users/{USERNAME}", token)
    if isinstance(user, dict) and "message" in user and "created_at" not in user:
        raise RuntimeError(f"GitHub API error: {user.get('message')}")
    created = datetime.fromisoformat(user["created_at"].replace("Z", "+00:00"))
    now = datetime.now(timezone.utc)
    months_total = (now.year - created.year) * 12 + (now.month - created.month)
    years, months = divmod(months_total, 12)
    return created, now, years, months

W, H = 900, 240
BG = "#040711"
BLUE = "#00E5FF"
DIM = "#3a5570"
TEXT = "#d6f0ff"

def build_svg(created, now, years, months):
    line_y = 150
    x0, x1 = 90, W - 90

    if years and months:
        duration_str = f"{years} YR {months} MO"
    elif years:
        duration_str = f"{years} YEAR{'S' if years != 1 else ''}"
    else:
        duration_str = f"{months} MONTH{'S' if months != 1 else ''}"

    svg = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">']
    svg.append('''<defs>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="2.5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>''')
    svg.append(f'<rect x="0" y="0" width="{W}" height="{H}" rx="16" fill="{BG}" stroke="#0d2847" stroke-width="1.5"/>')

    # endpoint labels
    svg.append(f'<text x="{x0}" y="{line_y-46}" text-anchor="middle" font-family="monospace" font-size="11" fill="{DIM}">ACCOUNT CREATED</text>')
    svg.append(f'<text x="{x0}" y="{line_y-30}" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="13" fill="{TEXT}">{created.strftime("%b %Y").upper()}</text>')
    svg.append(f'<text x="{x1}" y="{line_y-46}" text-anchor="middle" font-family="monospace" font-size="11" fill="{DIM}">TODAY</text>')
    svg.append(f'<text x="{x1}" y="{line_y-30}" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="13" fill="{TEXT}">{now.strftime("%b %Y").upper()}</text>')

    # base track
    svg.append(f'<line x1="{x0}" y1="{line_y}" x2="{x1}" y2="{line_y}" stroke="#0d2847" stroke-width="3" stroke-linecap="round"/>')

    # animated draw-on progress line
    track_len = x1 - x0
    svg.append(f'<line x1="{x0}" y1="{line_y}" x2="{x1}" y2="{line_y}" stroke="{BLUE}" stroke-width="3" stroke-linecap="round" '
               f'filter="url(#glow)" stroke-dasharray="{track_len}" stroke-dashoffset="{track_len}">'
               f'<animate attributeName="stroke-dashoffset" values="{track_len};0;0;{track_len}" '
               f'keyTimes="0;0.5;0.85;1" dur="9s" begin="0s" repeatCount="indefinite"/></line>')

    # endpoint dots
    for x in (x0, x1):
        svg.append(f'<circle cx="{x}" cy="{line_y}" r="4" fill="{BLUE}" filter="url(#glow)"/>')

    # year tick marks along the track, purely for scale reference
    total_days = (now - created).days
    if total_days > 0:
        d = created
        while d < now:
            frac = (d - created).days / total_days
            tx = x0 + frac * track_len
            if x0 + 20 < tx < x1 - 20:
                svg.append(f'<line x1="{tx:.1f}" y1="{line_y-6}" x2="{tx:.1f}" y2="{line_y+6}" stroke="{DIM}" stroke-width="1.5"/>')
                svg.append(f'<text x="{tx:.1f}" y="{line_y+22}" text-anchor="middle" font-family="monospace" font-size="9.5" fill="{DIM}">{d.year}</text>')
            d = d.replace(year=d.year + 1)

    # headline duration callout
    svg.append(f'<text x="{W/2}" y="{line_y+62}" text-anchor="middle" font-family="monospace" font-weight="bold" '
               f'font-size="22" fill="{BLUE}" filter="url(#glow)" opacity="0">'
               f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.55;0.75" dur="9s" begin="0s" fill="freeze"/>'
               f'{duration_str} ON GITHUB</text>')

    svg.append('</svg>')
    return "\n".join(svg)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(script_dir, "..", "waveform-stats.svg")
    created, now, years, months = fetch_tenure()
    svg_content = build_svg(created, now, years, months)
    with open(out_path, "w") as f:
        f.write(svg_content)
    print(f"wrote {out_path} -- account created {created.date()}, tenure: {years}y {months}m")
