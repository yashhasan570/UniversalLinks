#!/usr/bin/env python3
"""Re-apply the Universal Links rebrand after each upstream sync (idempotent).

Protected anchors (kept intact on every run):
- LICENSE.md (legal, untouched)
- The npm SDK dependency: package.json dependency key "dub" and every
  `import { Dub } from "dub"` / `new Dub(...)` SDK usage (build dependency)
- .github/ and scripts/ are excluded from the sweep entirely
"""
from pathlib import Path
import re, shutil

PAIRS = [
 ("dubinc/dub", "yashhasan570/UniversalLinks"),
 ("dubinc", "yashhasan570"),
 ("@dub/", "@universallinks/"),
 ("dub.co", "universallinks.co"),
 ("dub.link", "universallinks.link"),
 ("dub.sh", "universallinks.sh"),
 ("dubsh", "universallinkssh"),
 ("DUB_", "UNIVERSALLINKS_"),
 ("dub-monorepo", "universallinks-monorepo"),
 ("dub-cli", "universallinks-cli"),
 ("dub-hubspot-app", "universallinks-hubspot-app"),
 ("com.example.dub", "com.example.universallinks"),
]
MASKS = [
 (re.compile(r'(from\s+["\'])dub(["\'])'), r'\1__DUBSDK__\2'),
 (re.compile(r'(import\s*\(\s*["\'])dub(["\'])'), r'\1__DUBSDK__\2'),
 (re.compile(r'(require\s*\(\s*["\'])dub(["\'])'), r'\1__DUBSDK__\2'),
 (re.compile(r'new\s+Dub\('), 'new __DubSDK__('),
 (re.compile(r'import\s*\{\s*Dub\b'), 'import { __DubSDK__'),
 (re.compile(r'(:|\bas|<)\s*Dub\b'), r'\1 __DubSDK__'),
]
SKIP_EXT = {".png",".jpg",".jpeg",".ico",".webp",".woff",".woff2",".ttf",".eot",".otf",".gif",".pdf",".gz",".zip",".mp4"}
KEEP = {"LICENSE.md", "migrate.py"}
DELETE = ["apps/web/guides", "SECURITY.md", ".github/FUNDING.yml",
          ".github/ISSUE_TEMPLATE", ".github/PULL_REQUEST_TEMPLATE"]


def sweep(t):
    for a, b in PAIRS:
        t = t.replace(a, b)
    for rx, rep in MASKS:
        t = rx.sub(rep, t)
    t = re.sub(r"\bdub\b", "universallinks", t)
    t = re.sub(r"\bDUB\b", "UNIVERSALLINKS", t)
    t = re.sub(r"\bDub\b", "Universal Links", t)
    t = t.replace("__DUBSDK__", "dub").replace("__DubSDK__", "Dub")
    return t


def main():
    for d in DELETE:
        p = Path(d)
        if p.is_dir():
            shutil.rmtree(p, ignore_errors=True)
        elif p.exists():
            p.unlink()
    for p in Path(".").rglob("*"):
        if ".git" in p.parts or not p.is_file() or p.name in KEEP or p.suffix in SKIP_EXT:
            continue
        if str(p).startswith((".github/", "scripts/")):
            continue
        try:
            orig = p.read_text()
        except Exception:
            continue
        nt = sweep(orig)
        if nt != orig:
            p.write_text(nt)
    # restore the npm SDK dependency keys and lock entries
    for pkg in ["apps/web/package.json", "packages/cli/package.json"]:
        f = Path(pkg)
        if f.exists():
            t = f.read_text()
            t = t.replace('"universallinks": "^0.72.0"', '"dub": "^0.72.0"').replace(
                '"universallinks": "^0.43.0"', '"dub": "^0.43.0"')
            f.write_text(t)
    lock = Path("pnpm-lock.yaml")
    if lock.exists():
        t = lock.read_text()
        t = t.replace("universallinks@0.43.0", "dub@0.43.0").replace(
            "universallinks@0.72.0", "dub@0.72.0")
        t = t.replace("      universallinks:\n", "      dub:\n")
        lock.write_text(t)
    for p in list(Path(".").rglob("*dub*")) + list(Path(".").rglob("*Dub*")):
        if ".git" in p.parts or p.is_dir():
            continue
        nb = re.sub(r"dub", "universallinks", p.name)
        nb = re.sub(r"Dub", "UniversalLinks", nb)
        if nb != p.name:
            p.rename(p.with_name(nb))
    readme = Path("README.md")
    if readme.exists() and not readme.read_text().startswith("# Universal Links"):
        print("README drifted - rewrite needed")
    print("migrate done")


if __name__ == "__main__":
    main()
