import { Component, Injector } from '@angular/core';
import { BaseAccountsComponent } from '../../../../../../../@theme/components/common/base-accounts/base-accounts.component';

@Component({
  selector: 'app-mobile-account-page-type2-balance',
  templateUrl: './mobile-account-page-type2-balance.component.html',
  styleUrls: ['./mobile-account-page-type2-balance.component.scss']
})
export class MobileAccountPageType2BalanceComponent extends BaseAccountsComponent {

  constructor(public injector: Injector) {
    super(injector);
    const userData = this.localStorageService.get('user');
    this.currencySymbol = userData ? userData.CurrencySymbol : '';
  }

}
