import { Component, Injector } from '@angular/core';
import { BaseAccountsComponent } from '../../../../../../../@theme/components/common/base-accounts/base-accounts.component';

@Component({
  selector: 'app-account-page-type3-credit',
  templateUrl: './account-page-type3-credit.component.html',
  styleUrls: ['./account-page-type3-credit.component.scss']
})
export class AccountPageType3CreditComponent extends BaseAccountsComponent {
  public creditTab = true;
  public selected;

  constructor(public injector: Injector) {
    super(injector);
    const userData = this.localStorageService.get('user');
    this.currencySymbol = userData ? userData.CurrencySymbol : '';
    if (this.CurrencyId === userData.CurrencyId) {
      this.currencySymbol = userData ? userData.CurrencySymbol : '';
    }
    this.selected = JSON.parse(localStorage.getItem('selectedAccountId'));
  }

}
