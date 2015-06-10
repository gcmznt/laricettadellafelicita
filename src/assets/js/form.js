(function($) {

  var guestTemplate = $('.js-guest').clone();
  $('.js-addGuest').on('click', function(event) {
    event.preventDefault();
    $('.js-guest').last().after(guestTemplate.clone());
  });


  $('.js-rsvp').on('change', '[name=presenza]', function(event) {
    event.preventDefault();
    $(this)
      .parents('.js-guest')
      .find('[name=menu]')
      .parents('.Form__label')
      .toggleClass('Form__label--hidden');
  });


  $('.js-remove').css({visibility: "hidden"});
  $(document).on('click', '.js-remove', function(event) {
    event.preventDefault();
    $(this)
      .parents('.js-guest')
      .remove();
  });


  $('.js-rsvp').on('submit', function(event) {
    event.preventDefault();
    $(this).find('.Form__error, .Form__success').remove();
    var guests = $(this).find('.js-guest');
    var guestList = [];
    for (var i = guests.length - 1; i >= 0; i--) {
      guestList.push({
        nome: $(guests[i]).find('[name=nome]').val(),
        cognome: $(guests[i]).find('[name=cognome]').val(),
        presenza: $(guests[i]).find('[name=presenza]').is(':checked'),
        menu: $(guests[i]).find('[name=menu]').val(),
      });
    }
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      dataType: 'json',
      data: {"guests": JSON.stringify(guestList)},
    })
    .done(function(response) {
      console.log(response);
      $('.js-guest').remove();
      $('.Form__actions').before(guestTemplate.clone());
      $('<div/>', {
        class: 'Form__success',
        text: response.message
      }).prependTo('.Form__actions')
    })
    .fail(function(response) {
      $('<div/>', {
        class: 'Form__error',
        text: response.responseJSON.message
      }).prependTo('.Form__actions')
    })
    .always(function() {
      console.log("complete");
    });
  });

})(jQuery);
