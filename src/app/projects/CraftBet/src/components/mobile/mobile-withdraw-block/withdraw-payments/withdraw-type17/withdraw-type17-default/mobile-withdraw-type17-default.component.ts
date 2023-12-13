import {Component, Injector} from '@angular/core';
import {BaseWithdrawType17Component} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type17/base-withdraw-type17.component";

@Component({
  selector: 'app-mobile-withdraw-type17-default',
  templateUrl: './mobile-withdraw-type17-default.component.html'
})
export class MobileWithdrawType17DefaultComponent extends BaseWithdrawType17Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
