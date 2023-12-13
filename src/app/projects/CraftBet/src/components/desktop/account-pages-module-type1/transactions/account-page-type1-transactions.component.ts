import {Component, Injector, OnInit} from '@angular/core';
import {AppCommonTransactionsComponent} from "../../../common/app-common-transactions/app-common-transactions.component";

@Component({
  selector: 'app-account-page-type1-transactions',
  templateUrl: './account-page-type1-transactions.component.html'
})
export class AccountPageType1TransactionsComponent extends AppCommonTransactionsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
