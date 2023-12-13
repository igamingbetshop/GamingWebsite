import {Injectable, Injector} from '@angular/core';
import {BetsService} from "@core/services/app/bets.services";
import {Subject} from "rxjs";

@Injectable()

export class GetHistoryService {

  public betsService: BetsService;

  public notifyGetUserTransactionList: Subject<any> = new Subject<any>();
  public notifyGetUserTransactionError: Subject<any> = new Subject<any>();
  public notifyGetUserTransactionCount: Subject<any> = new Subject<any>();

  constructor(public injector: Injector) {
    this.betsService = injector.get(BetsService);
  }

  /*Remove*/

  public getTransactionsHistory(data) {
    this.betsService.getTransactionHistory(data.page, data.historyFilter, data.historyTimeFilterIndex, data.customDate).then((responceData) => {
      if (responceData['ResponseCode'] === 0) {
        this.notifyGetUserTransactionList.next(responceData['Transactions']);
        this.notifyGetUserTransactionCount.next(responceData['Count']);
      } else {
        this.notifyGetUserTransactionError.next(responceData['Description']);
      }
    });
  }


  public getTransactionsList(data) {

  }

}
