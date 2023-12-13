import {Injectable, Injector} from '@angular/core';
import {Subject, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";

@Injectable()
export class SaveData
{
    constructor(public injector: Injector) {
        this.router = injector.get(Router);
        this.baseControllerService = injector.get(BaseControllerService);
    }
    public baseControllerService: BaseControllerService;
    public router: Router;
    public clickonButton = new Subject();
    public clickForgotPassword = new Subject();
    public toggleChangePassword$ = new Subject();
    public getBalance = new Subject();
    public paymentForm = new Subject();
    public addAccount = new Subject();
    public gameProviderName = new Subject();
    public ticketsCount = new Subject();
    public promotionId = new Subject();
    public openGame = new Subject();
    public gameProviderId = new Subject();
    public isGameOpenFromInternal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public mobileOpenerRouteUrl: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public userPageInfo = new Subject();
    public TotalAvailableBalance: number = 0;
    public openPopup = new Subject();
    public changeUrlName = new Subject();
    public registerReferalData: any;
    public openTicket = new Subject();
    public changePageRoute = new Subject<string>();
    public showSignUpSection = new Subject();
    public changeBonus = new Subject();
    public changeNickName = new Subject();
    public currentScrollPosition$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public changeMobItem$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public mobileLoginPreviousState;
    public currentSubItem;
    public selectedItem;
    public selectedMobItem;
    public currentMobSubItem;
    public menuList: Array<any> = [];
    public selectedProvider:any;
    public openPopupByLab = new Subject();
    public updateScrollPositionData(shouldUpdate:boolean = false, pageIndex:number, pageSize:number)
    {
        let currentValue = this.currentScrollPosition$.getValue();

        if(currentValue && pageSize === undefined)
        {
            currentValue.shouldUpdate = shouldUpdate;
        }
        else
        {
            const scrollPosition = window.scrollY;
            if(currentValue)
            {
                currentValue.pageIndex = 0;
                currentValue.pageSize = (pageIndex || 1) * pageSize;
                currentValue.scrollY = scrollPosition;
            }
            else
            {
                currentValue =
                {
                    pageIndex : 0,
                    pageSize : (pageIndex || 1) * pageSize,
                    scrollY : scrollPosition
                }
            }
        }

        this.currentScrollPosition$.next(currentValue);
    }

    public keepOrResetScrollPosition()
    {
        let currentValue = this.currentScrollPosition$.getValue();
        if(currentValue && !currentValue.shouldUpdate)
        {
            currentValue = null;
            this.currentScrollPosition$.next(currentValue);
        }
    }
    getMobileLoginPreviousState() {
        this.mobileLoginPreviousState = this.router.url;
    }
    getCurrentSubItem(item) {
        this.currentSubItem = item;
        this.selectedItem = item;
        this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
            this.menuList = data.filter((item) => item.Type !== 'submenu');
            this.menuList.forEach(el => {
                if(el.SubMenu.includes(this.currentSubItem)) {
                    this.selectedItem = el;
                }
            })
        });
    }
    getItem(item) {
        this.currentSubItem = item;
        this.selectedItem = item;
    }

    getMobItem(item) {
        this.currentMobSubItem = item;
        // this.selectedMobItem = item;
        this.changeMobItem$.next(item);
    }
}


