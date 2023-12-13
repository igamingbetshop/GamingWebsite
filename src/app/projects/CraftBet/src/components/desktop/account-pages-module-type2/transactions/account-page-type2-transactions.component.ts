import {Component, Injector } from '@angular/core';
import {AppCommonTransactionsComponent} from "../../../common/app-common-transactions/app-common-transactions.component";

@Component({
  selector: 'app-account-page-type2-transactions',
  templateUrl: './account-page-type2-transactions.component.html'
})
export class AccountPageType2TransactionsComponent extends AppCommonTransactionsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
