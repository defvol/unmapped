#!/usr/bin/env node

var tileReduce = require('tile-reduce')
var path = require('path')

tileReduce({
  zoom: 12,
  map: path.join(__dirname, '/map.js'),
  sources: [
    {
      name: 'mexico',
      mbtiles: path.join(__dirname, '../data/mexico.mbtiles')
    }
  ]
})
