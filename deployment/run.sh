#!/bin/sh

echo "Regenerate Application Configuration v1"

sed -i 's|/notes-ui/|/static-notes-ui/|g' /app/build/index.html

for f in /app/build/static/*.js; do
    envsub --syntax handlebars "$f"
done

mkdir -p /app/build/static-notes-ui
cp -r /app/build/static /app/build/static-notes-ui

echo "Starting nginx..."
nginx -t
nginx -g "daemon off;"
echo "Webapp started"