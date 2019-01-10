chrome.webNavigation.onBeforeNavigate.addListener(function (event) {
  console.log('On before navigate', event);

  var regexs = [
    /^https:\/\/www\.google\.co\.uk\/search\?q=GM-(\d+)/,
    /^https:\/\/www\.google\.ch\/search\?q=GM-(\d+)/,
    /^https:\/\/www\.google\.com\/search\?q=GM-(\d+)/
  ];

  for (index in regexs) {
    var regex = regexs[index];
    var matches = event.url.match(regex)

    if (matches && matches.length >= 2) {
      console.log('URL ' + event.url + ' matches, issue ID = GM-' + matches[1]);

      chrome.tabs.update(event.tabId, {
        url: 'http://ol-jira.us.oracle.com/browse/GM-' + matches[1]
      });

      break;
    }
  }
});
