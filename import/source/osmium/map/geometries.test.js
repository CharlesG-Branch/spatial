const tap = require('tap')
const Place = require('../../../../model/Place')
const Geometry = require('../../../../model/Geometry')
const map = require('./geometries')

// mapper
tap.test('mapper: geometry empty', (t) => {
  let p = new Place()
  map(p, {})

  t.equals(p.geometry.length, 0)
  t.end()
})
tap.test('mapper: maps polygon', (t) => {
  let p = new Place()
  map(p, {
    geometry: {
      'type': 'Polygon',
      'coordinates': [
        [
          [
            39.0234375,
            48.922499263758255
          ],
          [
            47.8125,
            39.639537564366684
          ],
          [
            61.17187499999999,
            49.83798245308484
          ],
          [
            39.0234375,
            48.922499263758255
          ]
        ]
      ]
    }
  })
  t.equals(p.geometry.length, 1)
  t.true(p.geometry[0] instanceof Geometry)
  t.equal(p.geometry[0].geometry.constructor.name.toUpperCase(), 'POLYGON')
  t.equal(p.geometry[0].role, 'boundary')
  t.end()
})
tap.test('mapper: maps point', (t) => {
  let p = new Place()
  map(p, {
    geometry: {
      'type': 'Point',
      'coordinates': [
        59.0625,
        47.989921667414194
      ]
    }
  })
  t.equals(p.geometry.length, 2)
  t.true(p.geometry[0] instanceof Geometry)
  t.equal(p.geometry[0].geometry.constructor.name.toUpperCase(), 'POINT')
  t.equal(p.geometry[0].role, 'centroid')
  t.true(p.geometry[1] instanceof Geometry)
  t.equal(p.geometry[1].geometry.constructor.name.toUpperCase(), 'POLYGON')
  t.equal(p.geometry[1].role, 'buffer')
  t.end()
})
