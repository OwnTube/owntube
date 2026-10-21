# Prints the key structure of a JSON document (first array element only),
# with short string samples. usage: shape.py file.json [path.to.node] [depth]
import json, sys
def load(f):
    t = open(f).read()
    if f.endswith('.html') or t.lstrip().startswith('<'):
        import re
        var = sys.argv[4] if len(sys.argv) > 4 else 'ytInitialData'
        m = re.search(r'var %s = ' % var, t)
        return json.JSONDecoder().raw_decode(t, m.end())[0]
    return json.loads(t)
def walk(o, d, ind, maxd):
    sp = '  ' * ind
    if isinstance(o, dict):
        for k, v in o.items():
            if k in ('trackingParams', 'clickTrackingParams', 'loggingDirectives', 'serviceTrackingParams'): continue
            if isinstance(v, (dict, list)):
                print(f'{sp}{k}:' + (f' [{len(v)}]' if isinstance(v, list) else ''))
                if d < maxd: walk(v, d + 1, ind + 1, maxd)
            else:
                print(f'{sp}{k}: {json.dumps(v)[:80]}')
    elif isinstance(o, list) and o:
        kinds = []
        for x in o:
            k = list(x.keys())[0] if isinstance(x, dict) and x else type(x).__name__
            if k not in kinds: kinds.append(k)
        if len(kinds) > 1: print(f'{sp}(item kinds: {kinds})')
        walk(o[0], d, ind, maxd)
o = load(sys.argv[1])
if len(sys.argv) > 2 and sys.argv[2] not in ('', '.'):
    for p in sys.argv[2].split('.'):
        o = o[int(p)] if p.isdigit() else o[p]
walk(o, 0, 0, int(sys.argv[3]) if len(sys.argv) > 3 else 6)
