import {Directive, Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Directive()
export class BaseDepositType10Component extends BaseDepositPaymentComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.removeControl("Amount");
    this.paymentForm.addControl('VoucherNumber', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('ActivationCode', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('ExpirationDate', new FormControl('', [Validators.required]));
  }


  submit() {
    if (this.paymentForm.valid)
    {
      const requestData = this.paymentForm.getRawValue();
      requestData.paymentType = 'deposit';
      requestData.PaymentSystemId = this.paymentSystemId;
      requestData.ExpirationDate = requestData.ExpirationDate.substr(0, 2) + '/' + requestData.ExpirationDate.substr(2);
      this.createPayment(requestData);
    }
    else this.markFormGroupTouched(this.paymentForm);
  }


  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('VoucherNumber');
    this.paymentForm.removeControl('ActivationCode');
    this.paymentForm.removeControl('ExpirationDate');
  }


}
