let user = localStorage.getItem("CraftBet-user");
user = user ? JSON.parse(user) : null;
if (user && user.Token) {
    window.addEventListener("onGetClientByToken", (event) => {
        getProviderData(event);
    });
}
else {
    getProviderData();
}

{
    const style = document.createElement("style");
    style.innerHTML = `
        :root
        {
            --tt-jackpot-gw-background-desktop: #1e1739;
            --tt-jackpot-gw-background-mobile: #1e1739;
            
            --tt-jackpot-gw-background-color: #1e1739;
    
            --tt-jackpot-gw-item-background-color: #443c59;
        }
    `;
    document.head.appendChild(style);
}

function getProviderData(event) {
    const player = event ? JSON.parse(event.detail.user) : null;
    fetch("https://websitewebapi.casinousdt.com/76/api/Main/GetProviderData", {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ProviderId: 95,
            Token: player ? player.Token : null,
            ClientId: player ? player.Id : 0,
            LanguageId: localStorage.getItem("lang"),
            RequestData: "2028-12-20T09:37:56Z",
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.ResponseCode === 0) {
            const key = data.ResponseObject.key;
            initWidget(key, player?.Id, player?.CurrencyId);
        }
    }, error => {

    });
}
function initWidget(key, player, currency) {
    const factory = new WidgetFactory({
        op: 'iqsoft_usdt',
        ts: "2028-12-20T09:37:56Z",
        key: key,
        player: player,
        currency: currency
    });

    let id = 10;
    const observer = new MutationObserver((list, observer) => {
        const bars = Array.from(document.getElementsByTagName("image-bar"));
        bars.forEach(bar => {
            if (!bar.getAttribute("ttwidget")) {
                const title = bar.getElementsByClassName("title")[0].innerText.trim();

                if (title == "widget_jackpot") {
                    bar.setAttribute("ttwidget", "jackpot_goodwin");

                    const wid = "widget_" + id + "_jackpot_goodwin";

                    bar.innerHTML = "";
                    bar.id = wid;

                    factory.fetch("jackpot_goodwin").then(T => new T({
                        el: wid,
                        settings: {
                            logo: {
                                url: "/assets/images/logo_jackpot.png"
                            },
                            jackpotHigh: {
                                iconURL: "/assets/images/jp_gold.png"
                            },
                            jackpotMedium: {
                                iconURL: "/assets/images/jp_silver.png"
                            },
                            jackpotLow: {
                                iconURL: "/assets/images/jp_bronze.png"
                            },
                        },
                        navigation: {
                            view: "banner"
                        }
                    }));
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}