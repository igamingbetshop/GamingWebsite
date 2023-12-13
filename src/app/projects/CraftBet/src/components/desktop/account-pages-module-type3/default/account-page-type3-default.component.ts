import {
    AfterViewInit,
    Component,
    createNgModuleRef, ElementRef,
    Injector,
    NgModule,
    NgModuleRef, OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService, ExportDataService, LocalStorageService, SaveData} from '@core/services';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {SimpleModalComponent, SimpleModalModule} from 'ngx-simple-modal';
import {ConfirmModel} from '@core/interfaces';
import {GetSettingsService} from '@core/services/app/getSettings.service';
import {FriendsService} from '@core/services/api/friends.service';
import {BonusesService} from '@core/services/api/bonuses.service';
import {GetBetsHistoryService} from '@core/services/app/getBetsHistory.service';
import {PaymentControllerService} from '@core/services/app/paymentController.services';
import {BetsService} from '@core/services/app/bets.services';
import {GetTransactionsService} from '@core/services/app/getTransactions.service';
import {GetPaymentsService} from '@core/services/app/getPayments.service';
import {MenuType} from '@core/enums';
import {BaseControllerService} from '@core/services/app/baseController.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {NgxMaskModule} from 'ngx-mask';
import {ThemeModule} from '../../../../../../../@theme/theme.module';
import {GlobalLogoutModule} from '../../../../../../../@theme/components/global-logout/global-logout.module';
import {ProfileService} from '../../../../../../../@theme/components/profile/service/profile.service';
import {HorizontalScrollDirectiveModule} from '../../../../../../../@theme/directives/horizontal-scroll/horizontal-scroll.directive.module';
import {HorizontalScrollDirective} from '../../../../../../../@theme/directives/horizontal-scroll/horizontal-scroll.directive';
import {TriggersModule} from "../../../../../../../@theme/components/common/base-triggers/triggers.module";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {debounceTime, take} from "rxjs/operators";
import {BaseService} from "@core/services/app/base.service";

