import {Component, Injector } from '@angular/core';
import {CommonUserDefaultComponent} from "../../../common/common-user-default/common-user-default.component";

@Component({
  selector: 'app-account-page-type2-history-default',
  templateUrl: './account-page-type2-history-default.component.html'
})
export class AccountPageType2HistoryDefaultComponent extends CommonUserDefaultComponent {
  showActiveTab = 'my-bets';
  constructor(public injector: Injector) {
    super(injector);
  }
  public changeTab(type) {
    this.showActiveTab = type;
  }
}
