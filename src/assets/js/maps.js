
function initialize() {
  var coordVignola = new google.maps.LatLng(45.681387, 9.372540);
  var coordChiesa = new google.maps.LatLng(45.631006, 9.168113);

  var mapVignola = new google.maps.Map(document.getElementById('Map--ceremony'), {
    zoom: 12,
    scrollwheel: false,
    center: coordVignola
  });

  var markerVignola = new google.maps.Marker({
      position: coordVignola,
      map: mapVignola,
      title: 'Cascina Vignola'
  });

  var mapChiesa = new google.maps.Map(document.getElementById('Map--church'), {
    zoom: 12,
    scrollwheel: false,
    center: coordChiesa
  });

  var markerChiesa = new google.maps.Marker({
      position: coordChiesa,
      map: mapChiesa,
      title: 'S. Pio X'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
