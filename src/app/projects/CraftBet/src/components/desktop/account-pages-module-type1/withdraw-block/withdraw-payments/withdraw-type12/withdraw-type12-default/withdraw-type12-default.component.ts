import {Component, Injector, OnInit} from '@angular/core';
import {BaseWithdrawType12Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type12/base-withdraw-type12.component";

@Component({
  selector: 'app-withdraw-type12-default',
  templateUrl: './withdraw-type12-default.component.html',
})
export class WithdrawType12DefaultComponent extends BaseWithdrawType12Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
