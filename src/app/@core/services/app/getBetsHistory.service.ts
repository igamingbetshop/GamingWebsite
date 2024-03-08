import {Injectable, Injector} from '@angular/core';
import {LocalStorageService} from './localStorage.service';
import {ConfigService} from './config.service';
import {DefaultService} from '../api/default.service';
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Methods} from "@core/enums"
import {Controllers} from "@core/enums";
import {BetsService} from "@core/services/app/bets.services";

@Injectable()

export class GetBetsHistoryService {

  public baseApiService: BaseApiService;

  public betsService: BetsService;
  public localStorageService: LocalStorageService;
  public configService: ConfigService;
  public defaultService: DefaultService;
  public translate: TranslateService;

  public betTypeFilter: Array<any> = [
    {
      "Value": 0,
      "Name": "All"
    },
    {
      "Value": 1,
      "Name": "Single"
    },
    {
      "Value": 2,
      "Name": "Multiple"
    },
    {
      "Value": 3,
      "Name": "System"
    },
    {
      "Value": 4,
      "Name": "Chain"
    }
  ];

  private _notifyGetBetsHistoryList = new Subject<any>();
  public notifyGetBetsHistoryList$ = this._notifyGetBetsHistoryList.asObservable();

  public _notifyGetStatusList = new Subject<any>();
  public notifyGetStatusList$ = this._notifyGetStatusList.asObservable();

  public betStatuses: any[] = [];
  public betsHistoryList: any[] = [];
  public betsHistoryListCount: number;
  public betStatusName;


  public userData: any;
  public defaultOption: any;

  constructor(public injector: Injector) {
    this.betsService = injector.get(BetsService);
    this.localStorageService = injector.get(LocalStorageService);
    this.configService = injector.get(ConfigService);
    this.defaultService = injector.get(DefaultService);
    this.baseApiService = injector.get(BaseApiService);
    this.translate = injector.get(TranslateService);

    this.userData = this.localStorageService.get('user');
    this.defaultOption = this.configService.defaultOptions;
  }

  public getBetsHistory() {
    this.betsService.getBetStates().then((responceData) => {
      if (responceData['ResponseCode'] === 0) {
        this._notifyGetStatusList.next(responceData['ResponseObject']);
      }
    });
  }

  public getBetsHistoryList(data, transactionId?) {
    const filter = {
      'ClientId': this.userData.Id,
      'CurrencyId': this.userData.CurrencyId,
      'CurrencySymbol': this.userData.CurrencySymbol,
      'PartnerId': this.defaultOption.PartnerId,
      'TimeZone': this.configService.timeZone,
      'CreatedFrom': data.createdFrom,
      'CreatedBefore': data.createdBefore,
      'SkipCount': data['index'],
      'TakeCount': data.historyInPage,
      'GroupId' : data.productId,
      'ProductIds': data['id'] ? data['id'] : null
    };

    if (data['operationFilterIndex'] > 0) {
      filter['Status'] = data['operationFilterIndex'];
    }

    this.baseApiService.apiRequest(filter, Controllers.DOCUMENT, Methods.GET_BETS_HISTORY).subscribe((data) => {
      if (data['ResponseCode'] == 0)
      {
        if (data.ResponseObject.Bets.length > 0)
        {
          data.ResponseObject.Bets.map((item) =>
          {
            this.betTypeFilter.find((subItem): any =>
            {
              if (subItem.Value === item.BetTypeId) {
                item.statusTypeName = subItem.Name;
              }
            });
          });
        }
        this.betsHistoryList = data.ResponseObject['Bets'];
        this.betsHistoryList.forEach(item => {
          this.betStatuses.forEach(betStatus => {
            if(item.State === betStatus.Value) {
              item.betStatusName = betStatus.Name;
            }
          });
        });
        this.betsHistoryListCount = data.ResponseObject['Count'];
        if (transactionId) {
          this.betsHistoryList = this.betsHistoryList.filter(item => item.BetDocumentId === transactionId);
          this.betsHistoryListCount = null;
        }
        this._notifyGetBetsHistoryList.next({ type: 'Success', data: data.ResponseObject['Bets'] });
      } else {
        this._notifyGetBetsHistoryList.next({ type: 'Error', data: data['Description'] });
      }
    });

  }

  getProducts()
  {
    return this.baseApiService.apiRequest(undefined, Controllers.PRODUCT, Methods.GET_PRODUCT_GROUP);
  }

  getBetsStatusList() {
    const data = {};
    this.baseApiService.apiRequest(data, Controllers.DOCUMENT, Methods.GET_BET_STATES).subscribe((data) => {
      let responseObject = data['ResponseObject'];
      responseObject.unshift({'Value': 0, 'Name': this.translate.instant("Info.All")});
      this.betStatuses = responseObject;
      if (data['ResponseCode'] == 0) {
        this._notifyGetStatusList.next(responseObject);
      }
    });
  }


  public getBetsInfo(data): any {

    let input = {
      'Controller': 'Document',
      'Method': 'GetBetInfo',
      'PartnerId': this.defaultOption.PartnerId,
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'TimeZone': this.configService.timeZone,
      'RequestData': JSON.stringify(data.BetDocumentId)
    };

    return this.defaultService.defaultRequest(input);

  }

  public downloadBets(data) {
    const filter = {
      'ClientId': this.userData.Id,
      'CurrencyId': this.userData.CurrencyId,
      'CurrencySymbol': this.userData.CurrencySymbol,
      'PartnerId': this.defaultOption.PartnerId,
      'TimeZone': this.configService.timeZone,
      'CreatedFrom': data.createdFrom,
      'CreatedBefore': data.createdBefore,
      'SkipCount': data['index'],
      'TakeCount': data.historyInPage,
      'GroupId' : data.productId,
      'ProductIds': data['id'] ? data['id'] : null
    };

    if (data['operationFilterIndex'] > 0) {
      filter['Status'] = data['operationFilterIndex'];
    }
    return this.baseApiService.apiRequest(filter, Controllers.DOCUMENT, Methods.EXPORT_BETS_HISTORY);
  }

}
