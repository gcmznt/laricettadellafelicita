function prev () {
  var e = document.getElementsByClassName('Slider__item--active')[0];
  e.classList.remove('Slider__item--active');
  var prev = e.previousElementSibling || e.parentElement.lastChild;
  prev.classList.add('Slider__item--active');
}

function next () {
  var e = document.getElementsByClassName('Slider__item--active')[0];
  e.classList.remove('Slider__item--active');
  var next = e.nextElementSibling || e.parentElement.firstChild;
  next.classList.add('Slider__item--active');
}

if (document.querySelector(".Slider__item--active")) {
  document
    .querySelector(".Slider__arrow--next")
    .addEventListener("click", next);

  document
    .querySelector(".Slider__arrow--prev")
    .addEventListener("click", prev);


  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  };

  function handleTouchMove(evt) {
    if (!xDown || !yDown) return;

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if ( xDiff > 0 ) {
        /* left swipe */
        next();
      } else {
        /* right swipe */
        prev();
      }
    // } else {
      // if ( yDiff > 0 ) {
      //   /* up swipe */
      // } else {
      //   /* down swipe */
      // }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };
}

function is_touch_device() {
  return (('ontouchstart' in window)
          || (navigator.MaxTouchPoints > 0)
          || (navigator.msMaxTouchPoints > 0));
}

if (is_touch_device()) {
  // document.body.classList.add('is-touch')
}
