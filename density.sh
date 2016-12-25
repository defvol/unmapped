#!/bin/bash

node lib/index.js > data/highways.json
cat data/highways.json | tippecanoe -z12 -Z12 -o data/highways.mbtiles
