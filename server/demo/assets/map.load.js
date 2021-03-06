$('document').ready(function () {
  var map = setupMap('map', {
    zoomControl: true,
    attributionControl: !!true,
    hashControl: (window.location.pathname === '/explore/pip'),
    crosshairControl: (window.location.pathname === '/explore/pip'),
    addHashToLink: 'a[data-append-hash]'
  })

  var geojson = L.geoJSON(null, _.extend({ interactive: false }, mapStyle.place))
  geojson.addTo(map)

  // render geometries on map
  _.get(params, 'place.geometry', []).forEach(function (row) {
    geojson.addData({
      type: 'Feature',
      properties: {
        role: row.role
      },
      geometry: row.geom
    })
  })
  map.fitBounds(geojson.getBounds())
})
