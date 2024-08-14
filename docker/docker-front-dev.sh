#!/usr/bin/env bash

set -e

cd /app/superset-frontend

npm ci

echo "Running frontend"
npm run dev-server -- --port 8088 --env=--superset="${PROXY_ADDRESS:-http://superset_dev_app:${SUPERSET_PORT:-8000}}"
