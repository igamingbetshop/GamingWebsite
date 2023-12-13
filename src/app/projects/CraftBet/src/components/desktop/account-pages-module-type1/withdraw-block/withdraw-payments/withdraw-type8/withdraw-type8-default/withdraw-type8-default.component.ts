import {Component, Injector } from '@angular/core';
import {BaseWithdrawType8Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type8/base-withdraw-type8.component";

@Component({
  selector: 'app-withdraw-type8-default',
  templateUrl: './withdraw-type8-default.component.html'
})
export class WithdrawType8DefaultComponent extends BaseWithdrawType8Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  navigateToAddBank() {
    this.router.navigate(
        ['/user/1/bankAccounts'],
        { queryParams: { openBankAccounts: true } }
    );
  }

}
