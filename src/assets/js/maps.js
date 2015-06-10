
// let createMap = (id, coord, title) => {
//   let m = new google.maps.Map(document.getElementById(id), {
//     zoom: 13,
//     scrollwheel: false,
//     center: coord
//   });
//   new google.maps.Marker({
//     position: coord,
//     map: m,
//     title: title
//   });
//   return m;
// }


// google.maps.event.addDomListener(window, 'load', () => {
//   window.mapVignola = createMap(
//     'Map--party',
//     new google.maps.LatLng(45.681387, 9.372540),
//     'Cascina Vignola'
//   );
//   window.mapChurch = createMap(
//     'Map--church',
//     new google.maps.LatLng(45.631006, 9.168113),
//     'S. Pio X'
//   );
// });


(function($) {

  $(document).on('click', 'a[href^=#Map--]', function(event) {
    event.preventDefault();
    // TODO MAP
    // $('[id^=Map--]:visible').slideToggle()
    // $($(this).attr('href')).slideToggle();
  });

})(jQuery);
