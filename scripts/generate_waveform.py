import json, sys, os

W, H = 900, 240
BG = "#040711"
BLUE = "#00E5FF"
DIM = "#3a5570"
TEXT = "#d6f0ff"

script_dir = os.path.dirname(os.path.abspath(__file__))
repo_root = os.path.join(script_dir, "..")
with open(os.path.join(repo_root, "stats.json")) as f:
    stats = json.load(f)

if not (1 <= len(stats) <= 10):
    print(f"stats.json must have 1-10 entries, found {len(stats)}", file=sys.stderr)
    sys.exit(1)
for i, s in enumerate(stats):
    if "value" not in s or "label" not in s:
        print(f"stats.json entry {i} missing 'value' or 'label'", file=sys.stderr)
        sys.exit(1)

baseline = 150
n = len(stats)
seg = W / (n + 0.5)
pts = []
for i in range(n):
    x = seg * (i + 0.75)
    peak_y = 60 if i % 2 == 0 else 90
    pts.append((x, peak_y))

d = f"M0,{baseline} "
prev_x = 0
for x, py in pts:
    ctrl1x = prev_x + (x - prev_x) * 0.35
    ctrl2x = prev_x + (x - prev_x) * 0.65
    d += f"C{ctrl1x:.1f},{baseline} {ctrl2x:.1f},{py} {x:.1f},{py} "
    nxt = x + seg*0.5
    ctrl1x2 = x + (nxt - x)*0.35
    ctrl2x2 = x + (nxt - x)*0.65
    d += f"C{ctrl1x2:.1f},{py} {ctrl2x2:.1f},{baseline} {nxt:.1f},{baseline} "
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

for i, ((x, py), s) in enumerate(zip(pts, stats)):
    num, label = s["value"], s["label"]
    begin = round(0.45*9 * (i+1)/n, 2)
    svg.append(f'<circle cx="{x:.1f}" cy="{py}" r="3.5" fill="{BLUE}" filter="url(#glow)" opacity="0">'
               f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/></circle>')
    label_y = py - 16 if py < baseline else py + 26
    svg.append(f'<text x="{x:.1f}" y="{label_y}" text-anchor="middle" font-family="monospace" font-weight="bold" '
               f'font-size="20" fill="{TEXT}" opacity="0">'
               f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/>{num}</text>')
    svg.append(f'<text x="{x:.1f}" y="{label_y+16}" text-anchor="middle" font-family="monospace" font-size="9.5" '
               f'fill="{DIM}" opacity="0">'
               f'<animate attributeName="opacity" values="0;0;1" keyTimes="0;0.01;0.2" dur="9s" begin="{begin}s" fill="freeze"/>{label}</text>')

svg.append('</svg>')
out_path = os.path.join(script_dir, "..", "waveform-stats.svg")
with open(out_path, "w") as f:
    f.write("\n".join(svg))
print(f"wrote {out_path} from {len(stats)} stats")
