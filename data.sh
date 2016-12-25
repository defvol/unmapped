#!/bin/bash

mkdir -p data
wget https://s3.amazonaws.com/mapbox/osm-qa-tiles/latest.country/mexico.mbtiles.gz
gunzip mexico.mbtiles.gz
mv mexico.mbtiles data/
