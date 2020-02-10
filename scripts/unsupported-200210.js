function detectBrowser() {
  result = []
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  if (isOpera)
    result.push('opera');
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox)
    result.push('firefox');
  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  if (isSafari)
    result.push('safari');
  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  if (isIE)
    result.push('ie');
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  if (isEdge)
    result.push('edge');
  // Chrome 1 - 79
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  if (isChrome)
    result.push('chrome');
  // Edge (based on chromium) detection
  var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
  if (isEdgeChromium)
    result.push('edgechromium');
  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
  return result;
}

function validateBrowser() {
  var isValid = true;
  var browsers = detectBrowser();
  if (browsers.indexOf('ie') !== -1) {
    isValid = false;
    var divLoading = document.getElementById('id-loading');
    if (divLoading){
      divLoading.style.display = "none";
    }
    var divNotSupported = document.getElementById('id-not-support');
    if (divNotSupported){
      divNotSupported.style.display = "block";
    }
  }
  return isValid;
}
