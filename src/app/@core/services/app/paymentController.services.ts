import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {LocalStorageService} from './localStorage.service';
import {PaymentsService} from '../api/payments.service';
import {DefaultService} from '../api/default.service';
import {Request} from "@core/models";
import {Controllers, Methods, RegionTypes, VerificationCodeTypes} from "@core/enums";
import {HttpClient} from '@angular/common/http';
import {BonusesService} from "@core/services/api/bonuses.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {Subject, tap} from "rxjs";
import {BaseApiService} from "@core/services/api/base-api.service";

@Injectable()
export class PaymentControllerService {
    public defaultOption: any;
    public paymentParams = {};
    public isLogin: boolean;
    public userData: any;

    public savePaymentDetails:boolean = false;
    public bonusRefused:boolean = false;

    public notifyGetPaymentStatesList: Subject<any> = new Subject<any>();
    public notifyGetPaymentsList: Subject<any> = new Subject<any>();
    public notifyGetPaymentsCount: Subject<any> = new Subject<any>();
    public notifyGetPaymentRequestError: Subject<any> = new Subject<any>();
    public notifyGetPaymentList: Subject<any> = new Subject<any>();
    public notifyGetCreatePaymentData: Subject<any> = new Subject<any>();
    public notifyGetCreatePaymentError: Subject<any> = new Subject<any>();
    public notifyGetPaymentBanksList: Subject<any> = new Subject<any>();
    public notifyGetPaymentBanksError: Subject<any> = new Subject<any>();
    public notifyGetSmsCode: Subject<any> = new Subject<any>();
    public notifyGetSmsCodeError: Subject<any> = new Subject<any>();
    public notifyGetPartnerBetShops: Subject<any> = new Subject<any>();
    public notifyGetPartnerBetShopsError: Subject<any> = new Subject<any>();
    public notifyGetClientAccountList: Subject<any> = new Subject<any>();
    public notifyGetUserAccountData: Subject<any> = new Subject<any>();
    public notifyGetRegionsList: Subject<any> = new Subject<any>();
    public notifyGetRegionsError: Subject<any> = new Subject<any>();
    public notifyGetCancelPaymentMessage: Subject<any> = new Subject<any>();
    public notifyGetCancelPaymentErrorMessage: Subject<any> = new Subject<any>();

    constructor(public configService: ConfigService,
                public userLogined: UserLogined,
                public localStorageService: LocalStorageService,
                public paymentsService: PaymentsService,
                public defaultService: DefaultService,
                private bonusesService: BonusesService,
                private http: HttpClient,
                private baseApiService:BaseApiService) {
        this.isLogin = userLogined.isAuthenticated;
        this.userData = localStorageService.get('user');
        this.defaultOption = this.configService.defaultOptions;

    }

    public async getPaymentItems(typeId) {

        const data = {
            PartnerId: this.defaultOption.PartnerId,
            ClientId: this.isLogin ? this.userData.Id : 0,
            LanguageId: localStorage.getItem('lang') || 'en'
        };

        const payements = await this.paymentsService.getPaymentSystem(data);
        const depositItems = [];

        payements['PartnerPaymentSystems'].filter((item) => {
            if (item.Type == typeId) {
                depositItems.push(item);
            }
        });

        return depositItems;

    }


    /*
    *** New functional with payment System Items
    */


    public getPaymentAllItem(typeId) {
        const data = {
            PartnerId: this.defaultOption.PartnerId,
            ClientId: this.isLogin ? this.userData.Id : 0,
            LanguageId: localStorage.getItem('lang') || 'en'
        };

        this.paymentsService.getPaymentSystem(data).then((data) => {
            if (data['ResponseCode'] === 0) {
                const depositItems = [];
                data['PartnerPaymentSystems'].filter((item) => {
                    if (item.Type == typeId) {
                        depositItems.push(item);
                    }
                });
                this.notifyGetPaymentList.next(depositItems);
                return depositItems;
            }
        });
    }


    public resetPaymentParams(emptyObj) {
        /* if we won't make paymentParams an empty object,
           then on the next confirm it sends unnecessary empty fields*/
        if (!emptyObj) {
            this.paymentParams = {
                Amount: '',
                BankId: '',
                // cash
                WithdrawCode: '',

                // cards
                CardType: 1,
                Name: '',
                CardNumber: '',
                ExpDate: '',
                ExpDateMM: '',
                ExpDateYY: '',

                // qiwi
                Info: ''
            };
        } else {
            this.paymentParams = {}
        }

    }


