import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Directive()
export class BaseWithdrawType1Component extends BaseWithdrawPaymentComponent {

  public amountValue: any;
  public CommissionPercent;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
  }

  submit() {
    const requestData = this.paymentForm.getRawValue();
    requestData.paymentType = 'withdraw';
    requestData.PaymentSystemId = this.paymentSystemId;
    if (this.paymentForm.valid) {
      this.createPayment(requestData);
    }
    else this.markFormGroupTouched(this.paymentForm);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
  }

}
