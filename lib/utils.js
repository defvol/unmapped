var tilebelt = require('@mapbox/tilebelt')
var intersect = require('@turf/intersect')

module.exports = {
  getChildren,
  inTile,
  toObject
}

function getChildren (tile, depth) {
  var __flatten = (p, c) => p.concat(c)
  var cc = [tile]

  for (var i = 0; i < depth; i++) {
    cc = cc.map(tilebelt.getChildren).reduce(__flatten, [])
  }

  return cc
}

function inTile (feature, tile) {
  var searchWithin = {
    type: 'Feature',
    properties: {},
    geometry: tilebelt.tileToGeoJSON(tile)
  }

  return intersect(feature, searchWithin) !== undefined
}

function toObject (arr) {
  return arr.reduce((p, c) => { p[c] = 1; return p }, {})
}
