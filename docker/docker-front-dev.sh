#!/usr/bin/env bash

set -e

cd /app/superset-frontend

npm ci

npm install -g po2json

cd /app/superset/translations/zh/LC_MESSAGES

po2json --domain superset --format jed1.x -F --fallback-to-msgid   messages.po messages.json

cd -

echo "Running frontend"
npm run dev-server -- --port 8088 --env=--superset="${PROXY_ADDRESS:-http://superset-app:${SUPERSET_PORT:-8000}}"

