
set -e

cd /app/superset-frontend

npm ci

echo "Running frontend"
npm run dev-server -- --port 8088 --env=--superset="${PROXY_ADDRESS:-http://host.docker.internal:8000}"