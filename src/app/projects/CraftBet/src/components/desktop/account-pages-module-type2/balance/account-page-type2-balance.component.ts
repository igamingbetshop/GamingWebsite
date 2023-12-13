import { Component, Injector } from '@angular/core';
import { BaseAccountsComponent } from '../../../../../../../@theme/components/common/base-accounts/base-accounts.component';

@Component({
  selector: 'app-account-page-type2-balance',
  templateUrl: './account-page-type2-balance.component.html',
  styleUrls: ['./account-page-type2-balance.component.scss']
})
export class AccountPageType2BalanceComponent extends BaseAccountsComponent {

  constructor(public injector: Injector) {
    super(injector);
    const userData = this.localStorageService.get('user');
    this.currencySymbol = userData ? userData.CurrencySymbol : '';
    if (this.CurrencyId === userData.CurrencyId) {
      this.currencySymbol = userData ? userData.CurrencySymbol : '';
    }
  }

}
