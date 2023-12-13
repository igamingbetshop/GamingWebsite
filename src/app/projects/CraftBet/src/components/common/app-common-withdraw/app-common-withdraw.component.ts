import {OnInit, Injector, Injectable} from '@angular/core';
import {
    PaymentsService,
    ConfigService,
    LocalStorageService
} from '../../../../../../@core/services';
import {PaymentControllerService} from "@core/services/app/paymentController.services";

@Injectable()
export class AppCommonWithdrawComponent implements OnInit {

    public paymentControllerService: PaymentControllerService;
    public paymentsService: PaymentsService;
    public configService: ConfigService;
    public localStorageService: LocalStorageService;
    public selectPayment: any;


    public paymentSystems: Array<any> = [];
    public amount: number;
    public bankInfo: any = {"CardNumber": ""};
    public errorMessage: string;
    public responseMessage: string;
    public showForm: boolean = false;
    public defaultOption: any;
    public betShopList: Array<any> = [];
    public betShop: any = {Address: ''};
    public showBetShop: boolean = false;
    public paymentMessage;
    public selectedBetShop: any;
    public userData: any;

    constructor(public injector: Injector) {
        this.paymentControllerService = injector.get(PaymentControllerService);
        this.paymentsService = injector.get(PaymentsService);
        this.configService = injector.get(ConfigService);
        this.localStorageService = injector.get(LocalStorageService);
        this.userData = this.localStorageService.get("user");

    }

    ngOnInit() {
        this.defaultOption = this.configService.defaultOptions;
        this.paymentControllerService.getPaymentItems('1').then((responceData) => {
            this.paymentSystems = responceData;
            this.selectPaymentSystem(this.paymentSystems[0]);
        });
    }


    public selectPaymentSystem(paymentData) {
        this.selectPayment = paymentData;
        this.showForm = true;
        this.paymentMessage = 'Withdraw.' + 'PAYMENT_MESSAGE' + paymentData.PaymentSystemId;

        if (paymentData.PaymentSystemId == 1) {
            this.showBetShop = true;
            let data = {'PartnerId': this.defaultOption.PartnerId, 'Token': this.userData.Token};
            this.paymentsService.GetPartnerBetShops(data).then((responceData) => {
                this.betShopList = responceData.BetShops;
            });
        } else {
            this.showBetShop = false;
        }
    }

    selectBetshopItem(item) {
        this.selectedBetShop = item;
    }

    public confirm() {
        const currentPaymentSystem = this.selectPayment;
        let amount = this.amount;
        if (currentPaymentSystem.PaymentSystemId === 1) {
            currentPaymentSystem.betShopId = this.selectedBetShop['Id'];
        }
        let bankInfo = this.bankInfo;
        this.paymentControllerService.confirm(currentPaymentSystem, amount, bankInfo, '', 'withdraw', '').then((responceData) => {
            if (responceData['ResponseCode'] === 0) {
                this.responseMessage = 'Success';
            } else {
                this.errorMessage = responceData['Description'];
            }

            setTimeout(() => {
                this.errorMessage = '';
                this.responseMessage = "";
            }, 3000);

            this.amount = 0;
            this.bankInfo = {"CardNumber": ""};
        });

    }

}
