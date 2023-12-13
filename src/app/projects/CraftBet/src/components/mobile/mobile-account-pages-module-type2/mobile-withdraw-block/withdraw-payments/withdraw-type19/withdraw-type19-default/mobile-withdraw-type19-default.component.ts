import {Component, Injector } from '@angular/core';
import {BaseWithdrawType19Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type19/base-withdraw-type19.component";

@Component({
  selector: 'app-mobile-withdraw-type19-default',
  templateUrl: './mobile-withdraw-type19-default.component.html'
})
export class MobileWithdrawType19DefaultComponent extends BaseWithdrawType19Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
