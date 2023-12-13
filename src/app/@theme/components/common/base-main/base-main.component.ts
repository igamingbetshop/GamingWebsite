import {OnInit, Injector, HostListener, Directive} from '@angular/core';
import {AuthService, ConfigService, LocalStorageService, SaveData} from "@core/services";
import {getParsedUrl, loadExternalScript} from "@core/utils";
import {NavigationEnd, Router} from "@angular/router";
import {MenuType} from "@core/enums";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {SimpleModalService} from 'ngx-simple-modal';
import {UserLogined} from "@core/services/app/userLogined.service";
import {LogoutHelper} from "@core/services/helpers/logout.helper";
import {BalanceService} from "@core/services/api/balance.service";

@Directive()
export class BaseMainComponent implements OnInit {

    public configService: ConfigService;
    public router: Router;
    public userLogined: UserLogined;
    public authService: AuthService;
    public baseControllerService: BaseControllerService;
    public localStorageService: LocalStorageService;
    public savedData: SaveData;
    public simpleModalService: SimpleModalService;
    public isFullContent:boolean = false;

    public mobileBottomSideBar: Array<any> = [];
    private logoutHelper:LogoutHelper;
    private balanceService: BalanceService;
    protected saveData: SaveData;
    bonusPromise:any;

    constructor(public injector: Injector)
    {
        this.configService = injector.get(ConfigService);
        this.userLogined = injector.get(UserLogined);
        this.baseControllerService = injector.get(BaseControllerService);
        this.localStorageService = injector.get(LocalStorageService);
        this.router = injector.get(Router);
        this.savedData = injector.get(SaveData);
        this.authService = injector.get(AuthService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.logoutHelper = injector.get(LogoutHelper);
        this.balanceService = injector.get(BalanceService);
        this.saveData = injector.get(SaveData);
        this.getBottomMenuList();

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd)
            {
                this.getBottomMenuList();
                this.isFullContent = e.url.includes('sport');
            }
        });
        this.isFullContent = this.router.url.includes('sport');

    }
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void
    {
        this.bonusPromise = setTimeout(() =>{
            clearTimeout(this.bonusPromise);
            let className = (event.target as Element).className;
            if(typeof className === 'string')
            {
                let splitPart = className.lastIndexOf('_');
                let data = className.substring(splitPart + 1);
                if ((event.target as Element).id == 'campaign_bonus')
                {
                    event.preventDefault();
                    event.stopPropagation();
                    if (this.userLogined.isAuthenticated)
                    {
                        this.balanceService.getClimeToCampaignBonus(data).subscribe((responseData) =>
                        {
                            if (responseData['ResponseCode'] === 0)
                            {
                                this.openMessage({type: '1', 'message': 'Campain_bonus_success'});
                            }
                            else
                            {
                                this.openMessage({type: '2', 'message': responseData.Description});
                            }
                        });

                    } else {
                        this.saveData.openPopup.next(1);
                    }
                }
                else if ((event.target as Element).id == 'spend_points')
                {
                    event.preventDefault();
                    event.stopPropagation();
                    if (this.userLogined.isAuthenticated)
                    {
                        this.balanceService.spendComplimentaryPoints(data).subscribe((responseData) =>
                        {
                            if (responseData['ResponseCode'] === 0)
                            {
                                this.openMessage({type: '1', 'message': 'SpendComplimentaryPointsSuccess'});
                            }
                            else
                            {
                                this.openMessage({type: '2', 'message': responseData.Description});
                            }
                        });

                    }
                    else
                    {
                        this.saveData.openPopup.next(1);
                    }
                }
            }
        }, 500);


    }
    async openMessage(info) {
        const {BaseInfoModalComponent} = await import('../../modals/base-info-modal/base-info-modal.component');

        this.simpleModalService.addModal(BaseInfoModalComponent, {
            title: 'message',
            type: info['type'],
            message: info['message']
        }).subscribe();
    }

    ngOnInit()
    {
        if( window["ReactNativeWebView"])
        {
            const data = {from:"website", url:this.router.url}
            window["ReactNativeWebView"].postMessage(JSON.stringify(data));
        }

        let userData = this.localStorageService.get("user");
        let showLastLoginInfoPopup = this.configService.defaultOptions?.ShowLastLoginInfoPopup;
        if (userData != null)
        {
            if (userData.ResetPassword !== null && userData.ResetPassword) {
                this.showResetPassword();
            }
            if (showLastLoginInfoPopup === '1')
            {
                let popupShown = this.localStorageService.get("popupShown");
                if (!popupShown) {
                    this.showConfirm({
                        LastLogin: userData.LastLogin,
                        LastLoginIp: userData.LastLoginIp,
                        LastLogout: userData.LastLogout,
                        UserName: userData.UserName,
                        CurrencySymbol: userData.CurrencySymbol,
                        SportBets: userData.SportBets,
                        SportWins: userData.SportWins,
                        SportProfit: userData.SportProfit
                    }, userData.ResetPassword, userData.AcceptTermsConditions);
                }
            }

            if (userData['requireMobileVerification'])
            {
                this.mobileNumberVerified();
            }
        }

        let licenseCombinedUrl = this.configService.defaultOptions['LicenseUrl'];
        if (licenseCombinedUrl) {
            let splitUrl = licenseCombinedUrl.split(" ");
            let licenseUrl = splitUrl[0];
            let licenseField = splitUrl[1];
            loadExternalScript(licenseUrl).then(data =>
            {
                try
                {
                    window[licenseField]['init']();
                }
                catch (e) {
                }

            })
        }
        this.checkExternalAuthorizationData();
        //this.initialNavigation();
        this.logoutHelper.onLogoutConfirm$.subscribe(data => this.onLogoutConfirm(data));
        this.userLogined.onFirstLogin$.subscribe(data => this.onFirstLogin(data));
    }


    public getBottomMenuList() {
        this.baseControllerService.GetMenu(MenuType.MOBILE_BOTTOM_MENU, 'en').then((data: any) => {
            if (data) {
                this.mobileBottomSideBar = data.filter((subItems: any) => {
                    if (subItems['StyleType'] != '') {
                        let settingStyles = JSON.parse(subItems['StyleType']);
                        let paths = this.router.url.split('?')[0].slice(1).split('/');

                        if (typeof settingStyles['visibleForPages'] !== 'undefined')
                        {
                            if (settingStyles['visibleForPages'].find(x => paths.includes(x)))
                            {
                                return subItems;
                            }
                        }
                        if (typeof settingStyles['invisibleForPages'] !== 'undefined')
                        {
                            if (!settingStyles['invisibleForPages'].find(x => paths.includes(x))) {
                                return subItems;
                            }
                        }
                    }
                });
            }
            this.menuReady();
        });
    }

    protected menuReady()
    {

    }

    async mobileNumberVerified()
    {
        const {BaseMobileVerifiedComponent} = await import('../../modals/base-mobile-verified/base-mobile-verified.component');

        this.simpleModalService.addModal(BaseMobileVerifiedComponent,
            {title: 'Mobile_Verified_Info'}).subscribe((isConfirmed) => {
        });
    }

    private checkExternalAuthorizationData()
    {
        if (!this.userLogined.isAuthenticated)
        {
            let urlParams = getParsedUrl(window.location.href);
            let isAffiliateData = urlParams.hasOwnProperty("ReferenceCode") ||
                urlParams.hasOwnProperty("BonusCode") ||
                urlParams.hasOwnProperty("clickid") ||
                urlParams.hasOwnProperty("stag") ||
                urlParams.hasOwnProperty("btag") ||
                urlParams.hasOwnProperty("sourceid") ||
                urlParams.hasOwnProperty("AgentCode") ||
                urlParams.hasOwnProperty("AffiliatePlatformId");
            if(isAffiliateData)
            {
                this.localStorageService.add('AffiliateData', JSON.stringify(urlParams));
                urlParams.clickid = urlParams.clickid || urlParams.stag || urlParams.btag;
                if(urlParams.btag)
                {
                    urlParams.AffiliatePlatformId = Number(this.configService.defaultOptions.PartnerId) * 100 + 4;
                    urlParams.sourceid = urlParams.AffiliatePlatformId;
                }
                this.savedData.registerReferalData = urlParams;
                let url = new URL(window.location.href);
                let params:any = new URLSearchParams(url.search);
                params.delete('ReferenceCode');
                params.delete('BonusCode');
                params.delete('clickid');
                params.delete('stag');
                params.delete('btag');
                params.delete('sourceid');
                params.delete('AgentCode');
                params.delete('AffiliatePlatformId');
                url.search = params;
                history.pushState({}, null, url);
            }
            else
            {
                const affiliateData = this.localStorageService.get('AffiliateData');
                if(affiliateData)
                {
                    this.savedData.registerReferalData = affiliateData;
                }
            }

            if(urlParams.hasOwnProperty("ExternalPlatformId"))
            {
                urlParams.ClientIdentifier = urlParams.Code;
                this.userLogined.userLogin(urlParams);
            }
        }
    }

    protected openRegister()
    {

    }


   async showResetPassword()
    {
        const {BaseResetPasswordInfoComponent} = await import('../../modals/base-reset-password-info/base-reset-password-info.component');
        this.simpleModalService.addModal(BaseResetPasswordInfoComponent, {
            title: 'Reset_Password_Info'
        }, {closeOnClickOutside: false}).subscribe(() => {
        });
    }


    async showConfirm(loginData, resetPassword = false, checkTermsConditions = false) {
        const {BaseLoginInfoModalComponent} = await import('../../base-login-info-modal/base-login-info-modal.component');
        this.simpleModalService.addModal(BaseLoginInfoModalComponent, {
            title: 'Login_Info',
            loginData: loginData
        }).subscribe((isConfirmed) => {
            if (!!checkTermsConditions)
            {
                this.showTerms();
            }
        });
    }

    async showTerms()
    {
        const {BaseTermsConditionsAcceptComponent} = await import('../../modals/base-terms-conditions-accept/base-terms-conditions-accept.component');
        this.simpleModalService.addModal(BaseTermsConditionsAcceptComponent, {
            title: 'TermsConditions_Info'
        }).subscribe(() => {
        });
    }

    private initialNavigation()
    {
        const productUrl = localStorage.getItem('product-url');
        const returnedUrl = this.configService.defaultOptions.RedirectUrl;

        this.router.navigateByUrl(productUrl ? productUrl : returnedUrl);
        localStorage.removeItem('product-url');
    }

    async onLogoutConfirm(keyType)
    {
        const {BaseLogoutInfoComponent} = await import('../../modals/base-logout-info/base-logout-info.component');
        this.simpleModalService.addModal(BaseLogoutInfoComponent, {
            title: 'LogOut_Info',
            key: keyType,
        }).subscribe((isConfirmed) => {
            window.location.reload();
        });
    }

    async onFirstLogin(infoArray)
    {
        const {BaseFirstLoginTabComponent} = await import('../../modals/base-first-login-tab/base-first-login-tab.component');
        this.simpleModalService.addModal(BaseFirstLoginTabComponent, {
            className: 'first-login',
            info: infoArray
        }, {closeOnClickOutside: false}).subscribe((isConfirmed) => {
            window.location.reload();
        });
    }
}
