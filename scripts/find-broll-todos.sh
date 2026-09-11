#!/usr/bin/env bash
# Finds every placeholder broll marker left in composition files so nothing
# ships with a flat-color div where footage should be. Run this before any
# render-all pass.
#
# Usage: ./scripts/find-broll-todos.sh

set -euo pipefail
cd "$(dirname "$0")/.."

echo "Scanning for broll TODOs..."
echo ""

matches=$(grep -rn "TODO: broll" src/ --include="*.tsx" || true)

if [ -z "$matches" ]; then
  echo "None found — no outstanding broll placeholders."
  exit 0
fi

echo "$matches" | while IFS=: read -r file line rest; do
  echo "  $file:$line"
  echo "    ${rest#*TODO: broll}" | sed 's/^ *//'
  echo ""
done

count=$(echo "$matches" | wc -l | tr -d ' ')
echo "$count outstanding broll placeholder(s)."
exit 1
