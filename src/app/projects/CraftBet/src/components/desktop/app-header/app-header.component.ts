import {Component, ElementRef, HostListener, Injector, ViewChild} from '@angular/core';
import {AppCommonHeaderComponent} from '../../common/app-common-header/app-common-header.component';
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import { ActivatedRoute, NavigationEnd} from "@angular/router";
import {SaveData} from '../../../../../../@core/services/app/saveData.service';
import {AppOpenTicketComponent} from "../app-open-ticket/app-open-ticket.component";
import {PopupsService} from "@core/services/app/popups.service";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {Subject, take} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {getParsedUrl} from "@core/utils";
import {LimitNotificationsComponent} from "../../../../../../@theme/components/modals/limit-notifications/limit-notifications.component";
import {MenuType, Methods} from "../../../../../../@core/enums";
import {BaseApiService} from "../../../../../../@core/services/api/base-api.service";
import {StateService} from "../../../../../../@core/services/app/state.service";
import {
    AppCommonBankMessageModalComponent
} from "../../common/app-common-bank-message-modal/app-common-bank-message-modal.component";


@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent extends AppCommonHeaderComponent {

    @HostListener('window:resize', ['$event'])
    onResize(event)
    {
        this.saveStateSbj.next(null);
        this.panel1StateSbj.next(null);
    }

    /*Panel 1*/
    @ViewChild('panel1MenuRef') panel1MenuRef:ElementRef;
    @ViewChild('panel1MoreMenuRef') panel1MoreMenuRef:ElementRef;
    @ViewChild('panel1RightPartRef') panel1RightPartRef:ElementRef;
    public panel1MenuItems: Array<any> = [];
    public panel1MenuLeftItems: Array<any> = [];
    public panel1MenuRightItems: Array<any> = [];
    public panel1MenuMoreItems: Array<any> = [];
    public showPanel1:boolean = false;
    private panel1moreMenuWidth:number = 0;
    private panel1TotalWidth:number = 0;
    private panel1ItemsWidth:number[] = [];
    private panel1StateSbj: Subject<boolean> = new Subject();
    public showLoginComponent = false;
    public showLoginDropdown = false;


    public generalMenuItems: Array<any> = [];
    public generalMenuLeftItems: Array<any> = [];
    public generalMenuRightItems: Array<any> = [];
    public generalMenuMoreItems: Array<any> = [];

    public group1MenuItems: Array<any> = [];
    public showLanguageDropdown: boolean = false;
    public showAccountPages: boolean = false;
    public saveData: SaveData;
    public activatedRoute: ActivatedRoute;
    public popupsService: PopupsService;
    public baseApiService: BaseApiService;
    public activeRouterName: any;
    public asianWebRoute = false;
    public realRouteName: any;
    public faCaretDown = faCaretDown;
    @ViewChild('generalMenu') generalMenu:ElementRef;
    @ViewChild('moreMenu') moreMenu:ElementRef;
    private saveStateSbj: Subject<boolean> = new Subject();
    private scrollWidth:number = 0;
    private itemsWidth:number[] = [];
    private moreMenuWidth:number = 0;
    public isLeftMenu:boolean = false;
    public isTopMenu:boolean = false;
    public openModal: boolean;
    public marqueeText;



    constructor(public injector: Injector)
    {
        super(injector);
        this.saveData = injector.get(SaveData);
        this.stateService = injector.get(StateService);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.popupsService = injector.get(PopupsService);
        this.baseApiService = injector.get(BaseApiService);

        this.asianWebRoute = this.router['url'].includes('asianweb');
        this.getActiveRouteName(this.router['url']);
        this.logoUrl = '../../../../../../../assets/images/' + window.location.hostname + '.png';

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {

                this.asianWebRoute = e['url'].includes('asianweb');
                this.getActiveRouteName(e['urlAfterRedirects']);
            }
        });
        this.getHeaderPanel1MenuItems();

        this.baseControllerService.GetMenu('HeaderGroup1Menu', 'en').then((data: any) => {
            if (typeof data != 'undefined') {
                this.group1MenuItems = data.filter((item) => {

                    const styleTypeItem = item['StyleType'];
                    const itemType = item.Type.substring(0, item.Type.indexOf('_')),
                        itemClassType = item.Type.substring(item.Type.lastIndexOf("_") + 1);


                    if (JSON.parse(JSON.parse(styleTypeItem))['isPlay'] != undefined) {
                        item['animationName'] = JSON.parse(JSON.parse(styleTypeItem))['isPlay'];
                    }

                    if (JSON.parse(JSON.parse(styleTypeItem))['style'] != undefined) {
                        item['className'] = itemClassType + '-' + JSON.parse(JSON.parse(styleTypeItem))['style'];
                    }

                    if (JSON.parse(JSON.parse(styleTypeItem))['animated'] != undefined) {
                        item['animated'] = JSON.parse(JSON.parse(styleTypeItem))['animated'] === '1' ? true : false;
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
                    if (JSON.parse(JSON.parse(styleTypeItem))['itemTitle'] != undefined) {
                        item['itemTitle'] = JSON.parse(JSON.parse(styleTypeItem))['itemTitle'];
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
            }
        });


        this.baseControllerService.GetMenu('HeaderPanel2Menu',
            'en').then((data: any) =>
        {
            let isLeft = true;
            this.generalMenuItems = data.filter((item, index, array) =>
            {
                if(item.Orientation)
                    isLeft = false;
                const styleTypeItem = item['StyleType'];
                const itemType = item.Type.substring(0, item.Type.indexOf('_')),
                    itemClassType = item.Type.substring(item.Type.lastIndexOf("_") + 1);
                if(item.SubMenu.length > 0)
                {
                    let repeatPathElement = array.find(el => el.Href.split('/')[0] == item.Href);
                    item.preventActive = !!repeatPathElement;
                }

                const parsedStyleTypeItem = JSON.parse(JSON.parse(styleTypeItem));

                item.data = parsedStyleTypeItem;

                /*if(!index)
                    this.isLeftMenu = parsedStyleTypeItem['dir'] == 1;*/

                if (parsedStyleTypeItem['style'] != undefined) {
                    item['className'] = itemClassType + '-' + parsedStyleTypeItem['style'];
                }

                if (parsedStyleTypeItem['animated'] != undefined) {
                    item['animated'] = parsedStyleTypeItem['animated'] === '1' ? true : false;
                }

                if (parsedStyleTypeItem['new'] != undefined) {
                    item['new'] = parsedStyleTypeItem['new'] === '1' ? true : false;
                }

                if (itemType == 'marqueeItem') {
                    this.getTickers();
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
                if (this.isLogin)
                {
                    if (parsedStyleTypeItem.visibility !== 'loggedOut')
                    {
                        if(isLeft)
                        {
                            this.generalMenuLeftItems.push(item);
                        }
                        else
                        {
                            this.generalMenuRightItems.push(item);
                        }
                        return item;
                    }

                }
                else
                {
                    if (parsedStyleTypeItem.visibility !== 'loggedIn')
                    {
                        if(isLeft)
                        {
                            this.generalMenuLeftItems.push(item);
                        }
                        else
                        {
                            this.generalMenuRightItems.push(item);
                        }
                        return item;
                    }
                }
            });
            this.saveStateSbj.next(true);

        });

        this.saveData.showSignUpSection.subscribe((data) => {

            if (data === 'signUp') {
                this.showConfirm('open_register');
            }
        });

    }

    public getActiveRouteName(url) {
        this.realRouteName = url.substring(url.indexOf("/") + 1);

        if (this.realRouteName.includes("#")) {
            this.activeRouterName = this.realRouteName.substring(0, this.realRouteName.indexOf('#'));
        } else {
            if (this.realRouteName.startsWith("product") || this.realRouteName.startsWith("category"))
                this.activeRouterName = this.realRouteName;
            else if (this.realRouteName.includes('/')) {
                this.activeRouterName = this.realRouteName.substring(0, this.realRouteName.indexOf('/')) != 'sport' ? this.realRouteName.substring(0, this.realRouteName.indexOf('/')) : this.realRouteName;
            } else {
                this.activeRouterName = this.realRouteName;
            }
        }
    }


    public getHeaderPanel1MenuItems() {
        this.baseControllerService.GetMenu('HeaderPanel1Menu', 'en').then((data: any) => {

            let isLeft = true;

            this.panel1MenuItems = data.filter((item, index) =>
            {
                if(item.Orientation)
                    isLeft = false;

               /* if (this.bonus == '0.00') {
                    if (item.Type == 'bonusBalanceTxt_text') {
                        return false;
                    }
                }*/

                const styleTypeItem = item['StyleType'];
                const itemType = item.Type.substring(0, item.Type.indexOf('_')),
                    itemClassType = item.Type.substring(item.Type.lastIndexOf("_") + 1);
                const parsedStyleTypeItem = JSON.parse(JSON.parse(styleTypeItem));

               /* if(!index)
                    this.isTopMenu = parsedStyleTypeItem['dir'] == 1;*/

                item.data = parsedStyleTypeItem;

                if (parsedStyleTypeItem['isPlay'] != undefined) {
                    item['animationName'] = parsedStyleTypeItem['isPlay'];
                }

                if (parsedStyleTypeItem['style'] != undefined) {
                    item['className'] = itemClassType + '-' + parsedStyleTypeItem['style'];
                }

                if (parsedStyleTypeItem['animated'] != undefined) {
                    item['animated'] = parsedStyleTypeItem['animated'] === '1' ? true : false;
                }

                item['contentType'] = itemType;
                item['config'] = parsedStyleTypeItem;
                item['config']['contentType'] = item.contentType;
                item['config']['Title'] = item.Title;

                if(itemType == 'logoImg')
                    this.logoExtension = item.Icon;

                if(itemType == 'loginDpd') {
                    this.showLoginComponent = true;
                }


                if (parsedStyleTypeItem['images'] != undefined) {
                    item['dropdownImage'] = parsedStyleTypeItem['images'];
                }

                if (parsedStyleTypeItem['itemTitle'] != undefined) {
                    item['itemTitle'] = parsedStyleTypeItem['itemTitle'];
                }

                if (itemType == 'marqueeItem') {
                    this.getTickers();
                }


                if (parsedStyleTypeItem['title'] != undefined) {
                    item['dropdownTitle'] = parsedStyleTypeItem['title'];
                }
                item.Src = item.Icon.includes('.') ? '../../../../../../../assets/images/header-panel-1-menu/' + item.Icon : null;
                if (this.isLogin)
                {
                    if (parsedStyleTypeItem.visibility !== 'loggedOut')
                    {
                        if(isLeft)
                        {
                            this.panel1MenuLeftItems.push(item);
                        }
                        else
                        {
                            this.panel1MenuRightItems.push(item);
                        }
                        return item;
                    }
                }
                else
                {
                    if (parsedStyleTypeItem.visibility !== 'loggedIn')
                    {
                        if(isLeft)
                        {
                            this.panel1MenuLeftItems.push(item);
                        }
                        else
                        {
                            this.panel1MenuRightItems.push(item);
                        }
                        return item;
                    }
                }

            });
            this.showPanel1 = this.panel1MenuItems.length > 0;
            this.panel1StateSbj.next(true);
        });
    }

    errorHandler(event) {
        event.target.src = '../../../../../../../assets/images/logo' + this.logoExtension;
    }

    onNavigateToForgot() {
        if (this.showLoginComponent) {
            this.showLoginDropdown = false;
        } else {
            this.router.navigate(['/forgot-password']);
        }
    }

    ngOnInit()
    {
        super.ngOnInit();

        this.saveData.openPopup.subscribe((data) => {
            if (data == 1)
            {
                if (this.showLoginComponent) {
                    this.showLoginDropdown = true;
                } else {
                    this.showConfirm('open_login');
                }
            } else if (data == 2)
            {
                this.showConfirm('open_register');
            }
        });


        this.stateService.onOpenModal$.subscribe(async (data) =>
        {
            switch (data.label)
            {
                case 'deposit':
                {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'withdraw':
                {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'profile':
                {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'history':
                {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'tickets':
                {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'verification': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'transactions': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'self-limitation': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'payment': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'credit': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'document-Verification': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'bonuses': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'payments': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'bank-accounts': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'credit-check': {
                    const { AccountPageType3DefaultComponent } = await import('../account-pages-module-type3/default/account-page-type3-default.component');
                    this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                        {title: data.label}, {closeOnClickOutside: true}).subscribe(() => {
                    });
                    break;
                }
                case 'deleteBank':
                {
                    this.simpleModalService.addModal(AppCommonBankMessageModalComponent, {
                        title: 'Delete Bank',
                        message: true,
                        data: { data:data}
                    }).subscribe(() => {});
                }
            }
        });

        this.saveStateSbj.pipe(debounceTime(300)).subscribe(data =>
        {
            this.renderHeader(data);
        });
        this.panel1StateSbj.pipe(debounceTime(300)).subscribe(data =>
        {
            this.renderPanel1(data);
            this.setHeaderPosition(this.baseControllerService.GetMenuByType(MenuType.HEADER_PANEL_1_MENU)?.position);
        });
        this.openModal = this.baseControllerService.GetMenuByType(MenuType.HEADER_PANEL_1_MENU)?.openModal;
        this.openLimitNotifications();
    }

    test(path: string) {
        this.router.navigate(["/" + path]);
    }



    public openLanguageMenu() {
        this.showLanguageDropdown = !this.showLanguageDropdown;
    }

    public showConfirm(titleName = '')
    {
        this.simpleModalService.addModal(AppConfirmComponent, {
            title: titleName == '' ? 'Confirm title' : titleName,
            message: true,
        }, {closeOnClickOutside: titleName == 'open_login'}).subscribe((isConfirmed) => {
            this.confirmResult = isConfirmed;
        });
        if (this.showLoginComponent) {
            this.showLoginDropdown = false;
        }
    }


    public openNotLoginNewTicket(item) {
        if(!item.Href)
        {
            this.simpleModalService.addModal(AppOpenTicketComponent, {
                title: 'Open ticket',
                data: {notLogin: true},
                message: true
            }).subscribe(() => {
            });
        }
    }

    public openLimitNotifications() {
        this.signalRService.onDepositLimitInfo$.subscribe(data => {
            this.updatedData = data;
            if (this.isLogin && (data.DailyDepositLimitPercent >= 80 || data.WeeklyDepositLimitPercent >= 80 || data.MonthlyDepositLimitPercent >= 80)) {
                // this.translate.get('User.Limit Info details').subscribe((res) => {
                //     this.updatedData = res.replace('number', currentValue);
                // });
                this.simpleModalService.addModal(LimitNotificationsComponent, {
                    title: 'Limit Notifications',
                    data: { notLogin: true, updatedData: data },
                    message: true
                }).subscribe(() => {});
            }
        });
        this.signalRService.onBetLimitInfo$.subscribe(res => {
            this.updatedData = res;
            if (this.isLogin && (res.DailyBetLimitPercent >= 80 || res.WeeklyBetLimitPercent >= 80 || res.MonthlyBetLimitPercent >= 80)) {
                // this.translate.get('User.Limit Info details').subscribe((res) => {
                //     this.updatedData = res.replace('number', currentValue);
                // });
                this.simpleModalService.addModal(LimitNotificationsComponent, {
                    title: 'Limit Notifications',
                    data: { notLogin: true, updatedData: res },
                    message: true
                }).subscribe(() => {});
            }
        });
    }

    public onMenuItem(menuItem)
    {
        if(menuItem.SubMenu.length && !menuItem.Href.includes('/'))
            return;
        if (menuItem.Title === 'Balance' || menuItem.Title === 'Time') {
            return;
        }
        this.clickInRoute(menuItem);
        this.changePage(menuItem.Href);
    }

    changePage(pageName) {
        if (pageName.includes("#"))
        {
            let splitPathName = pageName.split("#");
            let fragment = splitPathName[1];
            pageName = splitPathName[0];
            this.router.navigate(['/' + pageName], {fragment: fragment});
        } else {
            if (pageName != '') {
                if (pageName.includes('announcements')) {
                    this.popupsService.openCustomPage(3);
                } else
                {
                    const result = getParsedUrl(pageName);
                    this.router.navigate(['/' + pageName.split('?')[0]], {queryParams: result ? result : ''});
                }
            }
        }


    }

    public renderPanel1(isFirstTime:boolean = false)
    {
        const headerMenu = this.panel1MenuRef?.nativeElement;
        const moreMenu = this.panel1MoreMenuRef?.nativeElement;
        const rightPart = this.panel1RightPartRef?.nativeElement;
        if(headerMenu && moreMenu)
        {
            if(isFirstTime)
            {
                this.panel1moreMenuWidth = moreMenu.clientWidth;
                moreMenu.style.visibility = 'visible';
                headerMenu.style.visibility = 'visible';
                const dynamicItems = headerMenu.querySelectorAll(".dynamic-item");
                dynamicItems.forEach(elem => {
                    this.panel1ItemsWidth.push(elem.scrollWidth);
                });
                this.panel1TotalWidth = this.panel1ItemsWidth.reduce((a, b) => a + b, 0) + rightPart.clientWidth + moreMenu.clientWidth;
            }



            if((this.panel1TotalWidth <= headerMenu.clientWidth) || !(this.panel1MenuLeftItems.length))
            {
                headerMenu.querySelectorAll(".dynamic-item").forEach(elem => elem.style.display = 'flex');
                moreMenu.style.display = 'none';
            }
            else
            {
                const menus = [];
                moreMenu.style.display = 'flex';
                let offset = this.panel1TotalWidth - headerMenu.clientWidth + this.panel1moreMenuWidth;
                const dynamicItems = headerMenu.querySelectorAll(".dynamic-item");
                for(let i = dynamicItems.length - 1; i > 0; i--)
                {
                    if(offset > 0)
                    {
                        dynamicItems[i].style.display = 'none';
                        menus.push(this.panel1MenuLeftItems[i]);
                    }
                    else dynamicItems[i].style.display = 'flex';

                    offset -= this.panel1ItemsWidth[i];
                    this.panel1MenuMoreItems = [...menus].reverse();
                }
            }
        }
    }

   public renderHeader(isFirstTime:boolean = false)
    {
        if(this.generalMenu && this.moreMenu)
        {
            const headerMenu = this.generalMenu.nativeElement
            const moreMenu = this.moreMenu.nativeElement;
            if(isFirstTime)
            {
                this.moreMenuWidth = moreMenu.clientWidth;
                moreMenu.style.visibility = 'visible';
                headerMenu.style.visibility = 'visible';
                const dynamicItems = headerMenu.querySelectorAll(".dynamic-item");
                dynamicItems.forEach(elem => this.itemsWidth.push(elem.clientWidth));
                this.scrollWidth = headerMenu.scrollWidth;
            }

            if(((this.scrollWidth) <= headerMenu.clientWidth + this.moreMenuWidth) || !(this.generalMenuLeftItems.length))
            {
                headerMenu.querySelectorAll(".dynamic-item").forEach(elem => elem.style.display = 'flex');
                moreMenu.style.display = 'none';
            }
            else
            {
                const menus = [];
                moreMenu.style.display = 'flex';
                let offset = this.scrollWidth - headerMenu.clientWidth + this.moreMenuWidth;
                const dynamicItems = headerMenu.querySelectorAll(".dynamic-item");
                for(let i = dynamicItems.length - 1; i > 0; i--)
                {
                    if(offset > 0)
                    {
                        dynamicItems[i].style.display = 'none';
                        menus.push(this.generalMenuLeftItems[i]);
                    }
                    else dynamicItems[i].style.display = 'flex';

                    offset -= this.itemsWidth[i];
                    this.generalMenuMoreItems = [...menus].reverse();
                }
            }
        }
    }

    private setHeaderPosition(position)
    {
        if(position == 'fixed')
        {
            const header = document.getElementById('header-section');
            const mainContent = document.getElementById('main-container');
            header.style.position = 'fixed';
            header.style.width = "100%";
            header.style.top = '0px';
            mainContent.style.position = "relative";
            mainContent.style.top = header.offsetHeight + 'px';
        }
    }

 getTickers() {
        return this.baseApiService.apiPost('', {}, Methods.GET_TICKER, false).pipe(take(1)).subscribe((data) => {
            if(data.ResponseCode === 0)
            {
                this.marqueeText = data.ResponseObject;
            }
        });
    }

    navigateByHref(item)
    {
        if(item.Href)
            this.router.navigate(['/' + item.Href]);
    }
}
