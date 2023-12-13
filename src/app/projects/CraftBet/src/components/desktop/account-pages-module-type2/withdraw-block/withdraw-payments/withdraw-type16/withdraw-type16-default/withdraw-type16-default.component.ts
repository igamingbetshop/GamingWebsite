import {Component, Injector} from '@angular/core';
import {BaseWithdrawType16Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type16/base-withdraw-type16.component";

@Component({
  selector: 'app-withdraw-type16-default',
  templateUrl: './withdraw-type16-default.component.html'
})
export class WithdrawType16DefaultComponent extends BaseWithdrawType16Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
