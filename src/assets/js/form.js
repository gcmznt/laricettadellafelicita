$('.js-addGuest').on('click', function(event) {
  event.preventDefault();
  var guest = $('.js-guest');
  guest.after(guest.clone());
});
