import {Component, Injector } from '@angular/core';
import {BaseWithdrawType5Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type5/base-withdraw-type5.component";

@Component({
  selector: 'app-withdraw-type5-default',
  templateUrl: './withdraw-type5-default.component.html'
})
export class WithdrawType5DefaultComponent extends BaseWithdrawType5Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
