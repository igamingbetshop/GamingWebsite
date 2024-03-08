import { Component, Injector, Input } from '@angular/core';
import { format } from 'date-fns';
import { AppCommonBetsHistoryComponent } from '../../../common/app-common-bets-history/app-common-bets-history.component';
import { LocalStorageService } from '../../../../../../../@core/services';

@Component({
  selector: 'app-mobile-account-page-type3-history',
  templateUrl: './mobile-account-page-type3-history.component.html',
  styleUrls: ['./mobile-account-page-type3-history.component.scss']
})
export class MobileAccountPageType3HistoryComponent extends AppCommonBetsHistoryComponent {
  public localStorageService: LocalStorageService;
  public CurrencyId: any;
  public selectedStatus;
  public selectedDate;
  public historyTimeFilter: Array<any> = [
    { 'Name': 'Filter_Period.1 month' },
    { 'Name': 'Filter_Period.3 month' },
    { 'Name': 'Filter_Period.6 month' },
    { 'Name': 'Filter_Period.All' }
  ];
  public betTypeFilter = [];
  public historyFilter = {
    'CreatedFrom': '',
    'CreatedBefore': '',
    'FilterIndex': 0
  };
  public userInfoList: any = {};
  public betStatuses;
  public isLoaded: boolean;
  public currencySymbol: any;
  openedIndex: number = null;
  @Input('transactionId') transactionId: string;

  constructor(public injector: Injector) {
    super(injector);
    this.localStorageService = injector.get(LocalStorageService);
    const userData = this.localStorageService.get('user');
    this.CurrencyId = userData ? userData.CurrencyId : '';
    this.currencySymbol = userData ? userData.CurrencySymbol : '';
    // this.form = this.fb.group({
    //   timeFilter: 1,
    //   operationFilter: 0,
    //   // operationFilter: 3,
    //   productId: null
    // });
    window.scroll(0,0);
  }

  selectedStatusValue(item) {
    this.selectedStatus = item.Name;
    this.form.get('operationFilter').setValue(item.Value);
    this.submit(1);
  }
  selectedDateValue(i, item) {
    this.selectedDate = item.Name;
    this.getCreationDate(i);
    this.form.get('timeFilter').setValue(i);
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
        // d1.setTime(d1.getTime() - (100 * 365 * dayms));
        d1.setMonth(d1.getMonth() - 1);
        break;
      case 1:
        // d1.setTime(d1.getTime() - dayms);
        d1.setMonth(d1.getMonth() - 3);
        break;
      case 2:
        // d1.setTime(d1.getTime() - (7 * dayms));
        d1.setMonth(d1.getMonth() - 6);
        break;
      case 3:
        // if (d1.getMonth() === 0) {
        //   d1.setFullYear(d1.getFullYear() - 1);
        //   d1.setMonth(11);
        // } else {
        // d1.setMonth(d1.getMonth() - 1);
        d1.setTime(d1.getTime() - (100 * 365 * dayms));
        // }
        break;
    }

    const d = format(d1, 'yyyy-MM-dd HH:mm');
    return d;
  }

  getBetsHistory(page) {
    this.page = page;

    this.getCreationDate(this.form.getRawValue().timeFilter);
    const input = {
      id: null,
      index: page - 1,
      createdFrom: this.historyFilter['CreatedFrom'],
      createdBefore: this.historyFilter['CreatedBefore'],
      historyInPage: this.historyInPage,
      operationFilterIndex: this.operationFilterIndex,
      betStatusFilter: this.getBetsHistoryService.betStatuses,
      productId: this.form.get('productId').value
    };

    if (this.form.valid) {
      if (this.transactionId) {
        this.getBetsHistoryService.getBetsHistoryList(input, this.transactionId);
        this.transactionId = undefined;
      } else {
        this.getBetsHistoryService.getBetsHistoryList(input);
      }
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  public openBetInfo(data: any, index: any) {
    console.log(data);
    if (index === this.openedIndex) {
      this.openedIndex = null;
    } else {
      // this.openedIndex = index;
      this.getBetsHistoryService.getBetsInfo(data).then((responseData) => {
        if (responseData['ResponseCode'] === 0) {
          this.openedIndex = index;
          this.isLoaded = true;
          this.userInfoList = responseData['ResponseObject'];
          this.userInfoList.ForcedChosenNumber = 0;
          this.userInfoList.BonusAmount = this.userInfoList.PossibleWin == 0 ? 0 : (this.userInfoList.PossibleWin - this.userInfoList.BetAmount * this.userInfoList.Coefficient).toString().match(/^-?\d+(?:\.\d{0,4})?/)?.[0];
          this.userInfoList.PossibleWin = this.userInfoList.PossibleWin.toString().match(/^-?\d+(?:\.\d{0,2})?/)?.[0];
          let multiway = false;
          const matches = new Map();
          this.userInfoList.BetSelections = this.userInfoList.BetSelections.map(obj => {
            // obj.State = obj.State.replace(/,/g, '');
            if (obj.ForcedChosen) {
              this.userInfoList.ForcedChosenNumber++;
            }
            if (!multiway) {
              if (matches.has(obj.MatchId)) {
                multiway = true;
              } else { matches.set(obj.MatchId, obj.MatchId); }
            }
            return obj;
          });
          this.userInfoList.Multiway = multiway ? this.translate.instant('Bet.Multiway') : '';
          this.userInfoList.ForcedChosenName = this.userInfoList.ForcedChosenNumber ? this.userInfoList.ForcedChosenNumber + 'B + ' : '';
          this.userInfoList.SystemName = this.userInfoList.Type === 3 ? this.userInfoList.SystemOutCounts.join('/') + ' ' + this.translate.instant('Bet.Out of') + ' ' + this.userInfoList.NumberOfMatches : '';
          this.betStatuses = this.getBetsHistoryService.betStatuses;
          this.betStatuses.forEach(betStatus => {
            if (this.userInfoList.Status === betStatus.Value) {
              this.userInfoList.StatusName = betStatus.Name;
            }
          });
          this.betTypeFilter = this.getBetsHistoryService.betTypeFilter;
          this.betTypeFilter.find((subItem): any => {
            if (subItem.Value === this.userInfoList.Type) {
              this.userInfoList.StatusTypeName = subItem.Name;
            }
          });
          console.log(this.userInfoList);
        } else {
          this.isLoaded = false;
        }
      });
    }
  }

  isItemOpened(index) {
    return this.openedIndex === index;
  }

}
