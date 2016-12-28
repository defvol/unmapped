var test = require('tape')
var utils = require('../lib/utils')

test('getChildren', function (t) {
  var z12 = [756, 1716, 12]
  var z14 = utils.getChildren(z12, 2)
  var expected = [
    [ 3024, 6864, 14 ],
    [ 3025, 6864, 14 ],
    [ 3025, 6865, 14 ],
    [ 3024, 6865, 14 ],
    [ 3026, 6864, 14 ],
    [ 3027, 6864, 14 ],
    [ 3027, 6865, 14 ],
    [ 3026, 6865, 14 ],
    [ 3026, 6866, 14 ],
    [ 3027, 6866, 14 ],
    [ 3027, 6867, 14 ],
    [ 3026, 6867, 14 ],
    [ 3024, 6866, 14 ],
    [ 3025, 6866, 14 ],
    [ 3025, 6867, 14 ],
    [ 3024, 6867, 14 ]
  ]

  t.equal(z14.length, 16, 'goes 2 levels deep (4^2)')
  t.deepEqual(z14, expected, 'returns children tiles at z14')
  t.end()
})

test('inTile', function (t) {
  var tile = [ 11751, 26472, 16 ]
  var avenue = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [
        [ -115.42038917541502, 32.659031913817700 ],
        [ -115.44304847717285, 32.657839606187370 ],
        [ -115.44356346130373, 32.657911867708584 ],
        [ -115.45248985290527, 32.657261511914770 ]
      ]
    }
  }

  var street = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [
        [ -115.44332742691040, 32.656484691848980 ],
        [ -115.43729782104492, 32.656611151389455 ]
      ]
    }
  }

  t.true(utils.inTile(avenue, tile), 'finds avenue within tile')
  t.false(utils.inTile(street, tile), 'street is outside of tile')

  t.end()
})

test('toObject', function (t) {
  var tiles = [
    [ 3024, 6864, 14 ],
    [ 3025, 6864, 14 ]
  ]
  var found = utils.toObject(tiles)
  var expected = { '3024,6864,14': 1, '3025,6864,14': 1 }
  t.deepEqual(found, expected, 'converts array into associative array')
  t.end()
})

test('toObject works for associative array', function (t) {
  var z12 = [756, 1716, 12]
  var z14 = utils.getChildren(z12, 2).slice(0, 10).map(JSON.stringify)

  var haveHighway = {}
  Object.assign(haveHighway, utils.toObject(z14))

  t.true(Object.keys(haveHighway).indexOf('[3025,6864,14]') !== -1)
  t.true(Object.keys(haveHighway).indexOf('[3024,6867,14]') === -1)
  t.end()
})
