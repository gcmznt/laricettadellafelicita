
let createMap = (id, markers) => {
  let bounds = new google.maps.LatLngBounds();
  let m = new google.maps.Map(document.getElementById(id), {
    zoom: 13,
    scrollwheel: false
  });
  for (let i = markers.length - 1; i >= 0; i--) {
    let marker = new google.maps.Marker({
      map: m,
      position: markers[i].pos,
      title: markers[i].title
    });
    bounds.extend(marker.position);
  }
  m.fitBounds(bounds);
  return m;
}


google.maps.event.addDomListener(window, 'load', () => {
  window.map = createMap(
    'Map',
    [
      {
        pos: new google.maps.LatLng(45.681387, 9.372540),
        title: 'Cascina Vignola'
      },
      {
        pos: new google.maps.LatLng(45.631006, 9.168113),
        title: 'S. Pio X'
      }
    ]
  );
});

