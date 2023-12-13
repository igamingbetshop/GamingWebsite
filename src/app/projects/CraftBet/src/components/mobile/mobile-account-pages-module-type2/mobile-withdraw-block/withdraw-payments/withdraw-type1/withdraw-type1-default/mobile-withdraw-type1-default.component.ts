import {Component, Injector } from '@angular/core';
import {BaseWithdrawType1Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type1/base-withdraw-type1.component";

@Component({
  selector: 'app-mobile-withdraw-type1-default',
  templateUrl: './mobile-withdraw-type1-default.component.html'
})
export class MobileWithdrawType1DefaultComponent extends BaseWithdrawType1Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
