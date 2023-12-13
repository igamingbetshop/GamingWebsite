import {Component, Injector } from '@angular/core';
import {BaseWithdrawType4Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type4/base-withdraw-type4.component";

@Component({
  selector: 'app-mobile-withdraw-type4-default',
  templateUrl: './mobile-withdraw-type4-default.component.html'
})
export class MobileWithdrawType4DefaultComponent extends BaseWithdrawType4Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
