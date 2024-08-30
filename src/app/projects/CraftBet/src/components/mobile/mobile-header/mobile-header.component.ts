import {
    Component,
    ComponentRef, createNgModule,
    EventEmitter,
    Injector,
    Output,
    Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AppCommonHeaderComponent} from "../../common/app-common-header/app-common-header.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SaveData} from "../../../../../../@core/services";
import {Controllers, MenuType, Methods} from "../../../../../../@core/enums";
import {DefaultService} from "../../../../../../@core/services";
import {BaseApiService} from "../../../../../../@core/services/api/base-api.service";
import {LayoutService} from "../../../../../../@core/services/app/layout.service";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {LimitNotificationsComponent} from "../../../../../../@theme/components/modals/limit-notifications/limit-notifications.component";

@Component({
    selector: 'app-mobile-header',
    templateUrl: './mobile-header.component.html',
    styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent extends AppCommonHeaderComponent {
    @Output() openSidebar: EventEmitter<any> = new EventEmitter();

    public currentLang: string;
    public accountData: any;
    public showLanguageDropdown: boolean = false;
    public showAccountPages: boolean = false;
    public saveData: SaveData;
    public asianWebRoute = false;

    public headerHeight: number;

    public userInfo: string = "";
    public userInfoData: any;

    public showNavPanel: boolean;
    public generalMenuItems: Array<any> = [];

    public headerPanel2: Array<any> = [];
    public faBars = faBars;
    public faUser = faUser;
    centralMenuItems: any[] = [];
    public balanceTypes = {bonus:false, unused:false};
    public hideLeftSideBar = 'block';
    public selectedAccount;
    public selectedAccountBalance;

    @ViewChild('languages', { read: ViewContainerRef }) languages;
    @ViewChild('loginButton', { read: ViewContainerRef }) loginButton;
    @ViewChild('timeRef', { read: ViewContainerRef }) timeRef;
    @ViewChild('mobileNavbarRef', { read: ViewContainerRef }) mobileNavbarRef;
    @ViewChild('registerButton', { read: ViewContainerRef }) registerButton;
    private navbarRef:ComponentRef<any>;

    constructor(public injector: Injector,
                public router: Router,
                public defaultService: DefaultService,
                private route: ActivatedRoute,
                private renderer: Renderer2,
                private baseApiService: BaseApiService,
                private layoutService: LayoutService,
                ) {
        super(injector);
        this.userInfoData = this.userLogined.getUserInfo();
        this.saveData = injector.get(SaveData);
        this.showNavPanel = this.configService.defaultOptions["ShowMobileNavPanel"] == "1";
        this.headerHeight = this.showNavPanel ? 128 : 64;

        this.logoUrl = '../../../../../../../assets/images/' + window.location.hostname + '-mobile.png';

        // this.baseControllerService.GetMenu(MenuType.MOBILE_CENTRAL_MENU, 'en').then((data: any) => {
        //     if (data)
        //         (data as Array<any>).forEach(item => {
        //             console.log(item, 'item in top menu');
        //             return this.centralMenuItems.push(item);
        //         });
        // });

        this.getMobileCentralMenu();

        this.asianWebRoute = this.router['url'].includes('asianweb');
        this.baseControllerService.GetMenu('MobileHeaderPanel', 'en').then((data: any) => {

            if (typeof data != 'undefined')
            {

                this.generalMenuItems = data.filter((item) =>
                {

                    const styleTypeItem = item['StyleType'];
                    const itemType = item.Type.substring(0, item.Type.indexOf('_')),
                        itemClassType = item.Type.substring(item.Type.lastIndexOf("_") + 1);

                    const parsedStyleTypeItem = JSON.parse(JSON.parse(styleTypeItem));

                    if (parsedStyleTypeItem['style'] != undefined) {
                        item['className'] = itemClassType + '-' + JSON.parse(JSON.parse(styleTypeItem))['style'];
                    }

                    if (parsedStyleTypeItem['animated'] != undefined) {
                        item['animated'] = parsedStyleTypeItem['animated'] === '1';
                    }

                    if (parsedStyleTypeItem['animated'] != undefined) {
                        item['icon'] = parsedStyleTypeItem['icon'] === '1';
                    }

                    if (parsedStyleTypeItem['new'] != undefined) {
                        item['new'] = parsedStyleTypeItem['new'] === '1';
                    }
                    if (parsedStyleTypeItem['useAccountType'] != undefined) {
                        item['useAccountType'] = parsedStyleTypeItem['useAccountType'] === '1' ? true : false;
                    }

                    item['contentType'] = itemType;
                    if(itemType == 'logoImg')
                        this.logoExtension = item.Icon;
                    if (parsedStyleTypeItem['images'] != undefined) {
                        item['dropdownImage'] = parsedStyleTypeItem['images'];
                    }

                    if (parsedStyleTypeItem['title'] != undefined) {
                        item['dropdownTitle'] = parsedStyleTypeItem['title'];
                    }

                    switch (item['contentType'])
                    {
                        case 'bonusBalanceTxt':
                            this.balanceTypes.bonus = true;
                            break;
                        case 'unusedBalanceTxt':
                            this.balanceTypes.unused = true;
                            break;
                    }

                    if (this.isLogin) {
                        if (parsedStyleTypeItem.visibility !== 'loggedOut') {
                            return item;
                        }

                    } else {
                        if (parsedStyleTypeItem.visibility !== 'loggedIn') {
                            return item;
                        }
                    }
                });
            }
            setTimeout(() => {
                this.generalMenuItems.forEach(menuitem => this.renderLazyLoadComponents(menuitem));
            }, 100);
        });

        this.baseControllerService.GetMenu('MobileHeaderPanel2', 'en').then((data: any) => {
            if (typeof data != 'undefined') {
                this.headerPanel2 = data.filter((item) => {
                    const styleTypeItem = item['StyleType'];
                    const itemType = item.Type.substring(0, item.Type.indexOf('_')),
                        itemClassType = item.Type.substring(item.Type.lastIndexOf("_") + 1);

                    if (JSON.parse(JSON.parse(styleTypeItem))['style'] != undefined) {
                        item['className'] = itemClassType + '-' + JSON.parse(JSON.parse(styleTypeItem))['style'];
                    }

                    if (JSON.parse(JSON.parse(styleTypeItem))['animated'] != undefined) {
                        item['animated'] = JSON.parse(JSON.parse(styleTypeItem))['animated'] === '1' ? true : false;
                    }

                    if (JSON.parse(JSON.parse(styleTypeItem))['new'] != undefined) {
                        item['new'] = JSON.parse(JSON.parse(styleTypeItem))['new'] === '1' ? true : false;
                    }

                    item['contentType'] = itemType;
                    if(itemType == 'logoImg')
                        this.logoExtension = item.Icon;
                    if (JSON.parse(JSON.parse(styleTypeItem))['images'] != undefined) {
                        item['dropdownImage'] = JSON.parse(JSON.parse(styleTypeItem))['images'];
                    }

                    if (JSON.parse(JSON.parse(styleTypeItem))['title'] != undefined) {
                        item['dropdownTitle'] = JSON.parse(JSON.parse(styleTypeItem))['title'];
                    }
                    if (this.isLogin) {
                        if (JSON.parse(JSON.parse(styleTypeItem)).visibility !== 'loggedOut') {
                            return item;
                        }

                    } else {
                        if (JSON.parse(JSON.parse(styleTypeItem)).visibility !== 'loggedIn') {
                            return item;
                        }
                    }
                });

                if (this.isLogin) {
                    if (this.headerPanel2.filter((item) => item.Type == 'creditBalanceTxt_text')) {
                        this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_SESSIONINFO).subscribe((creditData) => {
                            if (creditData['ResponseCode'] === 0) {
                                this.accountData = creditData.ResponseObject;
                            }
                        });
                    }
                }
            }
        });


    }

    errorHandler(event)
    {
        event.target.src = '../../../../../../../assets/images/logo-mobile' + this.logoExtension;
    }

    getMobileCentralMenu() {
        this.baseControllerService.GetMenu(MenuType.MOBILE_CENTRAL_MENU, 'en').then((data: any) => {
            if (data)
                this.centralMenuItems = data.filter(item => {
                    if (item['StyleType'] != '') {
                        let settingStyles = JSON.parse(item['StyleType']);
                        let paths = this.router.url.substr(this.router.url.indexOf('/') + 1);

                        if (typeof settingStyles['visibleForPages'] !== 'undefined') {
                            if (settingStyles['visibleForPages'].find(x => x == paths)) {
                                return item;
                            }
                        }

                        if (typeof settingStyles['invisibleForPages'] !== 'undefined') {
                            if (!settingStyles['invisibleForPages'].find(x => paths.includes(x))) {
                                return item;
                            }
                        }
                    }
                });
            if(this.centralMenuItems.length > 0)
                this.renderNavbar();
        });
    }

    ngOnInit() {
        super.ngOnInit();
        /*TO DO understand reason of dispatcher*/
        const event = new Event('test');
        window.dispatchEvent(event);

        this.saveData.openPopup.subscribe((data) => {
            if (data == 1) {
                this.router.navigate(['login']);
            } else if (data == 2) {
                this.router.navigate(['signup']);
            } else if (data == 'm-popup') {
                this.renderer.addClass(document.body, 'animated-popup');
            }
        });

        /*TODO understand way balance not update from base*/
        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.accountBalances = this.groupBalances(data?.Balances);
            this.balance = Number(data.AvailableBalance).toFixed(2);
            this.bonus = Number(data.BonusBalance) > 0 ? Number(data.BonusBalance).toFixed(2) : "0.00";
        });

        if (this.isLogin) {
            if (this.userData.FirstName || this.userData.LastName)
                this.userInfo = this.userData.FirstName + " " + this.userData.LastName;
            else if (this.userData.Email)
                this.userInfo = this.userData.Email;
            else if (this.userData.MobileNumber)
                this.userInfo = this.userData.MobileNumber;
            else this.userInfo = "";
        }
        this.openLimitNotifications();
        this.hideSingleProductLanguage();
/*
        this.saveData.openPopup.subscribe((data) => {
            if (data == 'm-popup') {
                this.showPopup('open_login');
            } else if (data == 2) {
                this.showPopup('open_register');
            }
        });*/
    }

    /*showPopup(titleName) {
        titleName != 'open_login';
        this.simpleModalService.addModal(ShowPopupComponent, {
            title: (titleName == '' ? 'Confirm title' : titleName),
            message: true,
        }, {closeOnClickOutside: true}).subscribe((isConfirmed) => {
            this.confirmResult = isConfirmed;
        });
    }*/

    public openUserPages() {
        this.showAccountPages = !this.showAccountPages;
    }

    public openLanguageMenu() {
        this.showLanguageDropdown = !this.showLanguageDropdown;
    }

    onLeftSidebarOpen() {
        this.sharedService.mobileLeftSidebarOpen.next(true)
    }

    onRightSidebarOpen() {
        this.sharedService.mobileRightSidebarOpen.next(true)
    }

    navigateHome() {
        /* if(this.route.snapshot.children.length && this.route.snapshot.children.length === 1 && this.route.snapshot.children[0].routeConfig.path === 'sport/prematch') {
           window.location.reload();
         }*/
        this.router.navigate(['home']);
        this.clickInRoute("home");
    }

    hideSingleProductLanguage() {
        let showLeftSideBar = getComputedStyle(document.documentElement).getPropertyValue('--m-hide-language-product');
        if(showLeftSideBar)
            this.hideLeftSideBar = showLeftSideBar;
    }

    private async renderLazyLoadComponents(menuItem)
    {
        switch (menuItem.contentType)
        {
            case 'languageDpd':
                {
                    const { LanguageModule } = await import('../../../../../../@theme/components/global-language/language.module');
                    const moduleRef = createNgModule(LanguageModule, this.injector);
                    const component = moduleRef.instance.getComponent();
                    const languagesComponent = this.languages.createComponent(component, {ngModuleRef: moduleRef});
                    menuItem.isMobile = true;
                    languagesComponent.instance.menuItem = menuItem;
                    break;
                }

            case 'loginBtn':
                {
                    const { LoginButtonModule } = await import("../../../../../../@theme/components/global-login-btn/login-button.module");
                    const moduleRef = createNgModule(LoginButtonModule, this.injector);
                    const component = moduleRef.instance.getComponent();
                    const loginBtnComponent = this.loginButton.createComponent(component, {ngModuleRef: moduleRef});
                    loginBtnComponent.instance.menuList = menuItem;
                    loginBtnComponent.instance.modeOpenType = 'm-popup';
                    break;
                }
            case 'time':
                {
                    const { TimeModule } = await import("../time/time.module");
                    const moduleRef = createNgModule(TimeModule, this.injector);
                    const component = moduleRef.instance.getComponent();
                    const timeComponent = this.timeRef.createComponent(component, {ngModuleRef: moduleRef});
                    timeComponent.instance.modeOpenType = 'm-popup';
                }
                break;
        }

    }

    private async renderNavbar()
    {
        if(!this.navbarRef)
        {
            const { MobileNavigationBarModule } = await import("../mobile-navigation-bar/mobile-navigation-bar.module");
            const moduleRef = createNgModule(MobileNavigationBarModule, this.injector);
            const component = moduleRef.instance.getComponent();
            this.navbarRef = this.mobileNavbarRef.createComponent(component, {ngModuleRef: moduleRef});
            this.navbarRef.instance.menuItems = this.centralMenuItems;
        }
    }

    public openLimitNotifications() {
        this.signalRService.onDepositLimitInfo$.subscribe(data => {
            this.updatedData = data;
            if (this.isLogin && (data.DailyDepositLimitPercent >= 80 || data.WeeklyDepositLimitPercent >= 80 || data.MonthlyDepositLimitPercent >= 80)) {
                // this.translate.get('User.Limit Info details').subscribe((res) => {
                //     this.updatedData = res.replace('number', currentValue);
                // });
                this.dialog.open(LimitNotificationsComponent,{data:{ title: 'Limit Notifications',message: true, updatedData: data, notLogin: true}});
            }
        });
        this.signalRService.onBetLimitInfo$.subscribe(res => {
            this.updatedData = res;
            if (this.isLogin && (res.DailyBetLimitPercent >= 80 || res.WeeklyBetLimitPercent >= 80 || res.MonthlyBetLimitPercent >= 80)) {
                // this.translate.get('User.Limit Info details').subscribe((res) => {
                //     this.updatedData = res.replace('number', currentValue);
                // });
                this.dialog.open(LimitNotificationsComponent,{data:{ title: 'Limit Notifications',message: true, updatedData: res, notLogin: true}});
            }
        });
    }

    navigateByHref(item)
    {
        if(item.Href)
            this.router.navigate(['/' + item.Href]);
    }

    redirectToSignUp() {
        localStorage.setItem('product-url', this.defaultOptions.AfterLoginUrl);
    }

    onSelectedAccountChange(event)
    {
        this.selectedAccount = event.Ids;
        for (let i = 0; i < this.accountBalances.length; i++)
        {
            if(this.accountBalances[i].Ids.find(b => this.selectedAccount.includes(b)))
            {
                this.selectedAccountBalance = this.accountBalances[i].Balance;
            }
        }
    }

    groupBalances(balances):any[]
    {
        let groupedBalances = [];

        for(let i = 0; i < balances?.length; i++)
        {
            let balance = {...balances[i]};

            if(!Array.isArray(balance.Ids))
                balance.Ids = [];

            if(balance.TypeId !== 3)
            {
                if(balance.BetShopId === null && balance.PaymentSystemId === null)
                {
                    if (balance.TypeId === 1 || balance.TypeId === 2)
                    {
                        let b = groupedBalances.find(b => !b.BlockForGroup && (b.TypeId === 1 || b.TypeId === 2));
                        if(b)
                        {
                            b.Balance += balance.Balance;
                            b.Ids.push(balance.Id);
                        }
                        else
                        {
                            balance.Ids.push(balance.Id);
                            groupedBalances.push(balance);
                        }
                    }
                    else
                    {
                        balance.Ids.push(balance.Id);
                        groupedBalances.push(balance);
                    }
                }
                else
                {
                    balance.BlockForGroup = true;
                    balance.Ids.push(balance.Id);
                    groupedBalances.push(balance);
                }
            }
        }
        return groupedBalances;
    }

}
