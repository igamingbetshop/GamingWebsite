import {Component, Injector } from '@angular/core';
import {AppCommonTransactionsComponent} from "../../../common/app-common-transactions/app-common-transactions.component";

@Component({
  selector: 'app-mobile-account-page-type1-transactions',
  templateUrl: './mobile-account-page-type1-transactions.component.html',
})
export class MobileAccountPageType1TransactionsComponent extends AppCommonTransactionsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
