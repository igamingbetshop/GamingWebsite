import {Component, Injector} from '@angular/core';
import {BaseWithdrawType14Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type14/base-withdraw-type14.component";

@Component({
  selector: 'app-withdraw-type14-default',
  templateUrl: './withdraw-type14-default.component.html'
})
export class WithdrawType14DefaultComponent extends BaseWithdrawType14Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
