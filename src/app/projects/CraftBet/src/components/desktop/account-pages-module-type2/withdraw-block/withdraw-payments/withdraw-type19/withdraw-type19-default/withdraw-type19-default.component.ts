import {Component, Injector } from '@angular/core';
import {BaseWithdrawType19Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type19/base-withdraw-type19.component";

@Component({
  selector: 'app-withdraw-type19-default',
  templateUrl: './withdraw-type19-default.component.html'
})
export class WithdrawType19DefaultComponent extends BaseWithdrawType19Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