@Component({
    selector: 'app-account-page-type3-default',
    templateUrl: './account-page-type3-default.component.html',
    styleUrls: ['./account-page-type3-default.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccountPageType3DefaultComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit, AfterViewInit, OnDestroy {
    @ViewChild('accountPageRef', {read: ViewContainerRef, static: true}) accountPageRef;
    @ViewChild('horizontalScrollContainer', { static: true }) horizontalScrollContainer: ElementRef;
    @ViewChild(HorizontalScrollDirective, { static: true }) horizontalScrollDirective: HorizontalScrollDirective;
    public title: string;
    public data;
    public router: Router;
    public configService: ConfigService;
    public baseControllerService: BaseControllerService;
    public faCaretDown = faCaretDown;
    public savedDateService: SaveData;
    public localStorageService: LocalStorageService;
    public redirected = false;
    public menuList: Array<any> = [];
    public tabType = 'top';
    public userData: any;
    public currentTitle: any;
    private translate: TranslateService;

    private subscription:Subscription;

    private currentComponentRef: any;
    private tabChangeNotifier: BehaviorSubject<string> = new BehaviorSubject("");

    constructor(public injector: Injector, private el: ElementRef, private baseService: BaseService) {
        super();
        this.configService = injector.get(ConfigService);
        this.savedDateService = injector.get(SaveData);
        this.router = injector.get(Router);
        this.baseControllerService = injector.get(BaseControllerService);
        this.translate = injector.get(TranslateService);
        this.localStorageService = injector.get(LocalStorageService);
        this.userData = this.localStorageService.get('user');

        this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
            const source = JSON.parse(JSON.stringify(data));
            this.menuList = [];
            this.menuList = source.filter((item) => item.Type !== 'submenu');
            for (let i = 0; i < this.menuList.length; i++) {
                if (this.menuList[i].Type && this.menuList[i].Type.startsWith('SubMenu')) {
                    const parentIndex = this.menuList.findIndex(menu => menu.Title === this.menuList[i].Type.split('_')[1]);
                    if (parentIndex > -1) {
                        this.menuList[i].Type = 1;
                        this.menuList[parentIndex].SubMenu.unshift(this.menuList[i]);
                    }
                    this.menuList.splice(i, 1);
                    i--;
                }
            }
            this.menuList.forEach(el => {
                el.SubMenu.forEach(subMenuItem => {
                    if (subMenuItem?.Href !== '') {
                        this.savedDateService.selectedItem = el;
                        const matchingSubMenuItem = el.SubMenu.find(item => item.Href === this.title);
                        if (matchingSubMenuItem) {
                            this.savedDateService.currentSubItem = matchingSubMenuItem;
                        }
                    }
                });
            });
            const direction = this.baseControllerService.GetMenuByType(MenuType.ACCOUNT_TAB_LIST)?.direction;
            if (direction) {
                this.tabType = direction;
            }
        });
    }

    ngOnInit()
    {
        this.subscription = new Subscription();
        this.subscription.add(this.tabChangeNotifier.subscribe(title => {
            this.openComponent(title || this.title, this.data);
        }));
    }

    ngAfterViewInit() {
        this.scrollToItem(this.title);
    }

    changeStep(direction) {
        const el = this.horizontalScrollContainer.nativeElement;
        // const step = (direction * el.offsetWidth + direction * 16);
        const step = (direction * 500);
        el.scrollTo({
            left: el.scrollLeft + step,
            behavior: 'smooth'
        });
    }

    scrollToItem(title: any) {
        const container = this.horizontalScrollContainer.nativeElement;
        const targetElements = Array.from(container.getElementsByClassName('title_menu active'));

        if (targetElements.length > 0) {
            const targetElement = targetElements[0] as HTMLElement;
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    onTabChange(href: string) {
        this.tabChangeNotifier.next(href);
    }

    async openComponent(item: any, data?: any) {
        if (item === this.currentTitle) {
            return;
        }
        this.currentTitle = item;
        let moduleRef;
        if (this.currentComponentRef) {
            this.accountPageRef.clear();
        }
        switch (item) {
            case 'tickets': {
                const {AccountPageType3TicketsModule} = await import('../tickets/account-page-type3-tickets.module');
                moduleRef = createNgModuleRef(AccountPageType3TicketsModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'verification': {
                const {AccountPageType3VerificationModule} = await import('../verification/account-page-type3-verification.module');
                moduleRef = createNgModuleRef(AccountPageType3VerificationModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'history': {
                const {AccountPageType3HistoryModule} = await import('../history/account-page-type3-history.module');
                moduleRef = createNgModuleRef(AccountPageType3HistoryModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef, data);
                break;
            }
            case 'transactions': {
                const {AccountPageType3TransactionsModule} = await import('../transactions/account-page-type3-transactions.module');
                moduleRef = createNgModuleRef(AccountPageType3TransactionsModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'self-limitation': {
                const {AccountPageType3SelfLimitationModule} = await import('../self-limitation/account-page-type3-self-limitation.module');
                moduleRef = createNgModuleRef(AccountPageType3SelfLimitationModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'deposit': {
                const {AccountPageType3DepositBlockModule} = await import('../deposit-block/account-page-type3-deposit-block.module');
                moduleRef = createNgModuleRef(AccountPageType3DepositBlockModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'withdraw': {
                const {AccountPageType3WithdrawBlockModule} = await import('../withdraw-block/account-page-type3-withdraw-block.module');
                moduleRef = createNgModuleRef(AccountPageType3WithdrawBlockModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'profile': {
                const {AccountPageType3ProfileModule} = await import('../profile/account-page-type3-profile.module');
                moduleRef = createNgModuleRef(AccountPageType3ProfileModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'payment': {
                const {AccountPageType3PaymentModule} = await import('../payment/account-page-type3-payment.module');
                moduleRef = createNgModuleRef(AccountPageType3PaymentModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'credit': {
                const {AccountPageType3CreditModule} = await import('../credit/account-page-type3-credit.module');
                moduleRef = createNgModuleRef(AccountPageType3CreditModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'document-Verification': {
                const {AccountPageType3DocumentVerificationModule} = await import('../document-verification/account-page-type3-document-verification.module');
                moduleRef = createNgModuleRef(AccountPageType3DocumentVerificationModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'bonuses': {
                const {AccountPageType3BonusesModule} = await import('../bonuses/account-page-type3-bonuses.module');
                moduleRef = createNgModuleRef(AccountPageType3BonusesModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'payments': {
                const {AccountPageType3PaymentsModule} = await import('../payments/account-page-type3-payments.module');
                moduleRef = createNgModuleRef(AccountPageType3PaymentsModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'bank-accounts': {
                const {AccountPageType3BankAccountsModule} = await import('../bank-accounts/account-page-type3-bank-accounts.module');
                moduleRef = createNgModuleRef(AccountPageType3BankAccountsModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
            case 'credit-check': {
                const {AccountPageType3CreditModule} = await import('../credit-check/account-page-type3-credit-check.module');
                moduleRef = createNgModuleRef(AccountPageType3CreditModule, this.injector);
                this.createCommonComponent(moduleRef, this.accountPageRef);
                break;
            }
        }
    }

    private createCommonComponent(moduleRef: NgModuleRef<any>, containerRef: ViewContainerRef, data?: any) {
        const component = moduleRef.instance.getComponent();
        containerRef.clear();
        this.currentComponentRef = containerRef.createComponent(component, {ngModuleRef: moduleRef});
        this.currentComponentRef.instance.transactionId = data;
    }

    logout() {
        this.baseService.logOut().then(() => {
        });
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }


}

@NgModule({
    declarations: [
        AccountPageType3DefaultComponent
    ],
    imports: [
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SimpleModalModule,
        HttpClientModule,
        FilterPipeModule,
        NgxMaskModule.forRoot(),
        ThemeModule,
        GlobalLogoutModule,
        HorizontalScrollDirectiveModule,
        TriggersModule
    ],
    providers: [
        GetSettingsService,
        FriendsService,
        BonusesService,
        GetBetsHistoryService,
        PaymentControllerService,
        BetsService,
        GetTransactionsService,
        GetPaymentsService,
        ProfileService,
        ExportDataService
    ],
})
export class AccountPageType3DefaultModule {
}
