import {Directive, inject, Injector} from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {SaveData} from "@core/services";

import {
    SharedService,
    ConfigService,
    LocalStorageService
} from "@core/services";

import {TicketsService} from '../../../../@core/services/api/tickets.service';
import {TranslateService} from "@ngx-translate/core";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";
import {Router} from "@angular/router";
import {getParsedUrl} from "@core/utils";
import {BaseService} from "@core/services/app/base.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {BalanceService} from "@core/services/api/balance.service";
import {LangService} from "@core/services/app/lang.service";
import {StateService} from "@core/services/app/state.service";
import {MatDialog} from "@angular/material/dialog";

@Directive()
export class BaseHeaderComponent extends BaseComponent {

    public currentLang: any;
    public isLogin: boolean;
    public balance: string;
    public unreadMessagesCount: number;

    /*
    ** Desktop Change
    */

    public defaultOptions: any;
    public headerList: Array<any> = [];
    public accoutList: Array<any> = [];
    public userData: any;


    public langService: LangService;
    public userLogined: UserLogined;
    public translate: TranslateService;
    public baseService: BaseService;
    public baseControllerService: BaseControllerService;
    public sharedService: SharedService;
    public balanceService: BalanceService;
    dialog = inject(MatDialog);
    public configService: ConfigService;
    public localStorageService: LocalStorageService;
    public ticketsService: TicketsService;
    public saveData: SaveData;
    stateService:StateService;
    public router: Router;
    public selectedItem;

    constructor(public injector: Injector) {
        super(injector);

        this.langService = injector.get(LangService);
        this.userLogined = injector.get(UserLogined);
        this.translate = injector.get(TranslateService);
        this.baseService = injector.get(BaseService);
        this.baseControllerService = injector.get(BaseControllerService);
        this.sharedService = injector.get(SharedService);
        this.balanceService = injector.get(BalanceService);
        this.configService = injector.get(ConfigService);
        this.localStorageService = injector.get(LocalStorageService);
        this.ticketsService = injector.get(TicketsService);
        this.saveData = injector.get(SaveData);
        this.stateService = injector.get(StateService);

        this.isLogin = this.userLogined.isAuthenticated;
        this.userData = this.localStorageService.get('user');
        this.router = this.injector.get(Router);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.isLogin) {
            this.ticketsService.GetClientStates();
            setInterval(() => {
                this.ticketsService.GetClientStates();
            }, 60000);
        }

        this.defaultOptions = this.configService.defaultOptions;
        this.currentLang = this.langService.getCurrentLang('');


        this.subscriptions.push(this.ticketsService.notifyUpdateUserMessages.subscribe((data) => {
            this.unreadMessagesCount = data['UnreadMessagesCount'];
        }));

        this.saveData.openTicket.subscribe((ticketItem) => {
            this.unreadMessagesCount = this.unreadMessagesCount - 1;
        });

        this.baseControllerService.GetMenu(MenuType.GENERAL_MENU, 'en').then((data: any) => {
            this.headerList = data;
        });

        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.balance = Number(data.AvailableBalance).toFixed(2);
        });

    }


    public clickInRoute(routeEvent)
    {
        if(typeof routeEvent === 'object' && routeEvent.Href === '')
            return;

        if(routeEvent.Href === 'chat')
        {
            this.stateService.toggleChat();
            return;
        }
        else
        {
            this.selectedItem = routeEvent;
            let href = typeof (routeEvent) == "string" ? routeEvent : routeEvent.Href;
            let result = getParsedUrl(href);
            if(href.includes('http'))
            {
                let url = href.startsWith('/') ? href.substr(1) : href;
                window.open(url, '_blank');
            }
            else
            {
                this.router.navigate(['/' + href.split('?')[0]], {queryParams: result ? result : ''});
                window.scroll(0,0);
                this.saveData.isGameOpenFromInternal.next(true);
                this.saveData.changeUrlName.next(href);
                if(href == 'prematch' || href == 'live' || href == 'sport/prematch' || href == 'sport/live')
                {
                    this.sharedService.notifyRouteChangeToSport(href);
                    if(this.configService.defaultOptions.SportOpenMode === 'migrated')
                    {
                        this.sharedService.notifyMigratedSportRouteChange(href);
                    }
                }
            }
        }
    }

    navigateByHref(item)
    {
        if(item.Href)
            this.router.navigate(['/' + item.Href]);
    }

    public openSubMenuByUrl(href)
    {
        const httpsIndex = href.indexOf('https');
        if (httpsIndex !== -1) {
            const httpsLink = href.substring(httpsIndex);
            window.location.href = httpsLink;
        }
        let result = getParsedUrl(href);
        if (href.includes('/parent')) {
            const remainingUrl = href.substring(href.indexOf('/parent') + '/parent'.length);
            this.router.navigateByUrl(remainingUrl);
        } else {
            this.router.navigate(['/' + href.split('?')[0]], {queryParams: result ? result : ''});
        }
    }

    public changeLanguage(langKey) {
        this.currentLang = this.langService.getCurrentLang(langKey);
    }

    public logOut() {
        this.baseService.logOut().then(() => {
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
