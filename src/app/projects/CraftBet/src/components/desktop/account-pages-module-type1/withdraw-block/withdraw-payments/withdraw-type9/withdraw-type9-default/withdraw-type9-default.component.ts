import {Component, Injector } from '@angular/core';
import {BaseWithdrawType9Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type9/base-withdraw-type9.component";

@Component({
  selector: 'app-withdraw-type9-default',
  templateUrl: './withdraw-type9-default.component.html'
})
export class WithdrawType9DefaultComponent extends BaseWithdrawType9Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
