import {Component, Injector, OnInit} from '@angular/core';
import {AppCommonBetsHistoryComponent} from "../../../common/app-common-bets-history/app-common-bets-history.component";

@Component({
  selector: 'app-account-page-type2-history',
  templateUrl: './account-page-type2-history.component.html',
})
export class AccountPageType2HistoryComponent extends AppCommonBetsHistoryComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
