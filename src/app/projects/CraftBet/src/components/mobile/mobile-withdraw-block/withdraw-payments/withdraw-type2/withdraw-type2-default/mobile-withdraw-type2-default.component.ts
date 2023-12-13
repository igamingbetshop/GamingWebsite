import {Component, Injector, OnInit} from '@angular/core';
import {BaseWithdrawType2Component} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type2/base-withdraw-type2.component";

@Component({
  selector: 'app-mobile-withdraw-type2-default',
  templateUrl: './mobile-withdraw-type2-default.component.html'
})
export class MobileWithdrawType2DefaultComponent extends BaseWithdrawType2Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
