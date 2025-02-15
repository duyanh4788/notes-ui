#!/bin/sh

echo "Regenerate Application Configuration"

mkdir -p build/static-notes-ui
cp -r build/static build/static-notes-ui

echo "Run application new"
nginx -t
nginx -g "daemon off;"

echo "Webapp started"
