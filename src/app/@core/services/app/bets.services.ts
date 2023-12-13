import {Injectable, Injector} from '@angular/core';
import {ConfigService} from './config.service';
import {LocalStorageService} from './localStorage.service';
import {DefaultService} from '../api/default.service';
import {PaymentsService} from '../api/payments.service';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from '@angular/common/http';
import {UserLogined} from "@core/services/app/userLogined.service";
import { format } from 'date-fns'
import {Subject} from "rxjs";

@Injectable()
export class BetsService {
  public defaultOption: any;
  public isLogin: boolean;
  public userData: any;
  public historyInPage: number = 10;
  public createForm: any;
  public operationsFilter: Array<any> = [];
  public betShopList: Array<any> = [];
  public paymentRequestStates: Array<any> = [];
  public history: Array<any> = [];
  public historyCount: number = 0;

  public paymentsTypeFilter = [
    {'Id': 0, 'Name': 'All', Type: null},
    {'Id': 1, 'Name': 'Withdraw', Type: 1},
    {'Id': 2, 'Name': 'Deposit', Type: 2}
  ];

  public configService: ConfigService;
  public userLogined: UserLogined;
  public localStorageService: LocalStorageService;
  public defaultService: DefaultService;
  public paymentsService: PaymentsService;
  private translate: TranslateService;
  private http: HttpClient;


  public notifyBetsStatusList: Subject<any> = new Subject<any>();


  constructor(public injector: Injector) {

    this.configService = injector.get(ConfigService);
    this.userLogined = injector.get(UserLogined);
    this.localStorageService = injector.get(LocalStorageService);
    this.defaultService = injector.get(DefaultService);
    this.paymentsService = injector.get(PaymentsService);
    this.translate = injector.get(TranslateService);
    this.http = injector.get(HttpClient);

    this.isLogin = this.userLogined.isAuthenticated;
    this.userData = this.localStorageService.get('user');
    this.defaultOption = this.configService.defaultOptions;
  }


  public getCreatedFrom(index) {
    let dayms = 86400 * 1000;
    if (index < 4) {
      let d1 = new Date();

      switch (index) {
        case 0:
          d1.setTime(d1.getTime() - dayms);
          break;
        case 1:
          d1.setTime(d1.getTime() - (3 * dayms));
          break;
        case 2:
          d1.setTime(d1.getTime() - (7 * dayms));
          break;
        case 3:
          if (d1.getMonth() === 0) {
            d1.setFullYear(d1.getFullYear() - 1);
            d1.setMonth(11);
          } else {
            d1.setMonth(d1.getMonth() - 1);
          }
          break;
      }

      const d = format(d1, 'yyyy-MM-dd HH:mm');
      this.createForm = d;
      return d;
    }
  }

  public getCreatedBefore() {
    let d2 = new Date();
    d2.setDate(d2.getDate() + 1);
    d2.setMinutes(d2.getMinutes() + 1);
    return format(d2, 'yyyy-MM-dd HH:mm');
  }


  public async getPaymentRequestStates() {
    this.defaultOption = this.configService.defaultOptions
    let filter = {
      'Controller': 'Document',
      'Method': 'GetPaymentRequestStates',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'RequestData': JSON.stringify({})
    };

    let data = await this.defaultService.defaultRequest(filter);
    if (data['ResponseCode'] === 0) {
      this.paymentRequestStates = data['ResponseObject'];
    }

  }

  public async getBetStates() {
    this.defaultOption = this.configService.defaultOptions;

    const filter = {
      'Controller': 'Document',
      'Method': 'GetBetStates',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'LanguageId': localStorage.getItem('lang'),
      'RequestData': JSON.stringify({})
    };

    return await this.defaultService.defaultRequest(filter);

  }

  /*
  ** Get Bets Status List(remove getBetStates function)
  */

  /*
  *
  */
  getBetsStatusList() {
    const filter = {
      'Controller': 'Document',
      'Method': 'GetBetStates',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'LanguageId': localStorage.getItem('lang'),
      'RequestData': JSON.stringify({})
    };

    this.defaultService.defaultRequest(filter).then((data) => {
      if (data['ResponseCode'] === 0) {
        this.notifyBetsStatusList.next(data['ResponseObject']);
      }
    });
  }


  public async getOperationTypes() {
    this.defaultOption = this.configService.defaultOptions;
    let filter = {
      'Controller': 'Document',
      'Method': 'GetOperationTypes',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'RequestData': JSON.stringify({})
    };

    let data = await this.defaultService.defaultRequest(filter);
    if (data['ResponseCode'] === 0) {
      this.operationsFilter = data['OperationTypes'];
      this.operationsFilter.unshift({'Id': 0, 'Name': this.translate.instant("Info.All")});
    }

    return this.operationsFilter;
  }


  public getSettings() {
    return this.configService.defaultOptions;
  }


  /*Remove*/

