#!/bin/bash

node lib/index.js > data/z16.txt
cat data/z16.txt | mercantile shapes | fio collect > data/tiles.geojson
