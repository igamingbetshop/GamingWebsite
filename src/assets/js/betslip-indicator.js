const betSlipNavigationView = `<div id="betslipIndicator" style="position: fixed;
    bottom: 70px;
    left: 0.7rem;
    background-color: #2776bb;
    color: #fff;
    border-radius: 50%;
    width: 54px;
    height: 54px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 8;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;" class="BetslipIndicator">
    <svg style="overflow: hidden; pointer-events: none; width: 30px; height: 30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 120 120">
<path fill="#FFFFFF" d="M115,30.89v-4.58H95.39v5.32c0.09,1.43-1,2.66-2.42,2.75c-1.43,0.09-2.66-1-2.75-2.42c-0.01-0.11-0.01-0.21,0-0.32v-5.32
H29.78v5.32c0.09,1.43-1,2.66-2.42,2.75c-1.43,0.09-2.66-1-2.75-2.42c-0.01-0.11-0.01-0.21,0-0.32v-5.32H5v6.43
c4.43,1.86,9.51,21.63,9.51,28.45S9.43,87.77,5,89.63v4.06h19.61v-5.32c-0.09-1.43,1-2.66,2.42-2.75c1.43-0.09,2.66,1,2.75,2.42
c0.01,0.11,0.01,0.21,0,0.32v5.32h60.44v-5.32c-0.09-1.43,1-2.66,2.42-2.75c1.43-0.09,2.66,1,2.75,2.42c0.01,0.11,0.01,0.21,0,0.32
v5.32H115v-5.92c-4.43-1.86-9.51-21.62-9.51-28.44S110.57,32.75,115,30.89z M29.78,80.94c-0.09,1.43-1.32,2.51-2.75,2.42
c-1.3-0.08-2.34-1.12-2.42-2.42V76c0.09-1.43,1.32-2.51,2.75-2.42c1.3,0.08,2.34,1.12,2.42,2.42V80.94z M29.78,68.59
c-0.09,1.43-1.32,2.51-2.75,2.42c-1.3-0.08-2.34-1.12-2.42-2.42v-4.82c0.09-1.43,1.32-2.51,2.75-2.42c1.3,0.08,2.34,1.12,2.42,2.42
V68.59z M29.78,56.23c-0.09,1.43-1.32,2.51-2.75,2.42c-1.3-0.08-2.34-1.12-2.42-2.42v-4.82c0.09-1.43,1.32-2.51,2.75-2.42
c1.3,0.08,2.34,1.12,2.42,2.42V56.23z M29.78,43.99c-0.09,1.43-1.32,2.51-2.75,2.42c-1.3-0.08-2.34-1.12-2.42-2.42v-4.93
c0.09-1.43,1.32-2.51,2.75-2.42c1.3,0.08,2.34,1.12,2.42,2.42V43.99z M66.38,80.58V87H54.07v-6.41c-5.63-1.45-9.72-6.31-10.19-12.1
l-0.17-2.14h10.06L54,68.14c0.16,1.74,1,4,6.29,4c3.45,0,5.51-1.11,5.51-3c0-1,0-3.13-6.81-4.75C55.38,63.51,44.42,60.86,44.42,51
c0-5.42,3.68-9.74,9.7-11.55v-6.4h12.26v6.55c5.18,1.75,8.72,6.54,8.89,12v2h-10l-0.08-1.89c-0.1-2-0.76-3.94-4.95-3.94
c-2.54,0-5.51,0.82-5.51,3.13c0,0.8,0,2.28,6.85,4c4.35,1.12,14.53,3.74,14.53,14.12C76.08,74.73,72.48,78.91,66.38,80.58z
 M95.38,80.94c-0.09,1.43-1.32,2.51-2.75,2.42c-1.3-0.08-2.34-1.12-2.42-2.42V76c0.09-1.43,1.32-2.51,2.75-2.42
c1.3,0.08,2.34,1.12,2.42,2.42V80.94z M95.38,68.59c-0.09,1.43-1.32,2.51-2.75,2.42c-1.3-0.08-2.34-1.12-2.42-2.42v-4.82
c0.09-1.43,1.32-2.51,2.75-2.42c1.3,0.08,2.34,1.12,2.42,2.42V68.59z M95.38,56.23c-0.09,1.43-1.32,2.51-2.75,2.42
c-1.3-0.08-2.34-1.12-2.42-2.42v-4.82c0.09-1.43,1.32-2.51,2.75-2.42c1.3,0.08,2.34,1.12,2.42,2.42V56.23z M95.38,43.99
c-0.09,1.43-1.32,2.51-2.75,2.42c-1.3-0.08-2.34-1.12-2.42-2.42v-4.93c0.09-1.43,1.32-2.51,2.75-2.42c1.3,0.08,2.34,1.12,2.42,2.42
V43.99z"></path>
</svg>
    <span class="BetslipIndicatorCounter"
     style="position: absolute;
    background: #ffc40d;
    color: #000;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 10px;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 20px;"></span>
</div>
`;

(() => {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
        let ret = oldPushState.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
        let ret = oldReplaceState.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
    });
})();
const productIds = [68000, 78518, 78519];

window.addEventListener('locationchange', () => {
    if(productIds.some(productId => window.location.pathname.includes(`product/${productId}`)))
    {
        const p =  setTimeout(() =>
        {
            clearTimeout(p);
            const productFrame = document.getElementById("mobile-main-game-iframe");
            const betslipButton = document.getElementById("betslipIndicator");
            if(productFrame && !betslipButton)
            {
                productFrame.insertAdjacentHTML("afterend",betSlipNavigationView);
                const betslipButton = document.getElementById("betslipIndicator");
                if (betslipButton) {
                    betslipButton.classList.add('NoSelections');
                    betslipButton.addEventListener('click', function (event) {
                        event.stopPropagation();
                        productFrame.contentWindow.postMessage({
                            type: 'GMCMS:goToBetslip',
                        }, '*');
                    });

                    window.addEventListener("message", onMessage);
                } else {
                    console.warn('There is no betslip button available!');
                }
            }
        }, 5000);
    }
    else window.removeEventListener('message', onMessage);
});

function onMessage(event)
{
    if(event.data.type == 'OMFE:betslipSelectionsCount')
    {
        const betslipIndicator = document.getElementById("betslipIndicator");
        if(betslipIndicator)
        {
            if(event.data.payload.count == 0)
            {
                betslipIndicator.style.display = 'none';
            }
            else
            {
                betslipIndicator.style.display = 'flex';
                const betslipContent = betslipIndicator.querySelector('.BetslipIndicatorCounter');
                if(betslipContent)
                    betslipContent.innerHTML = event.data.payload.count;
            }
        }
    }
}