import {Component, Injector } from '@angular/core';
import {BaseWithdrawType6Component} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type6/base-withdraw-type6.component";

@Component({
  selector: 'app-mobile-withdraw-type6-default',
  templateUrl: './mobile-withdraw-type6-default.component.html'
})
export class MobileWithdrawType6DefaultComponent extends BaseWithdrawType6Component {
  public regionValue: '';
  public betshopValue: '';

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  changeRegion(betShop) {
    this.selectedBetShopRegion = betShop['Betshops'];
  }

}
