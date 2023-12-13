import { Component, Injector } from '@angular/core';
import { BaseAccountsComponent } from '../../../../../../../@theme/components/common/base-accounts/base-accounts.component';

@Component({
  selector: 'app-account-page-type1-balance',
  templateUrl: './account-page-type1-balance.component.html',
  styleUrls: ['./account-page-type1-balance.component.scss']
})
export class AccountPageType1BalanceComponent extends BaseAccountsComponent {

  constructor(public injector: Injector)
  {
    super(injector);
  }

}
