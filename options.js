function isValidUrl(url) {
  const urlPattern = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})');
  return urlPattern.test(url);
}

function addHTTPHeader(url) {
  let newURL = url;
  const httpPattern = new RegExp('(http(s?)):\/\/');
  if (!httpPattern.test(newURL)) {
    newURL = 'https://'.concat(newURL);
  }
  return newURL;
}

function saveOptions(e) {
  e.preventDefault();
  let unparsedURLsString = document.querySelector('#urls').value;
  let unParsedURLs = unparsedURLsString.replace(/\r\n/g,'\n').split('\n');
  let parsedURLs = unParsedURLs.filter(url => isValidUrl(url));
  parsedURLs = parsedURLs.map(url => addHTTPHeader(url));
  browser.storage.sync.set({
    urls: parsedURLs
  });
  if (unParsedURLs.length !== parsedURLs.length) {
    const feedbackText = `Some URLs has been removed as they do not look right. Saved ${parsedURLs.length} links`;
    showFeedback(feedbackText);
    document.querySelector('#urls').value = URLsToString(parsedURLs);
  } else {
    const feedbackText = `Saved ${parsedURLs.length} links`;
    showFeedback(feedbackText);
  }
}

function showFeedback(feedbackText) {
  const feedback = document.querySelector('.options-feedback');
  feedback.style.display = 'block';
  const feedbackParagraph = document.querySelector('#options-feedback-text');
  feedbackParagraph.innerHTML = feedbackText;
}

function restoreOptions() {
  let storedURLs = browser.storage.sync.get('urls');
  storedURLs.then((res) => {
    document.querySelector('#urls').value = URLsToString(res.urls);
  });
}

function URLsToString(urls) {
  let stringURLs = '';
  if (urls.length > 0 ) {
    stringURLs = urls.join('\n');
  }
  return stringURLs;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);