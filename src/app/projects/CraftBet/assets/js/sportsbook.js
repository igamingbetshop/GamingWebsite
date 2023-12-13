var filesCount = 0;
function bannerDispatchData(data)
{
  const event = new CustomEvent('bannerClick', { detail: data});
  window.dispatchEvent(event);
}
function initSport()
{
  this.loadExternalScript('https://craftbet.com/website/runtime-es2015.1baca2bac9b2d5d79d3d.js', true);
  this.loadExternalScript('https://craftbet.com/website/runtime-es5.1baca2bac9b2d5d79d3d.js', false);

  this.loadExternalScript('https://craftbet.com/website/polyfills-es5.c91a5195807cfdd847db.js', false);
  this.loadExternalScript('https://craftbet.com/website/polyfills-es2015.144e0743ffe15d494c02.js', true);

  this.loadExternalScript('https://craftbet.com/website/scripts.18cc7f8f9794ddae27e3.js');

  this.loadExternalScript('https://craftbet.com/website/main-es2015.0616f2afe7f285ad8d44.js', true);
  this.loadExternalScript('https://craftbet.com/website/main-es5.0616f2afe7f285ad8d44.js', false);

  this.loadExternalStyles('https://craftbet.com/website/styles.b24eecef5f7a3b539d2a.css');
  this.loadExternalStyles('https://craftbet.com/website/assets/flags.css');
  this.loadExternalStyles('https://craftbet.com/website/assets/icon.css');
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
  if(filesCount === 8)
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
  if(filesCount === 8)
  {
    const event = new CustomEvent('sportsbookFilesLoaded');
    window.dispatchEvent(event);
  }
}

initSport();
