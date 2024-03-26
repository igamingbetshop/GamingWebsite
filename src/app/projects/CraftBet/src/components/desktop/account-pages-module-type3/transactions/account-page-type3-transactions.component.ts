import {Component, inject, Injector, Input} from '@angular/core';
import { SaveData } from '@core/services';
import { format } from 'date-fns';
import { AppCommonTransactionsComponent } from '../../../common/app-common-transactions/app-common-transactions.component';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-account-page-type3-transactions',
  templateUrl: './account-page-type3-transactions.component.html',
  styleUrls: ['./account-page-type3-transactions.component.scss']
})
export class AccountPageType3TransactionsComponent extends AppCommonTransactionsComponent {
  public selectedDate;
  public selectedType;
  public isLoaded: boolean;
  public historyTimeFilter: Array<any> = [
    // { 'Name': 'Filter_Period.All' },
    // { 'Name': 'Filter_Period.24 hours' },
    // { 'Name': 'Filter_Period.7 days' },
    // { 'Name': 'Filter_Period.1 month' }
    { 'Name': 'Filter_Period.1 month' },
    { 'Name': 'Filter_Period.3 month' },
    { 'Name': 'Filter_Period.6 month' },
    { 'Name': 'Filter_Period.All' }
  ];
  public transactionId;
  public operationTypeId;
  openedIndex: number = null;
  dialog = inject(MatDialog);
  public savedDateService: SaveData;
  public historyInPage: number = 9;

  constructor(public injector: Injector) {
    super(injector);
    this.savedDateService = injector.get(SaveData);
    // this.form = this.fb.group({
    //   timeFilter: 1,
    //   operationFilter: 0
    // });
  }

  selectedDateValue(i, item) {
    this.selectedDate = item.Name;
    this.getCreationDate(i);
    this.form.get('timeFilter').setValue(i);
    this.submit(1);
  }

  selectedTypeValue(item) {
    this.selectedType = item.Name;
    this.form.get('operationFilter').setValue(item.Id);
    this.submit(1);
  }

  public getCreationDate(index?) {
    this.historyFilter['CreatedFrom'] = this.getCreatedFrom(index);
    this.historyFilter['CreatedBefore'] = this.betsService.getCreatedBefore();
  }

  public getCreatedFrom(index) {
    const dayms = 86400 * 1000;
    const d1 = new Date();

    switch (index) {
      case 0:
        d1.setMonth(d1.getMonth() - 1);
        break;
      case 1:
        d1.setMonth(d1.getMonth() - 3);
        break;
      case 2:
        d1.setMonth(d1.getMonth() - 6);
        break;
      case 3:
        d1.setTime(d1.getTime() - (100 * 365 * dayms));
        break;
    }

    const d = format(d1, 'yyyy-MM-dd HH:mm');
    return d;
  }

  getTransactionsHistory(page) {
    this.page = page;
    this.getCreationDate(this.form.getRawValue().timeFilter);
    if (this.form.valid) {
      const input = {
        id: null,
        index: page - 1,
        createdFrom: this.historyFilter['CreatedFrom'],
        createdBefore: this.historyFilter['CreatedBefore'],
        historyInPage: this.historyInPage,
        operationFilterIndex: this.operationFilterIndex,
        operationTypeId: this.form.get('operationFilter').value
      };

      this.getTransactionsService.getTransactionList(input);
    }
  }

  openBetId(item, index) {
    this.transactionId = item.DocumentId;
    this.operationTypeId = item.OperationTypeId;
    if (index === this.openedIndex) {
      this.openedIndex = null;
    } else if (item.OperationTypeId === 3 || item.OperationTypeId === 4) {
      this.openedIndex = index;
      this.isLoaded = true;
    }
    else {
      return;
    }
  }

  isItemOpened(index) {
    return this.openedIndex === index;
  }

  async redirectToHistory() {
    const { AccountPageType3DefaultComponent } = await import('../default/account-page-type3-default.component');
    setTimeout(() => {
      this.dialog.closeAll();
      this.dialog.open(AccountPageType3DefaultComponent, {data:{ title: 'history', transactionId: this.transactionId}, hasBackdrop:true});
      this.savedDateService.selectedItem.Href = 'history';
    }, 100);
  }

}
