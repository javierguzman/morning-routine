import api from '../api';

function startMorning() {
  const urls = api.storage.sync.get("urls");
  urls.then((res) => {
    res.urls.forEach((url: string) => {
      api.tabs.create({
        "url": url
      });
    });
  })
}

const action = api.browserAction || api.action;
action.onClicked.addListener(startMorning);
