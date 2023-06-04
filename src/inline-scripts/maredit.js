'use strict';

function getChromeType() {
  const isChromium = window.chrome;
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  const isOpera = typeof window.opr !== "undefined";
  const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
  const isIOSChrome = winNav.userAgent.match("CriOS");
  if (isIOSChrome) {
    // Chrome on iOS
    return 1;
  } else if (isChromium !== null && typeof isChromium !== "undefined" &&
             vendorName === "Google Inc." && isOpera === false &&
             isIEedge === false) {
    // Chrome (except on iOS)
    return 2;
  } else {
    // Non-Chrome
    return 0;
  };
};
function handleChromeTextarea(el, useScroll) {
  const getNoLineBreaks =
      () => { return (el.value.match(/\n/g) || []).length; };
  let noLineBreaks = getNoLineBreaks();
  const onInput = (e) => {
    const newNoLineBreaks = getNoLineBreaks();
    if (noLineBreaks < newNoLineBreaks) {
      el.scrollTop = scrollPos;
    };
    noLineBreaks = newNoLineBreaks;
  };
  const getScrollPos = () => { return el.scrollTop; };
  let scrollPos = getScrollPos();
  const onBeforeInput = (e) => { scrollPos = getScrollPos(); };
  el.addEventListener("input", onInput);
  el.addEventListener("beforeinput", onBeforeInput);
  if (useScroll) {
    el.addEventListener("scroll", onBeforeInput);
  };
};

// Char count
const textEditor = document.getElementById('textEditor');
const charCountSpan = document.getElementById('charCountSpan');
textEditor.addEventListener('input', function() {
  const charsPerPage = 800;
  const numChars = textEditor.value.replace(/\s/g, '').length;
  const pages = (numChars / charsPerPage).toFixed(1);
  charCountSpan.innerText = `(${numChars}c, ${pages}p)`;
  return false;
}, false);
// Workaround for chromium:997266
const chromeType = getChromeType();
if (0 < chromeType) {
  handleChromeTextarea(document.getElementById("textEditor"),
                       (chromeType === 1));
};
