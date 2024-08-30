import {Injectable, Injector} from '@angular/core';
import {Methods} from "@core/enums"
import {Controllers} from "@core/enums";
import {Subject} from "rxjs";
import {BaseApiService} from "@core/services/api/base-api.service";
import {TranslateService} from "@ngx-translate/core";
import {ConfigService, LocalStorageService} from "@core/services";

@Injectable()

export class GetTransactionsService {

  public baseApiService: BaseApiService;
  public translate: TranslateService;
  public configService: ConfigService;
  public localStorageService: LocalStorageService;

  private _notifyGetOperationTypes = new Subject<any>();
  public notifyGetOperationTypes$ = this._notifyGetOperationTypes.asObservable();

  private _notifyGetTransactionsList = new Subject<any>();
  public notifyGetTransactionsList$ = this._notifyGetTransactionsList.asObservable();

  private _notifyGetTransactionsListLength = new Subject<any>();
  public notifyGetTransactionsListLength$ = this._notifyGetTransactionsListLength.asObservable();

  public operationTypes: any[] = [];
  public transactionsList: any[] = [];
  public transactionsListCount: number;
  public transactionsReportList: any[] = [];
  public transactionsReportListCount: number;

  public userData: any;
  public defaultOption: any;

  constructor(public injector: Injector) {
    this.baseApiService = injector.get(BaseApiService);
    this.translate = injector.get(TranslateService);
    this.configService = injector.get(ConfigService);
    this.localStorageService = injector.get(LocalStorageService);

    this.userData = this.localStorageService.get('user');
    this.defaultOption = this.configService.defaultOptions;
  }


  public getOperationTypes() {

    const filter = {};
    this.baseApiService.apiRequest(filter, Controllers.DOCUMENT, Methods.GET_OPERATION_TYPES).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        let responseObject = data.ResponseObject['OperationTypes'];
        responseObject.unshift({'Id': 0, 'Name': this.translate.instant("Info.All")});

        this.operationTypes = responseObject;
        this._notifyGetOperationTypes.next(responseObject);
      }
    });
  }


  public getTransactionList(data) {

    const filter = {
      'ClientId': this.userData.Id,
      'CurrencyId': this.userData.CurrencyId,
      'PartnerId': this.defaultOption.PartnerId,
      'TimeZone': this.configService.timeZone,
      'CreatedFrom': data.createdFrom,
      'CreatedBefore': data.createdBefore,
      'SkipCount': data['index'],
      'TakeCount': data.historyInPage
    };

    if (data['operationTypeId'] > 0)
    {
      filter['OperationTypeId'] = data['operationTypeId'];
    }

    this.baseApiService.apiRequest(filter, Controllers.DOCUMENT, Methods.GET_TRANSACTION_HISTORY).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        this.transactionsList = data.ResponseObject['Transactions'];
        this.transactionsListCount = data.ResponseObject['Count'];
        this._notifyGetTransactionsList.next(data.ResponseObject['Transactions']);
        this._notifyGetTransactionsListLength.next(data.ResponseObject['Count']);
      }
    });

  }

  getTransactionsReport(data: any) {
    const filter = {
      'ClientId': this.userData.Id,
      'CurrencyId': this.userData.CurrencyId,
      'PartnerId': this.defaultOption.PartnerId,
      'TimeZone': this.configService.timeZone,
      'FromDate': data.FromDate,
      'ToDate': data.ToDate,
      'SkipCount': data['index'],
      'TakeCount': data.historyInPage
    };

    this.baseApiService.apiRequest(filter, Controllers.AGENT, Methods.GET_TRANSACTIONS).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        this.transactionsReportList = data.ResponseObject['Entities'];
        this.transactionsReportListCount = data.ResponseObject['Count'];
      }
    });
  }

}
