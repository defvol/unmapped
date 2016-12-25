module.exports = function (data, tile, writeData, done) {
  var features = data.mexico.osm.features

  for (var i = 0, j = features.length; i < j; i++) {
    if (features[i].properties.highway) return done(null, tile)
  }

  done(null)
}
