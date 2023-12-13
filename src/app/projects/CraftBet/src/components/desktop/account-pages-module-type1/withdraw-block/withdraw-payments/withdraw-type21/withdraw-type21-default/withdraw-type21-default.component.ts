import {Component, Injector } from '@angular/core';
import {BaseWithdrawType21Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type21/base-withdraw-type21.component";

@Component({
  selector: 'app-withdraw-type21-default',
  templateUrl: './withdraw-type21-default.component.html'
})
export class WithdrawType21DefaultComponent extends BaseWithdrawType21Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
