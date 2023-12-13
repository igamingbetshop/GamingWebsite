/*
if (window !== window.parent)
    parent.postMessage({
        from: "closed-game"
    }, "*");
else {
    const metaGoogle = document.createElement("meta");
    metaGoogle.setAttribute("name", "google-site-verification");
    metaGoogle.setAttribute("content", "google8cfecdda29d8ca1c.html");
    document.head.appendChild(metaGoogle);

    document.title = "ProfitBet | Sports Betting & Casino";
    window.__lc = window.__lc || {};
    window.__lc.license = 12458553;
    ;(function(n, t, c) {
        function i(n) {
            return e._h ? e._h.apply(null, n) : e._q.push(n)
        }
        var e = {
            _q: [],
            _h: null,
            _v: "2.0",
            on: function() {
                i(["on", c.call(arguments)])
            },
            once: function() {
                i(["once", c.call(arguments)])
            },
            off: function() {
                i(["off", c.call(arguments)])
            },
            get: function() {
                if (!e._h)
                    throw new Error("[LiveChatWidget] You can't use getters before load.");
                return i(["get", c.call(arguments)])
            },
            call: function() {
                i(["call", c.call(arguments)])
            },
            init: function() {
                var n = t.createElement("script");
                n.async = !0,
                    n.type = "text/javascript",
                    n.src = "https://cdn.livechatinc.com/tracking.js",
                    t.head.appendChild(n)
            }
        };
        !n.__lc.asyncInit && e.init(),
            n.LiveChatWidget = n.LiveChatWidget || e
    }(window, document, [].slice));
    (function(m, e, t, r, i, k, a) {
            m[i] = m[i] || function() {
                (m[i].a = m[i].a || []).push(arguments)
            }
            ;
            m[i].l = 1 * new Date();
            k = e.createElement(t),
                a = e.getElementsByTagName(t)[0],
                k.async = 1,
                k.src = r,
                a.parentNode.insertBefore(k, a)
        }
    )(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(51856499, "init", {
        id: 51856499,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
    var analyticsHref = document.createElement("script");
    analyticsHref.setAttribute("type", "text/javascript");
    analyticsHref.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-QFF8FZ7XH0");
    var att = document.createAttribute("async");
    analyticsHref.setAttributeNode(att);
    document.getElementsByTagName('head')[0].appendChild(analyticsHref);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    const ogUrl = document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    ogUrl.setAttribute("content", "https://craftbet.com");
    document.head.appendChild(ogUrl);

    const ogType = document.createElement("meta");
    ogType.setAttribute("property", "og:type");
    ogType.setAttribute("content", "website");
    document.head.appendChild(ogType);

    const ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", "CraftBet | Sports&Casino");
    document.head.appendChild(ogTitle);

    const ogDescription = document.createElement("meta");
    ogDescription.setAttribute("property", "og:description");
    ogDescription.setAttribute("content", "Online sports betting and casino");
    document.head.appendChild(ogDescription);

    const ogImage = document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.setAttribute("content", "https://craftbet.com/assets/images/craftbet.com.png");
    document.head.appendChild(ogImage);
}
*/
const scripts = ['betslip-indicator.js', 'google-tag.js'];
if ((window !== window.parent)) {
    parent.postMessage({
        from: 'close-game'
    }, "*");
} else {

    scripts.forEach(script => {
        loadExternalScript(`/assets/js/${script}`);
    })

}
document.title = "BetLiveCasino | Sports&Casino";
function loadExternalScript(scriptUrl)
{
    return new Promise(resolve => {
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptUrl;
        scriptElement.async = true;
        scriptElement.onload = resolve;
        document.body.appendChild(scriptElement);
    });
}

