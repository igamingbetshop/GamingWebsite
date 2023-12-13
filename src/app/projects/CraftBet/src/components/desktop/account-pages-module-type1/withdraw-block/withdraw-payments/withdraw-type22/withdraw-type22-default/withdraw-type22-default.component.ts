import {Component, Injector } from '@angular/core';
import {
  BaseWithdrawType22Component
} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type22/base-withdraw-type22.component";

@Component({
  selector: 'app-withdraw-type22-default',
  templateUrl: './withdraw-type22-default.component.html'
})
export class WithdrawType22DefaultComponent extends BaseWithdrawType22Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
