window['debugPath'] = "";
const versionScript = document.createElement('script');
versionScript.setAttribute("src", "/assets/js/version.js?=" + Math.random());
versionScript.onload = () => {
    let linkElement = document.createElement('link');
    linkElement.setAttribute("type", "text/css");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", "/assets/css/skin.css" + '?=' + window.VERSION);
    document.head.appendChild(linkElement);

    let scriptElement = document.createElement('script');
    scriptElement.setAttribute("src", "/assets/js/common.js" + '?=' + window.VERSION);
    document.head.appendChild(scriptElement);
};
versionScript.async = false;
document.head.appendChild(versionScript);