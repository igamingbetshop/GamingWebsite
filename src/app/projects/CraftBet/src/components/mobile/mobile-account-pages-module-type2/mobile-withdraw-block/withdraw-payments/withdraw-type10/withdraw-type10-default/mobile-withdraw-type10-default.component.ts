import {Component, Injector} from '@angular/core';
import {BaseWithdrawType10Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type10/base-withdraw-type10.component";

@Component({
  selector: 'app-mobile-withdraw-type10-default',
  templateUrl: './mobile-withdraw-type10-default.component.html'
})
export class MobileWithdrawType10DefaultComponent extends BaseWithdrawType10Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
