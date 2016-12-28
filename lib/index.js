#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var bbox = argv.bbox ? JSON.parse(argv.bbox) : null
var tileReduce = require('tile-reduce')
var path = require('path')
var zoom = argv.zoom ? parseInt(argv.zoom) : 12

tileReduce({
  bbox,
  zoom,
  map: path.join(__dirname, '/has-highway.js'),
  sources: [
    {
      name: 'mexico',
      mbtiles: path.join(__dirname, '../data/mexico.mbtiles')
    }
  ]
})
.on('reduce', function (results) {
  for (var i = 0, j = results.length; i < j; i++) console.log(results[i])
})
