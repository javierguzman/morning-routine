(()=>{"use strict";const e="undefined"==typeof browser?chrome:browser;var t;function n(e){var t=document.querySelector(".options-feedback"),n=document.querySelector("#options-feedback-text");t&&n&&(t.style.display="block",n.innerText=e)}function r(e){var t="";return(null==e?void 0:e.length)>0&&(t=e.join("\n")),t}document.addEventListener("DOMContentLoaded",(function(){e.storage.sync.get("urls").then((function(e){document.querySelector("#urls").value=r(e.urls)}))})),null===(t=document.querySelector("form"))||void 0===t||t.addEventListener("submit",(function(t){var o;t.preventDefault();var u=((null===(o=document.querySelector("#urls"))||void 0===o?void 0:o.value)||"").replace(/\r\n/g,"\n").split("\n"),s=u.filter((function(e){return function(e){return new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})").test(e)}(e)}));s=s.map((function(e){return function(e){var t=e;return new RegExp("(http(s?))://").test(t)||(t="https://".concat(t)),t}(e)})),e.storage.sync.set({urls:s}),u.length!==s.length?(n("Some URLs has been removed as they do not look right. Saved ".concat(s.length," links")),document.querySelector("#urls").value=r(s)):n("Saved ".concat(s.length," links"))}))})();