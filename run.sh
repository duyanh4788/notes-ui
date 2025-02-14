#!/bin/sh

echo "Regenerate Application Configuration"

for f in ./build/static/* ; do envsubst < "$f" > "$f.tmp" && mv "$f.tmp" "$f"; done

if [ -d "build/static" ]; then
    mkdir -p build/static-notes-ui
    cp -r build/static/* build/static-notes-ui/
else
    echo "⚠️  Warning: build/static not found! Need build source again."
fi

echo "Run application new"
nginx -t && nginx -g "daemon off;"
echo "Webapp started"
