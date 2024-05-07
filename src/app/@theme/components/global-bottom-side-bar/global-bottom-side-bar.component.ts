import {Component, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MenuService, SharedService} from "../../../@core/services";
import {ConfigService} from "../../../@core/services";
import {UserLogined} from "../../../@core/services/app/userLogined.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-global-bottom-side-bar',
    templateUrl: './global-bottom-side-bar.component.html'
})
export class GlobalBottomSideBarComponent implements OnInit, OnDestroy {

    @Input() set menuList(menuList: Array<any>) {
        this._menuList = menuList.map(menuListItem => {
            if (this.router.url.slice(1).includes('real') && this.router.url.slice(1).startsWith('product') && menuListItem.Href.includes('demo')) {
                menuListItem.Href = menuListItem.Href.replace('real', 'demo');
                this.selectedItemHref = this.router.url.slice(1).replace('real', 'demo');
            }
            if (JSON.parse(menuListItem.StyleType)['centerHighlight'] !== undefined) {
                menuListItem.centerHighlight = JSON.parse(menuListItem.StyleType)['centerHighlight'] === 1 ? true : false;
            }
            return menuListItem;
        });
        const centerIndex = this._menuList.findIndex(item => item.centerHighlight === true);
        if (centerIndex !== -1 && this._menuList.length % 2 !== 0) {
            this.center = Math.floor(this._menuList.length / 2);
        }
    }

    get menuList(): Array<any> {
        return this._menuList;
    }

    public router: Router;
    public sharedService: SharedService;
    public menuService: MenuService;
    private configService:ConfigService;
    private loggedService:UserLogined;
    public betsCount:number = 0;
    public selectedMoreItem = false;
    public showBetslip = false;
    public selectedOrder;
    public selectedItem;
    public selectedItemHref;
    private subscription:Subscription;
    public _menuList: Array<any>;
    public center;

    constructor(private injector: Injector) {
        this.router = injector.get(Router);
        this.sharedService = injector.get(SharedService);
        this.menuService = injector.get(MenuService);
        this.configService = injector.get(ConfigService);
        this.loggedService = injector.get(UserLogined);
    }

    ngOnInit()
    {
        this.subscription = new Subscription();
        this.subscription.add(this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd)
            {
               this.selectedMoreItem = false;
                this.selectedItemHref = this.router.url.slice(1);
               // this.selectedOrder = undefined;
            }
        }));
        this.menuService.onClose$.subscribe((requestData:any) => {
            if (typeof requestData === "object") {
                let filterItem = this.menuList.filter((item: any) => (item.Type === requestData?.position));
                this.toggleMenu(filterItem[0]);
            } else if (requestData === 'more-menu') {
                this.selectedMoreItem = false;
            }
        });
        window.removeEventListener('betslipChange', this.onBetslipChange);
        window.addEventListener('betslipChange', this.onBetslipChange);

        const event = new CustomEvent('betslipChangeFromParent', {detail: {}});
        window.dispatchEvent(event);
        this.selectedOrder = this.menuList?.find(menuItem => this.router.url.slice(1) === menuItem['Href'])?.Order;
    }

    private onBetslipChange = (data) =>
    {
        this.betsCount = data.detail.state.count || 0;
        if(!data.detail.state.open)
        {
            this.selectedOrder = this.menuList.find(menuItem => menuItem.Title === "Sport")?.Order;
        }
    };

    openTab(item)
    {
        this.selectedItem = item;
        if (this.selectedOrder !== item.Order)
        {
            this.selectedOrder = item.Order;
            this.checkPopups(item);
        }
        else
        {
            this.selectedOrder = this.menuList.find(menuItem => this.router.url.slice(1) === menuItem['Href'])?.Order;
            this.selectedItemHref = this.menuList.find(menuItem => this.router.url.slice(1) === menuItem['Href'])?.Href;
        }
        switch (item.Type) {
            case 'MobileMenu' :
                this.onLeftSidebarOpen();
                break;
            case 'MobileRightSidebar':
                this.onRightSidebarOpen();
                break;
            case 'Betslip':
                this.showBetslip = !this.showBetslip;
                this.openSportBetSlip('BetSlip');
                break;
            case 'AllBets':
                this.showBetslip = !this.showBetslip;
                this.openSportBetSlip('AllBets');
                break;
            case 'Statement':
                this.openStatement();
                break;
            case 'AnimatedLeftSideBar' : {
                this.toggleMenu(item);
                break;
            }
            case 'more-menu' : {
                this.selectedMoreItem = !this.selectedMoreItem;
                break;
            }
            default:
                this.router.navigate(['/' + item.Href]);
                if (item.Title == "Home")
                    this.sharedService.notifyRouteChangeToSport(item.Href);
                if(item.Href.startsWith('sport') && this.configService.defaultOptions.SportOpenMode === 'migrated')
                {
                    this.showBetslip = false;
                    this.sharedService.notifyMigratedSportRouteChange(item.Href);
                }
                break;
        }
    }

    openSportBetSlip(tab:string = '')
    {
        if(tab == 'AllBets' && !this.loggedService.isAuthenticated)
        {
            this.router.navigate(['/login']);
        }
        else
        {
            const event = new CustomEvent('betslipChangeFromParent', {detail: {tab:tab, open:true}});
            window.dispatchEvent(event);
        }
    }

    openStatement()
    {
        const iframe = document.getElementById('main-game-iframe') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({"from": "website", "openStatement": true}, "*");
        }
    }

    toggleMenu(item) {
        item['selected'] = !item['selected'];
        if (item['selected']) {
            this.menuService.open('menu');
        } else {
            this.menuService.close('menu');
        }
    }

    onLeftSidebarOpen() {
        this.sharedService.mobileLeftSidebarOpen.next({'toggle': true, 'fullScreen': true})
    }

    onRightSidebarOpen() {
        this.sharedService.mobileRightSidebarOpen.next({'toggle': true, 'fullScreen': true})
    }

    private checkPopups(item): void
    {
        if (this.selectedMoreItem && item?.Type !== 'more-menu')
        {
            this.selectedMoreItem = !this.selectedMoreItem;
        }
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

}
