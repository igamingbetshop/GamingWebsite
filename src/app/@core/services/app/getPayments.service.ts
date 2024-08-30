import {Injectable, Injector} from '@angular/core';
import {Controllers, Methods, RegionTypes} from "@core/enums";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateService} from "@ngx-translate/core";
import {Subject} from "rxjs";
import {BankAccount} from "@core/models";
import {UserLogined} from "@core/services/app/userLogined.service";
import {ConfigService, DefaultService, LocalStorageService, PaymentsService} from "@core/services";
import {BaseApiService} from "@core/services/api/base-api.service";

@Injectable({providedIn:"root"})

export class GetPaymentsService {

    public defaultOption: any;
    public paymentParams = {};
    public isLogin: boolean;
    public userData: any;
    public paymentHistoryItemsList: Array<any> = [];
    public betShopList: Array<any> = [];
    public paymentTypesList: Array<any> = [];
    public paymentStatusesList: Array<any> = [];
    public banksList: Array<any> = [];
    public clientBanksList: Array<any> = [];
    public accountTypes: Array<any> = [];
    public paymentAccountTypes: Array<any> = [];
    public bankAccounts: Array<BankAccount> = [];
    public paymentHistoryItemsCount: Number;


    public configService: ConfigService;
    public userLogined: UserLogined;
    public localStorageService: LocalStorageService;
    public paymentsService: PaymentsService;
    public defaultService: DefaultService;
    private http: HttpClient;
    private baseApiService: BaseApiService;
    private translate: TranslateService;


    public _notifyGetPaymentHistoryList = new Subject<any>();
    public notifyGetPaymentHistoryList$ = this._notifyGetPaymentHistoryList.asObservable();

    public _notifyGetPaymentTypesList = new Subject<any>();
    public notifyGetPaymentTypesList$ = this._notifyGetPaymentTypesList.asObservable();

    public _notifyGetPaymentStatusesList = new Subject<any>();
    public notifyGetPaymentStatusesList$ = this._notifyGetPaymentStatusesList.asObservable();

    public _notifyGetPaymentHistoryItemsCount = new Subject<any>();
    public notifyGetPaymentHistoryItemsCount$ = this._notifyGetPaymentHistoryItemsCount.asObservable();

    private _notifyGetCancelPaymentMessage = new Subject<any>();
    public notifyGetCancelPaymentMessage$ = this._notifyGetCancelPaymentMessage.asObservable();

    public _notifyGetBanksList = new Subject<any>();
    public notifyGetBanksList$ = this._notifyGetBanksList.asObservable();

    public _notifyGetClientBanksList = new Subject<any>();
    public notifyGetClientBanksList$ = this._notifyGetClientBanksList.asObservable();

    public _notifyGetBankAccountTypes = new Subject<any>();
    public notifyGetBankAccountTypes$ = this._notifyGetBankAccountTypes.asObservable();

    public _notifyGetPaymentAccountTypes = new Subject<any>();
    public notifyGetPaymentAccountTypes$ = this._notifyGetPaymentAccountTypes.asObservable();

    public _notifyGetBankAccounts = new Subject<any>();
    public notifyGetBankAccounts$ = this._notifyGetBankAccounts.asObservable();

    public _notifyGetClientPaymentMethods = new Subject<any>();
    public notifyGetClientPaymentMethods$ = this._notifyGetClientPaymentMethods.asObservable();

    public _notifyGetBanksListErrorMessage = new Subject<any>();
    public notifyGetBanksListErrorMessage$ = this._notifyGetBanksListErrorMessage.asObservable();

    public _notifySendAccountDetailsVerificationCode = new Subject<any>();
    public notifySendAccountDetailsVerificationCode$ = this._notifySendAccountDetailsVerificationCode.asObservable();

    public _notifyAddBankAccount = new Subject<any>();
    public notifyAddBankAccount$ = this._notifyAddBankAccount.asObservable();

    public _notifyRemoveBankAccount = new Subject<any>();
    public notifyRemoveBankAccount$ = this._notifyRemoveBankAccount.asObservable();

    public _notifyGetCancelPaymentErrorMessage = new Subject<any>();
    public notifyGetCancelPaymentErrorMessage$ = this._notifyGetCancelPaymentErrorMessage.asObservable();

    public _notifyGetBetShopList = new Subject<any>();
    public notifyGetBetShopList$ = this._notifyGetBetShopList.asObservable();


