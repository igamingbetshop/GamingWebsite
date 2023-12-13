import {Component, Injector} from '@angular/core';
import {BaseWithdrawType13Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type13/base-withdraw-type13.component";

@Component({
  selector: 'app-withdraw-type13-default',
  templateUrl: './withdraw-type13-default.component.html'
})
export class WithdrawType13DefaultComponent extends BaseWithdrawType13Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
