import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { format } from 'date-fns';
import { BonusesComponent } from '../../../../../../../@theme/components/common/bonuses/bonuses.component';
import { LocalStorageService } from '../../../../../../../@core/services';

@Component({
  selector: 'app-mobile-account-page-type3-bonuses',
  templateUrl: './mobile-account-page-type3-bonuses.component.html',
  styleUrls: ['./mobile-account-page-type3-bonuses.component.scss']
})
export class MobileAccountPageType3BonusesComponent extends BonusesComponent {
  public localStorageService: LocalStorageService;
  public selectedStatus;
  public selectedDate;
  public currencySymbol: any;
  public openedIndex: number = null;
  public historyTimeFilter: Array<any> = [
    { 'Name': 'Filter_Period.All' },
    { 'Name': 'Filter_Period.24 hours' },
    { 'Name': 'Filter_Period.7 days' },
    { 'Name': 'Filter_Period.1 month' },
    { 'Name': 'Filter_Period.1 year' },
  ];

  constructor(public injector: Injector) {
    super(injector);
    this.localStorageService = injector.get(LocalStorageService);
    const userData = this.localStorageService.get('user');
    this.currencySymbol = userData ? userData.CurrencySymbol : '';
    window.scroll(0,0);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  selectedStatusValue(item) {
    this.selectedStatus = item.Name;
    this.form.get('status').setValue(item.Id);
    this.submit();
  }

  selectedDateValue(i, item) {
    this.selectedDate = item.Name;
    this.form.addControl('FromDate', new FormControl(''));
    const formattedDate = this.getCreatedFrom(i);
    this.form.get('FromDate').setValue(formattedDate);
    this.submit();
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
      case 4:
        d1.setFullYear(d1.getFullYear() - 1);
        break;
    }

    const d = format(d1, 'yyyy-MM-dd HH:mm');
    return d;
  }

  isItemOpened(index) {
    return this.openedIndex === index;
  }

  openBonusInfo(index) {
    if (index === this.openedIndex) {
      this.openedIndex = null;
    } else {
      this.openedIndex = index;
    }
  }

  public submit() {
    // const fromDate = this.form.get('FromDate')?.value;
    // const status = this.form.get('status').value;
    //
    // // if (fromDate && status) {
    // //   this.bonusesService.GetBonuses(this.selectedProduct, status, fromDate);
    // // } else if (fromDate) {
    // //   this.bonusesService.GetBonuses(this.selectedProduct, null, fromDate);
    // // } else if (status) {
    // //   this.bonusesService.GetBonuses(this.selectedProduct, status);
    // // } else {
    // //   this.bonusesService.GetBonuses(this.selectedProduct);
    // // }
    if (this.form.get('status').value)
    {
      const bonusData = {...this.selectedTab.bonusData, ...{Status: this.form.get('status').value}};
      this.bonusesService.GetBonuses(bonusData);
    }
    else
    {
      this.bonusesService.GetBonuses(this.selectedTab.bonusData);
    }
  }

}