  public async getTransactionHistory(index, historyFilter, historyTimeFilterIndex, customDate) {
    let filter = {
      'ClientId': this.userData.Id,
      'TimeZone': this.configService.timeZone,
      'CurrencyId': this.userData.CurrencyId,
      'CreatedFrom': customDate[0],
      'CreatedBefore': customDate[1],
      'SkipCount': typeof index !== 'undefined' ? index : 0,
      'TakeCount': this.historyInPage
    };

    if (historyFilter.FilterIndex > 0) {
      filter['OperationTypeId'] = this.operationsFilter[historyFilter.FilterIndex].Id;
    }


    let sendData = {
      'Controller': 'Document',
      'Method': 'GetTransactionHistory',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'RequestData': JSON.stringify(filter)
    }

    return await this.defaultService.defaultRequest(sendData);

  }


  public async getPaymentsHistory(index, historyFilter, paymentsFilter, paymentsTypeFilter, paymentsTypeFilterIndex, paymentsFilterIndex, historyTimeFilterIndex, customDate) {
    let filter = {
      'ClientId': this.userData.Id,
      'TimeZone': this.configService.timeZone,
      'CurrencyId': this.userData.CurrencyId,
      'Statuses': paymentsFilter[historyFilter.FilterIndex].Statuses,
      'Type': paymentsTypeFilter[paymentsTypeFilterIndex].Type,
      'CreatedFrom': historyTimeFilterIndex == 4 ? customDate[0] : this.createForm,
      'CreatedBefore': historyTimeFilterIndex == 4 ? customDate[1] : this.getCreatedBefore(),
      'SkipCount': typeof index !== 'undefined' ? index : 0,
      'TakeCount': this.historyInPage
    };

    let sendData = {
      'Controller': 'Document',
      'Method': 'GetPaymentRequests',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'RequestData': JSON.stringify(filter)
    };

    const data = await this.defaultService.defaultRequest(sendData);

    if (this.betShopList.length > 0) {
      return this.createPaymentsList(data);
    } else {
      let sendData = {'PartnerId': this.defaultOption.PartnerId}
      let betshopsData = await this.paymentsService.GetPartnerBetShops(sendData);
      if (betshopsData['ResponseCode'] === 0) {
        this.betShopList = betshopsData['BetShops'];
        let responceData = this.createPaymentsList(data);
        return responceData;
      }
    }
  }


  public async getPaymentsHistory2(index, statuses, type, createdFrom, createdBefore, skipCount, takeCount) {
    let filter = {
      'ClientId': this.userData.Id,
      'TimeZone': this.configService.timeZone,
      'LanguageId': localStorage.getItem('lang'),
      'CurrencyId': this.userData.CurrencyId,
      'Statuses': statuses,
      'Type': type,
      'CreatedFrom': createdFrom,
      'CreatedBefore': createdBefore,
      'SkipCount': skipCount,
      'TakeCount': takeCount
    };

    let sendData = {
      'Controller': 'Document',
      'Method': 'GetPaymentRequests',
      'LanguageId': localStorage.getItem('lang'),
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,

      'RequestData': JSON.stringify(filter)
    };

    let data = await this.defaultService.defaultRequest(sendData);

    return data;

    /*if (this.betShopList.length > 0) {
      return this.createPaymentsList(data);
    } else {
      let sendData = {'PartnerId': this.defaultOption.PartnerId}
      let betshopsData = await this.paymentsService.GetPartnerBetShops(sendData);
      if (betshopsData['ResponseCode'] === 0) {
        this.betShopList = betshopsData['BetShops'];
        let responceData = this.createPaymentsList(data);
        return responceData;
      }
    }*/
  }


  public createPaymentsList(data) {
    if (data.ResponseCode === 0) {
      let payments = data.PaymentRequests;
      this.historyCount = data.Count;
      for (let i = 0; i < payments.length; i++) {
        let betshop = this.getBetShopById(payments[i].BetShopId);
        payments[i].BetshopName = betshop ? betshop.Name : '';
        payments[i].StatusName = this.getPaymentRequestState(payments[i].Status);
      }
      this.history = payments;
      return payments;
    }

  }


  public getBetShopById(id) {
    for (let i = 0; i < this.betShopList.length; i++) {
      if (this.betShopList[i].Id == id)
        return this.betShopList[i];
    }

    return false;
  }

  public getPaymentRequestState(id) {
    for (let i = 0; i < this.paymentRequestStates.length; i++) {

      if (this.paymentRequestStates[i].Value == id)
        return this.paymentRequestStates[i].Name;
    }
    return '';
  }


  public getBetsHistory(data) {

    let filter = {
      'ClientId': this.userData.Id,
      'CurrencyId': this.userData.CurrencyId,
      'PartnerId': this.defaultOption.PartnerId,
      'TimeZone': this.configService.timeZone,
      // 'CreatedFrom': this.historyFilter['CreatedFrom'],
      // 'CreatedBefore': this.historyFilter['CreatedBefore'],
      // 'SkipCount': typeof index !== 'undefined' ? index : 0,
      // 'TakeCount': this.historyInPage
      // 'ProductIds': id ? [id] : null
    };

    const sendData = {
      'Controller': 'Document',
      'Method': 'GetBetsHistory',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'RequestData': JSON.stringify(filter)
    }


    this.defaultService.defaultRequest(sendData).then((responceData) => {
    });
  }


}
