import {
    ViewChild,
    ViewContainerRef,
    Injector, Directive, OnDestroy,
} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {BaseComponent} from '../../base/base.component';
import {ConfigService, PaymentsService, SaveData} from '../../../../@core/services';
import {BonusesService} from "@core/services/api/bonuses.service";
import {BonusTypes} from "@core/enums";
import {LocalStorageService} from "../../../../@core/services";
import {PaymentControllerService} from "@core/services/app/paymentController.services";
import {UserLogined} from "@core/services/app/userLogined.service";
import {UtilityService} from "@core/services/app/utility.service";
import {StateService} from "@core/services/app/state.service";

@Directive()
export class BaseDepositComponent extends BaseComponent {
    public static backDepositId = null;

    public isShowDetails = false;
    public paymentControllerService: PaymentControllerService;
    public paymentsService: PaymentsService;
    public userLogined: UserLogined;
    public saveData: SaveData;
    public route: ActivatedRoute;
    public bonusesService: BonusesService;
    public localStorageService: LocalStorageService;
    public utilityService: UtilityService;
    public configService: ConfigService;
    public stateService:StateService;
    public router: Router;

    public paymentSystemList: Array<any> = [];
    public currentPayment: any;
    public userInfo: any;
    public pageTitle: any;
    public pageSubTitle: any;
    public CurrencySymbol: any;
    public CurrencyId: any;
    public paymentMessage: string;
    public paymentOpened = false;
    public isRadioButtonSelected = false;
    componentRef: any;

    public bonusData: Array<any> = [];

    public bonusTypes = BonusTypes;
    @ViewChild('loadComponent', {read: ViewContainerRef}) entry: ViewContainerRef;

    constructor(public injector: Injector) {
        super(injector);

        this.userLogined = injector.get(UserLogined);
        this.paymentControllerService = injector.get(PaymentControllerService);
        this.paymentsService = injector.get(PaymentsService);
        this.saveData = injector.get(SaveData);
        this.route = injector.get(ActivatedRoute);
        this.bonusesService = injector.get(BonusesService);
        this.localStorageService = injector.get(LocalStorageService);
        this.utilityService = injector.get(UtilityService);
        this.configService = injector.get(ConfigService);
        this.router = injector.get(Router);
        this.stateService = injector.get(StateService);
        // this.bonusesService.GetDepositBonusInfo();
    }

    ngOnInit() {
        super.ngOnInit();

        this.bonusesService.notifyGetDepositBonusInfo.subscribe((data) => {
            if (data && data.length > 0) {
                this.bonusData = data.filter((item: any) => !item.HasPromo);
            }
        });

        this.getPayments();

        this.userInfo = this.userLogined.getUserInfo();
        this.saveData.userPageInfo.subscribe((data) => {
            this.pageTitle = data['title'];
            this.pageSubTitle = data['subTitle'];
        });
    }




    public showPayments() {
        this.isShowDetails = !this.isShowDetails;
    }

    createComponent(Id: number, Type: number, ContentType: number, info?: number[], maxMinAmount?: any,  data?: any) {
        this.entry?.clear();
    }

    destroyComponent() {
        this.componentRef.destroy();
    }

    protected getPayments() {
        const userData = this.localStorageService.get('user');
        this.CurrencySymbol = userData ? userData.CurrencySymbol : '';
        this.CurrencyId = userData ? userData.CurrencyId : '';

        const currentDepositId = this.route.snapshot.params.id;
        console.log('currentDepositId', currentDepositId);
        const inputData = {
            PartnerId: this.configService.defaultOptions.PartnerId,
            ClientId: this.userLogined.isAuthenticated ? userData.Id : 0,
            LanguageId: localStorage.getItem('lang') || 'en'
        };

        this.paymentsService.getPaymentSystem(inputData).then((data) =>
        {
            if (data['ResponseCode'] === 0) {
                let depositItems = data['PartnerPaymentSystems'].filter(item => item.Type == '2');

                if (typeof currentDepositId !== 'undefined') {
                    let choseDeposit = depositItems.filter(item => item.PaymentSystemId == currentDepositId);
                    let openFromFooter = JSON.parse(sessionStorage.getItem('openWithFooter'));

                    if ((choseDeposit.length > 0) && openFromFooter) {
                        depositItems.map((paymentItem) => {
                            if (paymentItem.PaymentSystemId == currentDepositId) {
                                let index = depositItems.indexOf(paymentItem);
                                this.paymentSystemList = this.utilityService.array_move(depositItems, index, 0);
                            }
                        });
                        sessionStorage.setItem('openWithFooter', JSON.stringify(false));
                    } else if (choseDeposit.length > 0 && !openFromFooter) {
                        this.paymentSystemList = depositItems;
                        let selectedItem = depositItems.filter((subItem) => subItem['PaymentSystemId'] == choseDeposit[0]['PaymentSystemId']);
                        this.selectPayment(selectedItem[0],false);
                    } else {
                        this.paymentSystemList = depositItems;
                    }
                } else {
                    this.paymentSystemList = depositItems;
                    this.selectPayment(this.paymentSystemList[0], false);
                    if (this.configService.defaultOptions.AccountTemplateType == '1') {
                        this.paymentSystemList[0].Opened = true;
                    } else {
                        this.paymentSystemList[0].Opened = false;
                    }
                }
            }

            this.selectDepositFromBack();

        });
    }

    public selectPayment(paymentData, changeUrl = true, data?)
    {
        // if(this.currentPayment?.PaymentSystemId == paymentData.PaymentSystemId)
        //     return;

        BaseDepositComponent.backDepositId = paymentData.Id;
        paymentData.Opened = !paymentData.Opened;
        const maxMinAmount = {
            MaxAmount: paymentData.MaxAmount,
            MinAmount: paymentData.MinAmount
        };
        this.currentPayment = paymentData;
        this.createComponent(paymentData.PaymentSystemId, paymentData.PaymentSystemType, paymentData.ContentType, paymentData.Info, maxMinAmount, data);
        this.isShowDetails = !this.isShowDetails;
        this.bonusesService.GetDepositBonusInfo(paymentData.PaymentSystemId);

        if (changeUrl)
        {
            let depositUrl = '/user/' + (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) + '/deposit/' + paymentData.PaymentSystemId;
            this.router.navigate([depositUrl],{replaceUrl:true});
        }
    }

    public selectDepositFromBack()
    {
        if (this.stateService.getPaymentNavigationState !== "fromProfile") {
            return;
        }

        this.paymentSystemList.forEach(item =>
        {
            if (item.Id === BaseDepositComponent.backDepositId)
            {
                item.Opened = true;
            }
        });
        this.stateService.setPaymentNavigationState(null, true);
        BaseDepositComponent.backDepositId = null;
    }

    bonusCheckboxChanged() {
        console.log(this.paymentControllerService.bonusRefused);
        if (this.paymentControllerService.bonusRefused) {
            this.bonusData.forEach(item => {
                item.selected = false;
            });
        }
    }
    preventUncheck() {
        if (this.paymentControllerService.bonusRefused) {
            return false;
        }
    }

}
