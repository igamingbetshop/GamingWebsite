let isFirstTime = true;
function jivo_onLoadCallback() {
    if(isFirstTime)
        closeChat();
    else openChat();
    isFirstTime = false;
}
function jivo_onChangeState(state) {

    let mappedState;
    if (state == 'call' || state == 'chat/call' || state == 'chat')
    {
        mappedState = "maximized";
    }
    if (state == 'label' || state == 'chat/min')
    {
        mappedState = "hidden";
    }
    const event = new CustomEvent("chatStateChange", {detail:{state:mappedState}});
    window.dispatchEvent(event);
    console.log(state);
}
function openChat()
{
    let params = {start: 'chat/max'};
    let apiResult = jivo_api.open(params);

    if (apiResult.result === 'fail') {
        console.log('Widget failed to open');
    } else {
        console.log('Widget open successfully');
    }
}
function closeChat()
{
    jivo_destroy();
}
function initChat()
{
    jivo_init();
}
addEventListener("chatStateChange", (event) => {
    const state = event.detail.state;
    const p = setTimeout(() => {
        if(state === "maximize")
        {
            initChat();
        }
        else if(state === "hide" || state === "hidden")
        {
            closeChat();
        }
    }, 300);
});