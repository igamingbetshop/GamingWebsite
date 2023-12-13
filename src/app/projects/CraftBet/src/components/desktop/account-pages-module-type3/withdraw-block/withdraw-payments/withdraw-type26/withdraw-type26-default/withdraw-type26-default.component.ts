import {Component, Injector} from '@angular/core';
import {BaseWithdrawType26Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type26/base-withdraw-type26.component";

@Component({
  selector: 'app-withdraw-type26-default',
  templateUrl: './withdraw-type26-default.component.html'
})
export class WithdrawType26DefaultComponent extends BaseWithdrawType26Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
