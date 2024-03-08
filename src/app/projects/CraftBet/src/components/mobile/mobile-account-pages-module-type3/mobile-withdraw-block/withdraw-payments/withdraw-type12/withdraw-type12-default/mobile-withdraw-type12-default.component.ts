import {Component, Injector} from '@angular/core';
import {BaseWithdrawType12Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type12/base-withdraw-type12.component";

@Component({
  selector: 'app-mobile-withdraw-type12-default',
  templateUrl: './mobile-withdraw-type12-default.component.html',
})
export class MobileWithdrawType12DefaultComponent extends BaseWithdrawType12Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
