import {Component, Injector, OnInit} from '@angular/core';
import {BaseWithdrawType11Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type11/base-withdraw-type11.component";

@Component({
  selector: 'app-withdraw-type11-default',
  templateUrl: './withdraw-type11-default.component.html',
  styleUrls: ['./withdraw-type11-default.component.scss']
})
export class WithdrawType11DefaultComponent extends BaseWithdrawType11Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
