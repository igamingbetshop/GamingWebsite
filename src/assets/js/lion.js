let widgetUrl = "";
let user = localStorage.getItem("CraftBet-user");
user = user ? JSON.parse(user) : null;

if(user && user.Token)
{
    window.addEventListener("onGetClientByToken", (event) => {
        getProviderData(event);
    });
}

window.addEventListener('onInfoPageReady', (event) => {
    if(user && user.Token)
    {
        if(widgetUrl)
        {
           initWidget();
        }
    }
    else
    {
       initWidget(true);
    }
});

function getProviderData(event) {
    const player = event ? JSON.parse(event.detail.user) : null;
    fetch("https://websitewebapi.craftbetstage.com/1/api/Main/GetProviderData", {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ProviderId: 112,
            Token: player ? player.Token : null,
            ClientId: player ? player.Id : 0,
            LanguageId: localStorage.getItem("lang"),
            RequestData: (~~(+new Date() / 1000) * 1000 + 240 * 3600 * 1000).toString()
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        if (data.ResponseCode === 0) {
            widgetUrl = data.ResponseObject.key;
        }
    }, error => {

    });
}

function initWidget(remove)
{
    const iframe = document.getElementById('smarticoWidget');
    if(iframe)
    {
        if(remove)
            iframe.remove();
        else
            iframe.src = widgetUrl;
    }
}
