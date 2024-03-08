import {Component, Injector} from '@angular/core';
import {BaseWithdrawType15Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type15/base-withdraw-type15.component";

@Component({
  selector: 'app-mobile-withdraw-type15-default',
  templateUrl: './mobile-withdraw-type15-default.component.html'
})
export class MobileWithdrawType15DefaultComponent extends BaseWithdrawType15Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
