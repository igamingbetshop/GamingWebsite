import {Component, Injector } from '@angular/core';
import {BaseWithdrawType4Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type4/base-withdraw-type4.component";

@Component({
  selector: 'app-withdraw-type4-default',
  templateUrl: './withdraw-type4-default.component.html'
})
export class WithdrawType4DefaultComponent extends BaseWithdrawType4Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
