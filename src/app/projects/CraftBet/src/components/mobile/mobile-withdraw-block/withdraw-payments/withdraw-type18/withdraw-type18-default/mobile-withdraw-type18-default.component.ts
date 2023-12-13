import {Component, Injector} from '@angular/core';
import {BaseWithdrawType18Component} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type18/base-withdraw-type18.component";

@Component({
  selector: 'app-mobile-withdraw-type18-default',
  templateUrl: './mobile-withdraw-type18-default.component.html'
})
export class MobileWithdrawType18DefaultComponent extends BaseWithdrawType18Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
