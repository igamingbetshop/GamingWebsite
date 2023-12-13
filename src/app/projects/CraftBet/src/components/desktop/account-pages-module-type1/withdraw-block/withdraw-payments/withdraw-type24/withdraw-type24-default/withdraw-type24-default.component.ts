import {Component, Injector } from '@angular/core';
import {
  BaseWithdrawType24Component
} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type24/base-withdraw-type24.component";

@Component({
  selector: 'app-withdraw-type24-default',
  templateUrl: './withdraw-type24-default.component.html'
})
export class WithdrawType24DefaultComponent extends BaseWithdrawType24Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
