jQuery.noConflict();

var NEIGHBORHOOD = 8;

jQuery(window).load(function () {
  var disableReload = function () {
    for (var i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }

    window.setInterval(function () {
      window.isPageVisible = function () {
        return false;
      };
    }, 100);
  };

  var isSuccess = function (row) {
    var $row = jQuery(row);
    var $status = jQuery($row.find('td:last'));

    return $status.find('img').attr('tooltip') == 'Success';
  };

  var hideSuccess = function () {
    disableReload();

    var table = jQuery('table.pane.bigtable')
    var rows = jQuery(table).find('tr')

    var flags = rows.map(function (index, row) {
      return isSuccess(row);
    }).toArray();

    // Get the non-successful indices
    var nonSuccessful = [];
    for (var i = 0; i < flags.length; i++) {
      if (!flags[i]) {
        nonSuccessful.push(i);
      }
    }

    // Update the neighborhood
    for (var i = 0; i < nonSuccessful.length; i++) {
      var flagIndex = nonSuccessful[i];

      for (var j = flagIndex - NEIGHBORHOOD; j < flagIndex + NEIGHBORHOOD; j++) {
        flags[j] = false;
      }
    }

    rows.each(function (index, row) {
      if (flags[index]) {
        jQuery(rows[index]).hide();
      }
    });
  };

  var $hideSuccessBtn = jQuery('<button>Hide success</button>');
  $hideSuccessBtn.click(hideSuccess);
  jQuery('#nodeGraph').prepend($hideSuccessBtn);
});