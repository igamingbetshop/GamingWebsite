import {Component, Injector, OnInit} from '@angular/core';
import {BaseWithdrawType3Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type3/base-withdraw-type3.component";

@Component({
  selector: 'app-withdraw-type3-default',
  templateUrl: './withdraw-type3-default.component.html'
})
export class WithdrawType3DefaultComponent extends BaseWithdrawType3Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
