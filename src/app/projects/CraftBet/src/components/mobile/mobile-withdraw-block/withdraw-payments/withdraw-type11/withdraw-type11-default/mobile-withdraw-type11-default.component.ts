import {Component, Injector} from '@angular/core';
import {BaseWithdrawType11Component} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type11/base-withdraw-type11.component";

@Component({
  selector: 'app-mobile-withdraw-type11-default',
  templateUrl: './mobile-withdraw-type11-default.component.html'
})
export class MobileWithdrawType11DefaultComponent extends BaseWithdrawType11Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
