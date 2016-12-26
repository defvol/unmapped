var tilebelt = require('@mapbox/tilebelt')

module.exports = { getChildren }

function getChildren (tile, depth) {
  var __flatten = (p, c) => p.concat(c)
  var cc = [tile]

  for (var i = 0; i < depth; i++) {
    cc = cc.map(tilebelt.getChildren).reduce(__flatten, [])
  }

  return cc
}
