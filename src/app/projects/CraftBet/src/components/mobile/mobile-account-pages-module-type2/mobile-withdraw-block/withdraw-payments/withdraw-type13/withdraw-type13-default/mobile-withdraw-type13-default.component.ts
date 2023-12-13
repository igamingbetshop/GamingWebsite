import {Component, Injector } from '@angular/core';
import {BaseWithdrawType13Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type13/base-withdraw-type13.component";

@Component({
  selector: 'app-mobile-withdraw-type13-default',
  templateUrl: './mobile-withdraw-type13-default.component.html',
})
export class MobileWithdrawType13DefaultComponent extends BaseWithdrawType13Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