    constructor(public injector: Injector) {
        this.configService = injector.get(ConfigService);
        this.userLogined = injector.get(UserLogined);
        this.localStorageService = injector.get(LocalStorageService);
        this.paymentsService = injector.get(PaymentsService);
        this.defaultService = injector.get(DefaultService);
        this.http = injector.get(HttpClient);
        this.baseApiService = injector.get(BaseApiService);
        this.translate = injector.get(TranslateService);

        this.isLogin = this.userLogined.isAuthenticated;
        this.userData = this.localStorageService.get('user');
        this.defaultOption = this.configService.defaultOptions;
    }

    getBanks(paymentSystemId)
    {
        this.baseApiService.apiRequest(paymentSystemId, Controllers.DOCUMENT, Methods.GET_PAYMENT_BANKS).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.banksList = data['ResponseObject'];
                this._notifyGetBanksList.next(data['ResponseObject']);
            } else {
                this._notifyGetBanksListErrorMessage.next(data['Description']);
            }
        });
    }

    getClientBanks(paymentSystemId?)
    {
        this.baseApiService.apiRequest(paymentSystemId, Controllers.CLIENT, Methods.GET_PARTNER_CUSTOMER_BANKS).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.clientBanksList = data['ResponseObject'];
                this._notifyGetClientBanksList.next(data['ResponseObject']);
            }
        });
    }

    getBankAccountTypes() {
        this.baseApiService.apiRequest(this.userData.Id, Controllers.DOCUMENT, Methods.GET_BANKS_ACCOUNT_TYPES).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.accountTypes = data['ResponseObject'];
                this._notifyGetBankAccountTypes.next(data['ResponseObject']);
            }
        });
    }

    getPaymentAccountTypes(paymentSystemId: any) {
        this.baseApiService.apiRequest(paymentSystemId, Controllers.DOCUMENT, Methods.GET_PAYMENT_ACCOUNT_TYPES).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.paymentAccountTypes = data['ResponseObject'];
                this._notifyGetPaymentAccountTypes.next(data['ResponseObject']);
            }
        });
    }

    getBankAccounts() {
        this.baseApiService.apiRequest(null, Controllers.CLIENT, Methods.GET_CLIENT_BANK_ACCOUNTS).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.bankAccounts = data['ResponseObject'].map((item) => {
                    item.BankAccountTypeName = this.accountTypes.find(p => p.Value == item.BankAccountType)?.Name;
                    return item;
                });
                this._notifyGetBankAccounts.next(data['ResponseObject']);
            } else
            {
                //this._notifyGetBanksListErrorMessage.next(data['Description']);
            }
        });
    }


    getClientPaymentMethods(paymentSystemId) {
        this.baseApiService.apiRequest(paymentSystemId, Controllers.CLIENT, Methods.GET_CLIENT_PAYMENT_METHODS).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this._notifyGetClientPaymentMethods.next(data['ResponseObject']);
            }
        });
    }

    sendAccountDetailsVerificationCode() {
        this.baseApiService.apiRequest(this.userData.Id, Controllers.CLIENT, Methods.SEND_ACCOUNT_DETAILS_VERIFICATION_CODE).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this._notifySendAccountDetailsVerificationCode.next(true);
            } else {
                this._notifySendAccountDetailsVerificationCode.next(data['Description']);
            }
        });
    }

    addBankAccount(data) {
        this.baseApiService.apiRequest(data, Controllers.CLIENT, Methods.ADD_BANK_ACCOUNT).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.getBankAccounts();
                this._notifyAddBankAccount.next(true);
            } else {
                this._notifyAddBankAccount.next(data['Description']);
            }
        });
    }

    removeBankAccount(data)
    {
        this.baseApiService.apiRequest(data, Controllers.CLIENT, Methods.REMOVE_PAYMENT_ACCOUNT).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this._notifyRemoveBankAccount.next(true);
            } else {
                this._notifyRemoveBankAccount.next(data['Description']);
            }
        });
    }


    getPaymentHistoryListByPromiss(data) {
        const filter = {
            'ClientId': this.userData.Id,
            'CurrencyId': this.userData.CurrencyId,
            'TimeZone': this.configService.timeZone,
            'CreatedFrom': data.createdFrom,
            'CreatedBefore': data.createdBefore,
            'SkipCount': data['page'],
            'TakeCount': data.takeCount,
            'Statuses': data['status'],
            'Type': data['type']
        };

        return this.baseApiService.apiRequest(filter, Controllers.DOCUMENT, Methods.GET_PAYMENT_REQUESTS).toPromise();
    }


    getPaymentHistoryList(data) {
        const filter = {
            'ClientId': this.userData.Id,
            'CurrencyId': this.userData.CurrencyId,
            'TimeZone': this.configService.timeZone,
            'CreatedFrom': data.createdFrom,
            'CreatedBefore': data.createdBefore,
            'SkipCount': data['page'],
            'TakeCount': data.takeCount,
            'Statuses': data['status'],
            'Type': data['type']
        };

        const data1 = {
            ClientId: this.userLogined.isAuthenticated ? this.userData.Id : 0,
            LanguageId: localStorage.getItem('lang') || 'en'
        };


        this.baseApiService.apiRequest(filter, Controllers.DOCUMENT, Methods.GET_PAYMENT_REQUESTS).subscribe((data) => {
            if (data.ResponseCode === 0) {
                this.getPartnerBetShops();
                let payments = data.ResponseObject.PaymentRequests;
                this._notifyGetBetShopList.subscribe((betshopData) => {
                    for (let i = 0; i < payments.length; i++) {
                        if (payments[i].BetShopId == betshopData?.Id) {
                            payments[i].BetshopName = betshopData ? betshopData.Name : '';
                        }
                    }
                });

                this.paymentHistoryItemsList = payments;
                this.paymentsService.getPaymentSystem(data1).then((data2: any) => {
                    if (data2['ResponseCode'] === 0)
                    {
                        const partnerPaymentSystems = data2.PartnerPaymentSystems;
                        this.paymentHistoryItemsList.map((item) => {
                            this.paymentTypesList.find((subItem): any => {
                                if (subItem['Value'] === item['Type']) {
                                    item.StatusTypeName = subItem.Name;
                                }
                            });
                            item.PaymentSystemName = partnerPaymentSystems.find(p => p.PaymentSystemId == item.PaymentSystemId)?.PaymentSystemName;
                        });
                    }
                });

                this.paymentHistoryItemsCount = data.ResponseObject['Count'];
                this._notifyGetPaymentHistoryList.next({type: 'Success', data: data.ResponseObject['PaymentRequests']});
                this._notifyGetPaymentHistoryItemsCount.next(data.ResponseObject['Count']);
            } else {
                this._notifyGetPaymentHistoryList.next({type: 'Error', data: data['Description']});
            }
        });
    }

    cancelPayment(paymentId) {
        const filter = {'ClientId': this.userData.Id, 'RequestId': paymentId, 'Comment': ''};
        this.baseApiService.apiRequest(filter, Controllers.DOCUMENT, Methods.CANCEL_PAYMENT).subscribe((data) => {
            if (data["ResponseCode"] == 0) {
                this._notifyGetCancelPaymentMessage.next(data['ResponseObject']);

            } else {
                this._notifyGetCancelPaymentErrorMessage.next(data['Description']);
            }
        });
    }

    getPaymentsStatusesList() {
        const input = {};
        this.baseApiService.apiRequest(input, Controllers.DOCUMENT, Methods.GET_PAYMENT_REQUEST_STATES).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                this.paymentStatusesList = data['ResponseObject'];
                this._notifyGetPaymentStatusesList.next(data['ResponseObject']);
            }
        });
    }

    getPaymentsTypesList() {
        const input = {};
        this.baseApiService.apiRequest(input, Controllers.DOCUMENT, Methods.GET_PAYMENT_REQUEST_TYPES).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                const responseData = data['ResponseObject'];
                responseData.unshift({'Id': 0, 'Value': null, 'Name': this.translate.instant("Info.All")});
                this.paymentTypesList = responseData;
                this._notifyGetPaymentTypesList.next(data['ResponseObject']);
            }
        });
    }


    getPartnerBetShops() {
        const {
            WebApiUrl,
            PartnerId
        } = this.configService.defaultOptions;

        this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/${Methods.GET_PARTNER_BET_SHOPS}`, {PartnerId}, {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
        }).subscribe((data) => {
            if (data['ResponseCode'] === 0) {
                this.betShopList = data['BetShops'];
                this._notifyGetBetShopList.next(data['BetShops']);
            }
        });
    }

}
