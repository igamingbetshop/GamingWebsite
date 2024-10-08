window.HostNameUrl = 'craftbet.com';
window.PartnerName = 'CraftBet';
window['debugPath'] = 'https://' + window.HostNameUrl;

let versionScript = document.createElement('script');
versionScript.setAttribute("src", window['debugPath'] + "/assets/js/version.js?=" + Math.random());
versionScript.onload = () => {
    let linkElement = document.createElement('link');
    linkElement.setAttribute("type", "text/css");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", window['debugPath'] + "/assets/css/skin.css" + '?=' + window.VERSION);
    document.head.appendChild(linkElement);

    let scriptElement = document.createElement('script');
    scriptElement.setAttribute("src", window['debugPath'] + "/assets/js/common.js" + '?=' + window.VERSION);
    document.head.appendChild(scriptElement);
};
versionScript.async = false;
document.head.appendChild(versionScript);