    public getUserAccount(currencyId?) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.GET_CLIENT_ACCOUNTS;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify({'ClientId': this.userData.Id, 'CurrencyId': currencyId});

        this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data['ResponseCode'] === 0) {
                this.notifyGetClientAccountList.next(data.ResponseObject['Accounts']);
            }
        });
    }

    /* Remove getUserAccountData function, and get data from GetUserAccounts function in to Resolver(from Routing Module) */

    public getUserAccountData() {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.GET_CLIENT_ACCOUNTS;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify({'ClientId': this.userData.Id});

        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe((data) => {
            if (data['ResponseCode'] === 0) {
                if (data.ResponseObject['Accounts'] && data.ResponseObject['Accounts'].length > 0) {
                    this.notifyGetUserAccountData.next(data.ResponseObject['Accounts']);
                }
            }
        })
    }


    /* Remove */

    public async GetUserAccounts() {
        const filter = {
            'Token': this.userData.Token,
            'ClientId': this.userData.Id,
            'PartnerId': this.defaultOption.PartnerId,
            'Controller': 'Client',
            'Method': 'GetClientAccounts',
            'RequestData': JSON.stringify({
                'ClientId': this.userData.Id
            })
        };

        return await this.paymentsService.defaultRequest(filter);
    }


    /*
    ** Remove
    */

    public async getBankList(id) {
        let postData = {
            'Token': this.userData.Token,
            'ClientId': this.userData.Id,
            'PartnerId': this.defaultOption.PartnerId,
            'Controller': 'Document',
            'Method': 'GetPaymentBanks',
            'RequestData': id
        };

        let data = await this.defaultService.defaultRequest(postData);
        return data['ResponseObject'];
    }

    public createPayment(data)
    {
        if (data.paymentType === 'withdraw')
        {
            this.paymentParams['Amount'] = data['Amount'] ? data['Amount'] : '';
            this.paymentParams['BankId'] = data['BankId'] ? data['BankId'] : '';
            this.paymentParams['BankCode'] = data['BankCode'] ? data['BankCode'] : '';
            this.paymentParams['BankName'] = data['BankName'] ? data['BankName'] : '';
            this.paymentParams['BankCode'] = data['BankCode'] ? data['BankCode'] : '';
            this.paymentParams['AccountNumber'] = data['AccountNumber'] ? data['AccountNumber'] : '';
            this.paymentParams['DocumentId'] = data['DocumentId'] ? data['DocumentId'] : '';
            this.paymentParams['BankAccountNumber'] = data['BankAccountNumber'] ? data['BankAccountNumber'] : '';
            this.paymentParams['BeneficiaryName'] = data['BeneficiaryName'] ? data['BeneficiaryName'] : '';
            this.paymentParams['AccountType'] = data['AccountType'] ? data['AccountType'] : '';
            this.paymentParams['NameSurname'] = data['NameSurname'] ? data['NameSurname'] : '';
            this.paymentParams['WithdrawCode'] = data['WithdrawCode'] ? data['WithdrawCode'] : '';
            this.paymentParams['CardType'] = data['CardType'] ? data['CardType'] : '';
            this.paymentParams['Name'] = data['Name'] ? data['Name'] : '';
            this.paymentParams['CardNumber'] = data['CardNumber'] ? data['CardNumber'] : '';
            this.paymentParams['ExpDate'] = data['ExpDate'] ? data['ExpDate'] : '';
            this.paymentParams['ExpDateMM'] = data['ExpDateMM'] ? data['ExpDateMM'] : '';
            this.paymentParams['ExpDateYY'] = data['ExpDateYY'] ? data['ExpDateYY'] : '';
            this.paymentParams['Info'] = data['Info'] ? data['Info'] : '';
            this.paymentParams['MobileNumber'] = data['MobileNumber'] ? data['MobileNumber'] : '';
            this.paymentParams['SMSCode'] = data['SMSCode'] ? data['SMSCode'] : '';
            this.paymentParams['CardHolderName'] = data['CardHolderName'] ? data['CardHolderName'] : '';
            this.paymentParams['ExpirationDate'] = data['ExpirationDate'] ? data['ExpirationDate'] : '';
            this.paymentParams['WalletNumber'] = data['WalletNumber'] ? data['WalletNumber'] : '';
            this.paymentParams['Email'] = data['Email'] ? data['Email'] : '';
            this.paymentParams['BankACH'] = data['BankACH'] ? data['BankACH'] : '';
            this.paymentParams['BankAccountHolder'] = data['BankAccountHolder'] ? data['BankAccountHolder'] : '';
            this.paymentParams['BankBranchName'] = data['BankBranchName'] ? data['BankBranchName'] : '';
            this.paymentParams['BankIBAN'] = data['BankIBAN'] ? data['BankIBAN'] : '';
            this.paymentParams['NationalId'] = data['NationalId'] ? data['NationalId'] : '';
            this.paymentParams['TypeDocumentId'] = data['TypeDocumentId'] ? data['TypeDocumentId'] : '';
            this.paymentParams['SwiftCode'] = data['SwiftCode'] ? data['SwiftCode'] : '';
            this.paymentParams['CountryId'] = data['BankCountry'] ? data['BankCountry'] : '';
            this.paymentParams['City'] = data['BankCity'] ? data['BankCity'] : '';
            this.paymentParams['BillingAddress'] = data['BankAddress'] ? data['BankAddress'] : '';
        } else {
            this.paymentParams['CardNumber'] = data['CardNumber'] ? data['CardNumber'] : '';
            this.paymentParams['BankId'] = data['BankId'] ? data['BankId'] : '';
            this.paymentParams['AccountType'] = data['AccountType'] ? data['AccountType'] : '';
            this.paymentParams['NameSurname'] = data['NameSurname'] ? data['NameSurname'] : '';
            this.paymentParams['Amount'] = data['Amount'] ? data['Amount'] : '';
            this.paymentParams['WalletNumber'] = data['WalletNumber'] ? data['WalletNumber'] : '';
            this.paymentParams['BankName'] = data['BankName'] ? data['BankName'] : '';
            this.paymentParams['ToBankNumber'] = data['ToBankNumber'] ? data['ToBankNumber'] : '';
            this.paymentParams['BankAccountNumber'] = data['BankAccountNumber'] ? data['BankAccountNumber'] : '';
            this.paymentParams['ClientName'] = data['ClientName'] ? data['ClientName'] : '';
            this.paymentParams['NationalId'] = data['NationalId'] ? data['NationalId'] : '';
            this.paymentParams['TypeDocumentId'] = data['TypeDocumentId'] ? data['TypeDocumentId'] : '';
            this.paymentParams['VoucherNumber'] = data['VoucherNumber'] ? data['VoucherNumber'] : '';
            this.paymentParams['ActivationCode'] = data['ActivationCode'] ? data['ActivationCode'] : '';
            this.paymentParams['SMSCode'] = data['SMSCode'] ? data['SMSCode'] : '';
            this.paymentParams['MobileNumber'] = data['MobileNumber'] ? data['MobileNumber'] : '';
            this.paymentParams['PromoCode'] = data['PromoCode'] ? data['PromoCode'] : '';
            this.paymentParams['OperatorCardNumber'] = data['OperatorCardNumber'] ? data['OperatorCardNumber'] : '';
            this.paymentParams['Info'] = data['Info'] ? data['Info'] : '';
            this.paymentParams['TransactionId'] = data['TransactionId'] ? data['TransactionId'] : '';
            this.paymentParams['ExpirationDate'] = data['ExpirationDate'] || '';
        }
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = data.paymentType === 'withdraw' ? Methods.Get_Create_Payment_Request : Methods.Get_Create_Deposit_Request;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;

        let requestInfo = {
            PartnerId: this.defaultOption.PartnerId,
            Amount: data.Amount,
            Info: JSON.stringify(this.paymentParams),
            PaymentSystemId: data.PaymentSystemId,
            BonusRefused:this.bonusRefused,
            PaymentForm: data['PaymentForm'] ? data['PaymentForm'] : '',
            VerificationCode: data['VerificationCode'] ? data['VerificationCode'] : '',
            ImageName: data['ImageName'] ? data['ImageName'] : '',
            ClientId: this.userData.Id,
            CurrencyId: this.userData.CurrencyId,
            CashCode: data['CashCode'] ? data['CashCode'] : '',
            BetShopId: data['BetShopId'] ? data['BetShopId'] : ''
        };

        if (data.paymentType == 'deposit')
        {
            requestInfo['BonusId'] = data['BonusId'] ? data['BonusId'] : '';
        }
        else requestInfo['SavePaymentDetails'] = this.savePaymentDetails;

        request.RequestData = JSON.stringify(requestInfo);

        this.resetPaymentParams(true);
        this.GetUserAccounts();
        this.paymentsService.defaultRequest(request).then((responseData) => {
            if (responseData['ResponseCode'] === 0)
            {
                if (data.paymentType === 'deposit') {
                    this.bonusesService.GetDepositBonusInfo(data.PaymentSystemId);
                }
                this.notifyGetCreatePaymentData.next(responseData['ResponseObject']);
            } else {
                this.notifyGetCreatePaymentError.next(responseData);
            }

        });

    }

    public getPartnerBetShopList() {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.PartnerId = PartnerId;
        request.Token = this.userData.Token ? this.userData.Token : '';
        request.ClientId = this.userData.Id;

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/GetPartnerBetShops`, request).subscribe(responseData => {
            if (responseData['ResponseCode'] === 0) {
                this.notifyGetPartnerBetShops.next(responseData['BetShops']);
            } else {
                this.notifyGetPartnerBetShopsError.next(responseData['Description']);
            }
        });
    }

    public getRegionsList() {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.PartnerId = PartnerId;
        request.LanguageId = this.defaultOption.Language;
        request.TypeId = RegionTypes.City;

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/GetRegions`, request).subscribe((responseData) => {
            if (responseData['ResponseCode'] === 0) {
                this.notifyGetRegionsList.next(responseData['ResponseObject']);
            } else {
                this.notifyGetRegionsError.next(responseData['Description']);
            }
        });
    }


    public async confirm(paymentData, amount, info, bankId, paymentType, bankName, bonusTypeId?: number, promoCode?: string) {
        if (paymentType === 'withdraw') {
            switch (paymentData.PaymentSystemId) {
                case 2:
                case 32:
                    this.paymentParams['CardNumber'] = info['CardNumber'];
                    this.paymentParams['Amount'] = amount;
                    this.paymentParams['CardHolderName'] = info['CardHolderName'];
                    this.paymentParams['ExpirationDate'] = info['ExpirationDate'];
                    break;
                case 22:
                case 23:
                case 24:
                case 11:
                    this.paymentParams['ToBankName'] = info['bankAccountName'];
                    this.paymentParams['ToBankNumber'] = info['bankAccountNumber'];
                    this.paymentParams['BankId'] = bankId;
                    this.paymentParams['Amount'] = amount;
                    this.paymentParams['CardNumber'] = info['CardNumber'];
                    break;
                case 25:
                case 26:
                case 38:
                case 37:
                    this.paymentParams['ToBankName'] = info['bankAccountName'];
                    this.paymentParams['CardNumber'] = info['bankAccountNumber'];
                    this.paymentParams['CardHolderName'] = info['cardHolderName'];
                    this.paymentParams['CardNumber'] = info['CardNumber'];
                    //this.paymentParams['BankId'] = bankId;
                    break;

                case 33:
                case 27:
                case 28:
                case 29:
                case 30:
                case 31:
                    this.paymentParams['CardNumber'] = info['CardNumber'];
                    break;
                case 40:
                    this.paymentParams['NationalId'] = info['CardNumber'];
                    break;
                case 42:
                    this.paymentParams['BeneficiaryID'] = info['BeneficiaryID'];
                    this.paymentParams['ToBankNumber'] = info['ToBankNumber'];
                    this.paymentParams['BankId'] = info['BankId'];
                    this.paymentParams['NationalId'] = info['NationalId'];
                    break;
                // case 11:
                //   this.paymentParams['NickName'] = bankId;
                //   break;
            }
        } else {
            this.paymentParams['CardNumber'] = info['CardNumber'];
            this.paymentParams['BankId'] = bankId;
            this.paymentParams['Amount'] = amount;
            this.paymentParams['BankName'] = bankName.bankAccountName;
            this.paymentParams['ToBankNumber'] = bankName.bankAccountNumber;
            this.paymentParams['ClientName'] = bankName.clientName;
            this.paymentParams['NationalId'] = info['NationalId'];
        }

        let postData = {};

        switch (paymentData.PaymentSystemName) {
            case 'Cash':
                postData = {
                    'Controller': 'Document',
                    'Method': paymentType === 'withdraw' ? 'CreatePaymentRequest' : 'CreateDepositRequest',
                    'Token': this.userData.Token,
                    'ClientId': this.userData.Id,
                    'PartnerId': this.defaultOption.PartnerId,
                    'RequestData': JSON.stringify({
                        PartnerId: this.defaultOption.PartnerId,
                        Amount: amount,
                        PaymentSystemId: paymentData.PaymentSystemId,
                        ClientId: this.userData.Id,
                        CurrencyId: this.userData.CurrencyId,
                        BetShopId: paymentData.betShopId,
                        CashCode: info,
                        PromoCode: promoCode
                    })
                };
                break;
            default:
                if (promoCode) {
                    this.paymentParams['PromoCode'] = promoCode;
                    bonusTypeId = 7;
                }
                ;

                postData = {
                    'Controller': 'Document',
                    'Method': paymentType === 'withdraw' ? 'CreatePaymentRequest' : 'CreateDepositRequest',
                    'Token': this.userData.Token,
                    'ClientId': this.userData.Id,
                    'PartnerId': this.defaultOption.PartnerId,
                    'RequestData': JSON.stringify({
                        PartnerId: this.defaultOption.PartnerId,
                        Amount: amount,
                        Info: JSON.stringify(this.paymentParams),
                        PaymentSystemId: paymentData.PaymentSystemId,
                        ClientId: this.userData.Id,
                        CurrencyId: this.userData.CurrencyId
                    })
                };
        }
        this.resetPaymentParams(true);
        this.GetUserAccounts();
        return await this.paymentsService.defaultRequest(postData);
    }


    public async getClientPaymentAccountDetails() {
        this.defaultOption = this.configService.defaultOptions;
        const input = {
            PartnerId: this.defaultOption.PartnerId,
            ClientId: this.isLogin ? this.userData.Id : 0,
            Controller: "Client",
            Method: "GetClientPaymentAccountDetails",
            RequestData: JSON.stringify(this.userData.Id),
            Token: this.userData.Token
        };

        return await this.defaultService.defaultRequest(input);
    }

    public getPaymentStates() {
        const input = {
            PartnerId: this.defaultOption.PartnerId,
            ClientId: this.isLogin ? this.userData.Id : 0,
            Controller: "Document",
            Method: "GetPaymentRequestStates",
            RequestData: JSON.stringify({}),
            Token: this.userData.Token
        };

        this.defaultService.defaultRequest(input).then((responceData) => {
            if (responceData['ResponseCode'] === 0) {
                this.notifyGetPaymentStatesList.next(responceData['ResponseObject']);
            }
        });

    }

    public getPaymentHistoryList(data) {
        const index = data['operationFilterIndex'];
        const filter = {
            'ClientId': this.userData.Id,
            'CurrencyId': this.userData.CurrencyId,
            'TimeZone': this.configService.timeZone,
            'CreatedFrom': data.createdFrom,
            'CreatedBefore': data.createdBefore,
            'SkipCount': data['index'],
            'TakeCount': data.historyInPage,
            'Statuses': data.paymentsTypeFilter[index].Value == 0 ? null : data.paymentsTypeFilter[index].Value,
            'Type': data['paymentFilter']
        };

        const sendData = {
            'Controller': 'Document',
            'Method': 'GetPaymentRequests',
            'PartnerId': this.defaultOption.PartnerId,
            'Token': this.userData.Token,
            'ClientId': this.userData.Id,
            'RequestData': JSON.stringify(filter)
        };

        this.defaultService.defaultRequest(sendData).then((responceData) => {
            if (responceData['ResponseCode'] === 0) {
                this.notifyGetPaymentsList.next(responceData['PaymentRequests']);
                this.notifyGetPaymentsCount.next(responceData['Count']);
            } else {
                this.notifyGetPaymentRequestError.next(responceData['Description']);
            }
        });

    }


    public getSettings() {
        return this.configService.defaultOptions;
    }


    /*
    **Get Banks List
    */

    getBanksList(paymentId) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = Methods.GET_PAYMENT_BANKS;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify(paymentId);

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0) {
                this.notifyGetPaymentBanksList.next(data["ResponseObject"]);
            } else {
                this.notifyGetPaymentBanksError.next(data["Description"]);
            }
        });
    }


    cancelPayment(paymentId) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = Methods.CANCEL_PAYMENT;
        request.PartnerId = PartnerId;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.RequestData = JSON.stringify({'ClientId': this.userData.Id, 'RequestId': paymentId, 'Comment': ''});

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0) {
                this.notifyGetCancelPaymentMessage.next(data["ResponseObject"]);
            } else {
                this.notifyGetCancelPaymentErrorMessage.next(data["Description"]);
            }
        });
    }


    getSmsCode(mobileNumber)
    {
        this.baseApiService.apiRequest({
            MobileNumber: mobileNumber,Type:VerificationCodeTypes.MobileNumberVerification
        }, Controllers.MAIN, Methods.SEND_SMS_CODE, false).pipe(tap(data => {
            if (data["ResponseCode"] == 0) {
                this.notifyGetSmsCode.next(data["ResponseObject"]);
            } else {
                this.notifyGetSmsCodeError.next(data["Description"]);
            }
        }));
    }

    getClientWallets(paymentSystemId)
    {
        return this.baseApiService.apiRequest(paymentSystemId, Controllers.CLIENT, Methods.GET_CLIENT_WALLETS, true);
    }
}
