#!/bin/bash

echo "[-117.25, 27.96, -112.72, 32.84]" | \
  mercantile tiles 16 | \
  awk '{ gsub (" ", "", $0); print}' > data/z16.all
node lib/find-tiles.js > data/z16.txt
python scripts/noway.py > data/z16.noway

cat data/z16.txt | mercantile shapes | fio collect > data/tiles.geojson
