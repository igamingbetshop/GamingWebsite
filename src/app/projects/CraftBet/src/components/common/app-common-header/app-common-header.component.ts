import {Directive, Injector} from '@angular/core';
import {
    ConfigService,
    SharedService,
    LocalStorageService
} from '../../../../../../@core/services';
import {TranslateService} from "@ngx-translate/core";
import {SimpleModalService} from 'ngx-simple-modal';
import {BaseControllerService} from "@core/services/app/baseController.service";
import {BaseHeaderComponent} from '../../../../../../@theme/components/common/base-header/base-header.component';
import {BaseService} from "@core/services/app/base.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {BalanceService} from "@core/services/api/balance.service";
import {LangService} from "@core/services/app/lang.service";
import {SignalRService} from "@core/services/soket/signal-r.service";
import {MenuType} from "@core/enums";

@Directive()
export class AppCommonHeaderComponent extends BaseHeaderComponent {

    public configService: ConfigService;
    public baseControllerService: BaseControllerService;
    public userLogined: UserLogined;
    public baseService: BaseService;
    public langService: LangService;
    public sharedService: SharedService;
    public localStorageService: LocalStorageService;
    public translate: TranslateService;
    public simpleModalService: SimpleModalService;
    public balanceService: BalanceService;
    public unreadMessagesCount: number;
    protected signalRService: SignalRService;

    public userData: any;
    public currentLang: any;
    public confirmResult = null;
    public balance: string;
    public unusedBalance: string;
    public bonus: string;
    public currencySymbol: any;
    public defaultOption: any;
    public columnCount: number;
    public userInfoData: any;

    logoUrl = '';
    logoExtension = '';
    public updatedData: any;
    public responsive:boolean;

    constructor(public injector: Injector) {
        super(injector);
        this.configService = injector.get(ConfigService);
        this.baseControllerService = injector.get(BaseControllerService);
        this.userLogined = injector.get(UserLogined);
        this.baseService = injector.get(BaseService);
        this.langService = injector.get(LangService);
        this.sharedService = injector.get(SharedService);
        this.localStorageService = injector.get(LocalStorageService);
        this.translate = injector.get(TranslateService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.balanceService = injector.get(BalanceService);
        this.userData = this.localStorageService.get('user');
        this.userInfoData = this.userLogined.getUserInfo();
        this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
        this.signalRService = injector.get(SignalRService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.defaultOption = this.configService.defaultOptions;
        this.columnCount = Math.round(this.configService.defaultOptions.Languages.length / 11);
        this.currentLang = this.langService.getCurrentLang('');

        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.balance = Number(data.AvailableBalance).toFixed(2);
            this.unusedBalance = Number(data.UnusedBalance).toFixed(2);
            this.bonus = Number(data.BonusBalance) > 0 ? Number(data.BonusBalance).toFixed(2) : "0.00";
        });
        const responsive1 = this.baseControllerService.GetMenuByType(MenuType.HEADER_PANEL_1_MENU)?.responsive;
        const responsive2 = this.baseControllerService.GetMenuByType(MenuType.HEADER_PANEL_2_MENU)?.responsive;
        this.responsive = responsive1 || responsive2;
    }

    public changeLanguage(langKey) {
        this.currentLang = this.langService.getCurrentLang(langKey);
    }

    public logOut() {
        this.baseService.logOut().then(() => {
        });
    }

}
