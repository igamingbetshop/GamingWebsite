import {Component, Injector } from '@angular/core';
import {BaseWithdrawType8Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type8/base-withdraw-type8.component";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-mobile-withdraw-type8-default',
  templateUrl: './mobile-withdraw-type8-default.component.html'
})
export class MobileWithdrawType8DefaultComponent extends BaseWithdrawType8Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('SwiftCode', new FormControl('', [Validators.required]));
  }

  ngOnDestroy()
  {
    super.ngOnDestroy();
    this.paymentForm.removeControl('SwiftCode');
  }

}
