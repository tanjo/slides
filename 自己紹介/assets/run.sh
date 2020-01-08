#!/bin/sh

cd `dirname $0`

for file in `\find . -maxdepth 1 -name '*.webp'`; do
  ffmpeg -i $file "$(basename -- "$file" .webp).png"
  trash $file
done
