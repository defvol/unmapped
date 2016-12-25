#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var bbox = argv.bbox ? JSON.parse(argv.bbox) : null
var tileReduce = require('tile-reduce')
var path = require('path')

tileReduce({
  bbox,
  zoom: 12,
  map: path.join(__dirname, '/has-highway.js'),
  sources: [
    {
      name: 'mexico',
      mbtiles: path.join(__dirname, '../data/mexico.mbtiles')
    }
  ]
})
.on('reduce', function (results) {
  if (results) console.log('%j', results)
})
