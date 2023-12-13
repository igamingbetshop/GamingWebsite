import {Component, Injector } from '@angular/core';
import {BaseWithdrawType7Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type7/base-withdraw-type7.component";

@Component({
  selector: 'app-mobile-withdraw-type7-default',
  templateUrl: './mobile-withdraw-type7-default.component.html'
})
export class MobileWithdrawType7DefaultComponent extends BaseWithdrawType7Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
