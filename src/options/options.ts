import api from '../api';

function isValidUrl(url: string) {
  const urlPattern = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})');
  return urlPattern.test(url);
}

function addHTTPHeader(url: string) {
  let newURL = url;
  const httpPattern = new RegExp('(http(s?)):\/\/');
  if (!httpPattern.test(newURL)) {
    newURL = 'https://'.concat(newURL);
  }
  return newURL;
}

function saveOptions(e: Event) {
  e.preventDefault();
  let unparsedURLsString = (document.querySelector('#urls') as HTMLTextAreaElement)?.value || '';
  let unParsedURLs = unparsedURLsString.replace(/\r\n/g,'\n').split('\n');
  let parsedURLs = unParsedURLs.filter(url => isValidUrl(url));
  parsedURLs = parsedURLs.map(url => addHTTPHeader(url));
  api.storage.sync.set({
    urls: parsedURLs
  });
  if (unParsedURLs.length !== parsedURLs.length) {
    const feedbackText = `Some URLs has been removed as they do not look right. Saved ${parsedURLs.length} links`;
    showFeedback(feedbackText);
    (document.querySelector('#urls') as HTMLTextAreaElement).value = URLsToString(parsedURLs);
  } else {
    const feedbackText = `Saved ${parsedURLs.length} links`;
    showFeedback(feedbackText);
  }
}

function showFeedback(feedbackText: string) {
  const feedback = document.querySelector('.options-feedback') as HTMLParagraphElement;
  const feedbackParagraph = document.querySelector('#options-feedback-text') as HTMLParagraphElement;
  if (feedback && feedbackParagraph) {
    feedback.style.display = 'block';
    feedbackParagraph.innerText = feedbackText;
  }
}

function restoreOptions() {
  let storedURLs = api.storage.sync.get('urls');
  storedURLs.then((res) => {
    (document.querySelector('#urls') as HTMLTextAreaElement).value = URLsToString(res.urls);
  });
}

function URLsToString(urls: string[]) {
  let stringURLs = '';
  if (urls?.length > 0 ) {
    stringURLs = urls.join('\n');
  }
  return stringURLs;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form')?.addEventListener('submit', saveOptions);