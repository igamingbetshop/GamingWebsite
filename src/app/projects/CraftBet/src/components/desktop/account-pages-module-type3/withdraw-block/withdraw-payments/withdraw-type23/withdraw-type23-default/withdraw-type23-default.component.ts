import {Component, Injector } from '@angular/core';
import {
  BaseWithdrawType23Component
} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type23/base-withdraw-type23.component";

@Component({
  selector: 'app-withdraw-type22-default',
  templateUrl: './withdraw-type23-default.component.html'
})
export class WithdrawType23DefaultComponent extends BaseWithdrawType23Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
