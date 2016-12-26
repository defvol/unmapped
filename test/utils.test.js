var test = require('tape')
var getChildren = require('../lib/utils').getChildren

test('getChildren', function (t) {
  var z12 = [756, 1716, 12]
  var z14 = getChildren(z12, 2)
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
