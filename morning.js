function startMorning() {
  const urls = browser.storage.sync.get("urls");
  urls.then((res) => {
    res.urls.forEach(url => {
      browser.tabs.create({
        "url": url
      });
    });
  })
}

browser.browserAction.onClicked.addListener(startMorning);

