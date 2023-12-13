import {Component, Injector } from '@angular/core';
import {BaseWithdrawType21Component} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type21/base-withdraw-type21.component";

@Component({
  selector: 'app-mobile-withdraw-type21-default',
  templateUrl: './mobile-withdraw-type21-default.component.html'
})
export class MobileWithdrawType21DefaultComponent extends BaseWithdrawType21Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
