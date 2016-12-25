module.exports = function (data, tile, writeData, done) {
  var features = data.mexico.osm.features

  for (var i = 0, j = features.length; i < j; i++) {
    var feature = features[i]
    if (feature.properties.highway) writeData(JSON.stringify(feature) + '\n')
  }

  done(null)
}
