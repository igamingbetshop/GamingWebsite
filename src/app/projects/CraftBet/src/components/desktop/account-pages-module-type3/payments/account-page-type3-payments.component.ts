import { Component, Injector } from '@angular/core';
import { AppCommonPaymentsComponent } from '../../../common/app-common-payments/app-common-payments.component';
import {format} from "date-fns";

@Component({
  selector: 'app-account-page-type3-payments',
  templateUrl: './account-page-type3-payments.component.html',
  styleUrls: ['./account-page-type3-payments.component.scss']
})
export class AccountPageType3PaymentsComponent extends AppCommonPaymentsComponent {
  public selectedStatus;
  public selectedDate;
  public selectedType;
  public historyTimeFilter: Array<any> = [
    {"Id": 0, 'Name': 'Filter_Period.All' },
    { "Id": 1,'Name': 'Filter_Period.24 hours' },
    { "Id": 2,'Name': 'Filter_Period.7 days' },
    { "Id": 3,'Name': 'Filter_Period.1 month' }
  ];
  public historyFilter = {
    'CreatedFrom': '',
    'CreatedBefore': '',
    'FilterIndex': 0
  };
  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fb.group({
      timeFilter: [this.historyTimeFilter[0]],
      type: [null, []],
      status: [this.paymentsFilter[0]]
    });
    this.selectedDateValue(0 , 'Filter_Period.All');
  }

  selectedStatusValue(item) {
    this.selectedStatus = item.Name;
    this.form.get('status').setValue(item);
    this.submit(1);
  }
  selectedDateValue(i, item) {
    this.selectedDate = item.Name;
    this.getCreationDate(i);
    this.form.get('timeFilter').setValue(i);
    this.submit(1);
  }

  selectedTypeStatusValue(item) {
    this.selectedType = item.Name;
    this.form.get('type').setValue(item.Value);
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
        d1.setTime(d1.getTime() - (100 * 365 * dayms));
        break;
      case 1:
        d1.setTime(d1.getTime() - dayms);
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
    return d;
  }

  public getPaymentData(page) {
    this.page = page;
    !this.filterChanged && this.getCreationDate(this.form.getRawValue().timeFilter);
    const formValue = this.form.getRawValue();
    const input = {
      createdFrom: this.historyFilter['CreatedFrom'],
      createdBefore: this.historyFilter['CreatedBefore'],
      status: formValue['status']['Statuses'],
      type: formValue['type'] == null ? null : formValue['type'],
      page: page - 1,
      takeCount: this.takeCount
    };
    if (this.form.valid) {
      this.getPaymentsService.getPaymentHistoryList(input);
    }
  }

}
