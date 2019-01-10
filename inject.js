jQuery.noConflict();

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

  var hideSuccess = function () {
    disableReload();

    var table = jQuery('table.pane.bigtable')
    var rows = jQuery(table).find('tr')

    rows.each(function (index, row) {
      var $row = jQuery(row);
      var $status = jQuery($row.find('td:last'));

      if ($status.find('img').attr('tooltip') == 'Success') {
        console.log('Row ' + index + ' is success.');
        $row.hide();
      } else {
        console.log('Row ' + index + ' is not success.');
      }
    });
  };

  var $hideSuccessBtn = jQuery('<button>Hide success</button>');
  $hideSuccessBtn.click(hideSuccess);
  jQuery('#nodeGraph').prepend($hideSuccessBtn);
});