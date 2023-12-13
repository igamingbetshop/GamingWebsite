var filesCount = 0;
function bannerDispatchData(data)
{
  const event = new CustomEvent('bannerClick', { detail: data});
  window.dispatchEvent(event);
}
/*function initSport()
{
  this.loadExternalScript('https://craftbet.com/website/runtime.39ead976147574f9.js', true);
  this.loadExternalScript('https://craftbet.com/website/polyfills.034e696a36624f01.js', true);
  this.loadExternalScript('https://craftbet.com/website/scripts.6083cecb5ae9eb7f.js');
  this.loadExternalScript('https://craftbet.com/website/main.df4a002df9782d53.js', true);
  this.loadExternalStyles('https://craftbet.com/website/styles.a095fac712a01836.css');
  this.loadExternalStyles('https://craftbet.com/website/assets/flags.css');
  this.loadExternalStyles('https://craftbet.com/website/assets/icon.css');
}*/
function initSport()
{
  this.loadExternalScript('http://localhost:4201/runtime.js', true);
  this.loadExternalScript('http://localhost:4201/polyfills.js', true);
  this.loadExternalScript('http://localhost:4201/scripts.js');
  this.loadExternalScript('http://localhost:4201/main.js', true);
  this.loadExternalStyles('http://localhost:4201/styles.css');
  this.loadExternalStyles('http://localhost:4201/assets/flags.css');
  this.loadExternalStyles('http://localhost:4201/assets/icon.css');
}

function loadExternalScript(scriptUrl, ismodule = null)
{
  const scriptElement = document.createElement('script');
  scriptElement.src = scriptUrl;
  scriptElement.async = false;
  if(ismodule === true)
  {
    scriptElement.setAttribute('type', 'module');
  }
  else if(ismodule === false)
  {
    let attr = document.createAttribute('nomodule');
    scriptElement.defer = true;
    scriptElement.setAttributeNode(attr);
  }
  document.body.appendChild(scriptElement);
  filesCount++;
  if(filesCount === 5)
  {
    const event = new CustomEvent('sportsbookFilesLoaded');
    window.dispatchEvent(event);
  }
}
function loadExternalStyles(styleUrl)
{
  const styleElement = document.createElement('link');
  styleElement.href = styleUrl;
  styleElement.setAttribute("rel", "stylesheet");
  styleElement.setAttribute("type", "text/css");
  document.head.appendChild(styleElement);
  filesCount++;
  if(filesCount === 5)
  {
    const event = new CustomEvent('sportsbookFilesLoaded');
    window.dispatchEvent(event);
  }
}

initSport();
