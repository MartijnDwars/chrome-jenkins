jQuery.noConflict();

jQuery(window).load(function () {
  if (window.location.pathname.indexOf("flowGraphTable") < 0) {
    return;
  }

  var i = 0;

  var prevHandler = function () {
    gotoHandler(i--);
  };

  var nextHandler = function () {
    gotoHandler(i++);
  };

  var getRedImages = function () {
    return jQuery('img').filter(function (index, image) {
      return jQuery(image).attr('src').endsWith('red.png');
    });
  };

  var gotoHandler = function () {
    var redImages = getRedImages();

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

    updateNumbers();
  };

  var updateNumbers = function () {
    var redImages = getRedImages();

    if (i < 0) {
      var index = redImages.length + i % redImages.length;
    } else {
      var index = i % redImages.length;
    }

    $currentSpan.text(index + 1);
    $totalSpan.text(redImages.length);
  };

  var $nextBtn = jQuery('<button>Next failed</button>');
  var $currentSpan = jQuery('<span></span>');
  var $slash = jQuery('<span> of </span>');
  var $totalSpan = jQuery('<span></span>');
  var $prevBtn = jQuery('<button>Prev failed</button>');
  $nextBtn.click(nextHandler);
  $prevBtn.click(prevHandler);

  var $overlay = jQuery('<div style=""></div>');
  $overlay.css('position', 'fixed');
  $overlay.css('z-index', '9999');
  $overlay.css('width', '220px');
  $overlay.css('height', '40px');
  $overlay.css('bottom', '10px');
  $overlay.css('right', '10px');
  $overlay.css('padding', '10px');
  $overlay.css('background', '#f0f0f0');
  $overlay.css('border', '1px #000 solid');
  $overlay.append($prevBtn);
  $overlay.append($currentSpan);
  $overlay.append($slash);
  $overlay.append($totalSpan);
  $overlay.append($nextBtn);

  jQuery('body').prepend($overlay);
  updateNumbers();
});
