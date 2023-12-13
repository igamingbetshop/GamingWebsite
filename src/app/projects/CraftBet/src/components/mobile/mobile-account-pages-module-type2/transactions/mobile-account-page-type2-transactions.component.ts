import {Component, Injector} from '@angular/core';
import {AppCommonTransactionsComponent} from "../../../common/app-common-transactions/app-common-transactions.component";

@Component({
  selector: 'app-mobile-account-page-type2-transactions',
  templateUrl: './mobile-account-page-type2-transactions.component.html'
})
export class MobileAccountPageType2TransactionsComponent extends AppCommonTransactionsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
