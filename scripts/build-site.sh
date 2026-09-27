#!/usr/bin/env bash
# Build the wiki website with Quartz.
#   scripts/build-site.sh            build into ./public
#   scripts/build-site.sh --serve    build and serve at http://localhost:8080 (rebuilds on save)
# Needs Node 22+, git and Python 3. The first run downloads Quartz into .quartz/ (ignored by git).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
QUARTZ_REF="d25a6eabf96751ffca56f8a8139272def7a65041"   # Quartz v4.5.2

if [ ! -d "$ROOT/.quartz/.git" ]; then
  git init -q "$ROOT/.quartz"
  git -C "$ROOT/.quartz" remote add origin https://github.com/jackyzha0/quartz.git
fi
if [ "$(git -C "$ROOT/.quartz" rev-parse HEAD 2>/dev/null || true)" != "$QUARTZ_REF" ]; then
  git -C "$ROOT/.quartz" fetch -q --depth 1 origin "$QUARTZ_REF"
  git -C "$ROOT/.quartz" checkout -q FETCH_HEAD
  rm -rf "$ROOT/.quartz/node_modules"
fi
[ -d "$ROOT/.quartz/node_modules" ] || (cd "$ROOT/.quartz" && npm ci --no-audit --no-fund)

cp "$ROOT/site/quartz.config.ts" "$ROOT/site/quartz.layout.ts" "$ROOT/.quartz/"
cp "$ROOT/site/custom.scss" "$ROOT/.quartz/quartz/styles/custom.scss"
# Quartz skips anything listed in .gitignore. The generated pages (Open Questions,
# Roadmap Progress) are gitignored on purpose: they're built here and never committed.
# So turn off Quartz's .gitignore filtering. Quartz is pinned above, so this edit is stable.
GLOB_TS="$ROOT/.quartz/quartz/util/glob.ts"
perl -pi -e 's/gitignore: true/gitignore: false/' "$GLOB_TS"
if ! grep -q "gitignore: false" "$GLOB_TS"; then
  echo "build-site.sh: couldn't turn off .gitignore filtering in $GLOB_TS (did the Quartz version change?)" >&2
  exit 1
fi

if [ -n "${SITE_BASE_URL:-}" ]; then
  perl -pi -e "s|baseUrl: \".*\"|baseUrl: \"$SITE_BASE_URL\"|" "$ROOT/.quartz/quartz.config.ts"
fi

python3 "$ROOT/scripts/wiki.py" generate
cd "$ROOT/.quartz"
npx quartz build -d "$ROOT/content" -o "$ROOT/public" "$@"
