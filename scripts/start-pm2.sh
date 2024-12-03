#!/usr/bin/env bash
if [ -f ".env" ]; then
  set -a
  source .env set
  set +a
fi

docker-compose up -d

LIB_NAMES=$(npx lerna list --all --parseable --toposort --long | grep libs | sed -E "s/[^:]+:([^:]+).+/\1/" | paste -d , -s -)

# build libs
npx lerna run --sort --scope={$LIB_NAMES} build

pm2 start pm2.config.yml --update-env
