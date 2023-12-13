import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType3Component extends BaseDepositPaymentComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('Info', new FormControl('', [Validators.required]));
  }

  submit() {
    if (this.paymentForm.valid) {
      const requestData = this.paymentForm.getRawValue();
      requestData.paymentType = 'deposit';
      requestData.PaymentSystemId = this.paymentSystemId;
      this.createPayment(requestData);
    }
    else this.markFormGroupTouched(this.paymentForm);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('Info');
  }

}
