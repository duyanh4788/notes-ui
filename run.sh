#!/bin/sh

echo "Regenerate Application Configuration"

for f in ./build/static-notes-ui/* ; do envsubst < "$f" > "$f.tmp" && mv "$f.tmp" "$f"; done

if [ -d "build/static-notes-ui" ]; then
    mkdir -p build/static-notes-ui
    cp -r build/static-notes-ui/* build/static-notes-ui/
else
    echo "⚠️  Warning: build/static-notes-ui not found! Need build source again."
fi

echo "Run application new"
nginx -t && nginx -g "daemon off;"
echo "Webapp started"
