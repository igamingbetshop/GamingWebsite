import {Component, Injector} from '@angular/core';
import {AppCommonBetsHistoryComponent} from "../../../common/app-common-bets-history/app-common-bets-history.component";

@Component({
  selector: 'app-account-page-type1-history',
  templateUrl: './account-page-type1-history.component.html'
})
export class AccountPageType1HistoryComponent extends AppCommonBetsHistoryComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
