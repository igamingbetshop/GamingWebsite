import {
    ViewChild,
    ViewContainerRef,
    Injector,
    Directive
} from '@angular/core';

import {BaseComponent} from '../../base/base.component';
import {ConfigService, PaymentsService} from '../../../../@core/services';
import {LocalStorageService} from "../../../../@core/services";
import {ActivatedRoute} from "@angular/router";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BetsService} from "@core/services/app/bets.services";
import {PaymentControllerService} from "@core/services/app/paymentController.services";
import {UserLogined} from "@core/services/app/userLogined.service";
import {format} from "date-fns";
import {UtilityService} from "@core/services/app/utility.service";

@Directive()
export class BaseWithdrawComponent extends BaseComponent {
    public isShowDetails = false;
    public paymentControllerService: PaymentControllerService;
    public paymentsService: PaymentsService;
    public userLogined: UserLogined;
    public localStorageService: LocalStorageService;
    public route: ActivatedRoute;
    public getPaymentsService: GetPaymentsService;
    public configService: ConfigService;
    public betsService: BetsService;
    public paymentHistoryItemsList: Array<any> = [];
    public paymentSystemList: Array<any> = [];
    public currentPayment: any;
    public userInfo: any;
    public paymentMessage: any;
    public currencySymbol: any;
    public currencyId: any;
    public activeWithdraws: Array<any> = [];
    public errorMessage:string = '';
    public allowCancelConfirmedWithdraw;

    private utilsService:UtilityService;

    protected openFirstItemByDefault = true;

    componentRef: any;
    @ViewChild('loadComponent', {read: ViewContainerRef}) entry: ViewContainerRef;

    constructor(public injector: Injector) {
        super(injector);

        this.userLogined = injector.get(UserLogined);
        this.paymentControllerService = injector.get(PaymentControllerService);
        this.paymentsService = injector.get(PaymentsService);
        this.localStorageService = injector.get(LocalStorageService);
        this.route = injector.get(ActivatedRoute);
        this.getPaymentsService = injector.get(GetPaymentsService);
        this.configService = injector.get(ConfigService);
        this.betsService = injector.get(BetsService);
        this.utilsService = injector.get(UtilityService);
        this.allowCancelConfirmedWithdraw = this.configService.defaultOptions.AllowCancelConfirmedWithdraw;
    }

    ngOnInit() {
        super.ngOnInit();
        const userData = this.localStorageService.get('user');
        this.currencySymbol = userData ? userData.CurrencySymbol : '';
        this.currencyId = userData ? userData.CurrencyId : '';

        this.userInfo = this.userLogined.getUserInfo();

        const data = {
            PartnerId: this.configService.defaultOptions.PartnerId,
            ClientId: this.userLogined.isAuthenticated ? userData.Id : 0,
            LanguageId: localStorage.getItem('lang') || 'en'
        };

        this.paymentsService.getPaymentSystem(data).then((data: any) => {
            if (data['ResponseCode'] === 0)
            {
                this.paymentSystemList = data['PartnerPaymentSystems'].filter(item => item.Type == '1');
                if(this.openFirstItemByDefault)
                    this.selectPayment(data['PartnerPaymentSystems'].filter(item => item.Type == '1')[0]);
            }
            this.getPaymentData();
        });

        this.getPaymentsService.notifyGetCancelPaymentMessage$.subscribe((data) => {
            this.getPaymentData();
            this.paymentControllerService.getUserAccountData();
            this.utilsService.showMessageWithDelay(this, [{'errorMessage': data}]);
        });

        this.getPaymentsService.notifyGetCancelPaymentErrorMessage$.subscribe((data) => {
            this.utilsService.showMessageWithDelay(this, [{'errorMessage': data}]);
        });

        this.paymentControllerService.notifyGetCreatePaymentData.subscribe((data) => {
            this.getPaymentData();
        });
    }

    getPaymentData() {
        let d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        let yearAgo = format(d,'yyyy-MM-dd HH:mm');

        let cDate = new Date();
        cDate.setDate(new Date().getDate() + 1);
        let currentDate = format(cDate,'yyyy-MM-dd HH:mm');
        const input = {
            createdFrom: yearAgo,
            createdBefore: currentDate,
            status: [1, 3, 4, 5, 7],
            type: 1,
            page: 0,
            takeCount: 10
        };

        this.getPaymentsService.getPaymentHistoryListByPromiss(input).then((responseData: any) => {
            if (responseData['ResponseCode'] === 0) {
                this.activeWithdraws = responseData.ResponseObject['PaymentRequests'];

                return this.activeWithdraws.map((item) => {
                    item.PaymentSystemName = this.paymentSystemList.find(p => p.PaymentSystemId == item.PaymentSystemId)?.PaymentSystemName;
                });
            }
        });
    }

    public canselPayment(paymentId) {
        this.getPaymentsService.cancelPayment(paymentId);
    }

    public selectPayment(paymentData)
    {
        if(this.currentPayment?.PaymentSystemId == paymentData.PaymentSystemId)
            return;
        if (paymentData.opened === true) {
            paymentData.opened = false;
        }
        paymentData.opened = !paymentData.opened;
        const maxMinAmount = {
            MaxAmount : paymentData.MaxAmount,
            MinAmount : paymentData.MinAmount
        };

        this.createComponent(paymentData.PaymentSystemId, paymentData.PaymentSystemType, paymentData.Info, maxMinAmount, paymentData.CommissionPercent);
        this.currentPayment = paymentData;
        this.isShowDetails = !this.isShowDetails;
    }

    public showPayments() {
        this.isShowDetails = !this.isShowDetails;
    }

    createComponent(Id: number, Type: number, info?: number[], maxMinAmount?: any,  CommissionPercent: number = 0) {
        if(this.entry)
            this.entry.clear();
    }

    destroyComponent() {
        this.componentRef.destroy();
    }

}
