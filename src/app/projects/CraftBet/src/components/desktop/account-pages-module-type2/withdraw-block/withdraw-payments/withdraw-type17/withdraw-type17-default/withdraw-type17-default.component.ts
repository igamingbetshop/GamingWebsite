import {Component, Injector} from '@angular/core';
import {BaseWithdrawType17Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type17/base-withdraw-type17.component";

@Component({
  selector: 'app-withdraw-type17-default',
  templateUrl: './withdraw-type17-default.component.html'
})
export class WithdrawType17DefaultComponent extends BaseWithdrawType17Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
