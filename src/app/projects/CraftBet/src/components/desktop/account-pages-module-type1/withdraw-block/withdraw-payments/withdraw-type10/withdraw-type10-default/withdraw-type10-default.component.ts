import {Component, Injector} from '@angular/core';
import {BaseWithdrawType10Component} from '../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type10/base-withdraw-type10.component';

@Component({
  selector: 'app-withdraw-type10-default',
  templateUrl: './withdraw-type10-default.component.html'
})
export class WithdrawType10DefaultComponent extends BaseWithdrawType10Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
