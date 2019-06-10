jQuery.noConflict();

jQuery(window).load(function () {
  var i = 0;

  var prevHandler = function () {
    gotoHandler(i--);
  };

  var nextHandler = function () {
    gotoHandler(i++);
  };

  var gotoHandler = function () {
    var redImages = jQuery('img').filter(function (index, image) {
      return jQuery(image).attr('src').endsWith('red.png');
    });

    if (i < 0) {
      var image = redImages[redImages.length + i % redImages.length];
    } else {
      var image = redImages[i % redImages.length];
    }

    var $image = jQuery(image);
    $image.css('border', '1px #000 solid');

    var offset = $image.offset();

    jQuery('html, body').animate({
      scrollTop: offset.top - 30
    });
  };

  var $nextBtn = jQuery('<button>Next failed</button>');
  $nextBtn.click(nextHandler);
  var $prevBtn = jQuery('<button>Prev failed</button>');
  $prevBtn.click(prevHandler);

  var $overlay = jQuery('<div style=""></div>');
  $overlay.css('position', 'fixed');
  $overlay.css('z-index', '9999');
  $overlay.css('width', '170px');
  $overlay.css('height', '40px');
  $overlay.css('bottom', '10px');
  $overlay.css('right', '10px');
  $overlay.css('padding', '10px');
  $overlay.css('background', '#f0f0f0');
  $overlay.css('border', '1px #000 solid');
  $overlay.append($prevBtn);
  $overlay.append($nextBtn);

  jQuery('body').prepend($overlay);
});
