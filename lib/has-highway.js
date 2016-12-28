var utils = require('../lib/utils')

var getChildren = utils.getChildren
var inTile = utils.inTile
var toObject = utils.toObject

var depth = 4
var maxtiles = Math.pow(4, depth)

module.exports = function (data, tile, writeData, done) {
  var features = data.mexico.osm.features
  var haveHighway = {}

  for (var i = 0, j = features.length; i < j; i++) {
    var feature = features[i]
    if (feature.properties.highway) {
      // Break loop if we already found features in all tiles
      if (Object.keys(haveHighway).length === maxtiles) break

      // Get tiles containing a feature, skipping known tiles
      var tiles = getChildren(tile, depth)
        .map(JSON.stringify)
        .filter(tile => !haveHighway[tile])
        .filter(tile => inTile(feature, JSON.parse(tile)))

      // Update results map
      if (tiles.length) Object.assign(haveHighway, toObject(tiles))
    }
  }

  done(null, Object.keys(haveHighway))
}
