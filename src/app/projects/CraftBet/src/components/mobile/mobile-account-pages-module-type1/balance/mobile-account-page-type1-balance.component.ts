import { Component, Injector } from '@angular/core';
import { LayoutService } from '@core/services/app/layout.service';
import { BaseAccountsComponent } from '../../../../../../../@theme/components/common/base-accounts/base-accounts.component';

@Component({
  selector: 'app-mobile-account-page-type1-balance',
  templateUrl: './mobile-account-page-type1-balance.component.html',
  styleUrls: ['./mobile-account-page-type1-balance.component.scss']
})
export class MobileAccountPageType1BalanceComponent extends BaseAccountsComponent {

  constructor(public injector: Injector,
              public layoutService: LayoutService) {
    super(injector);
  }

}
