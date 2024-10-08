import {Injectable, Injector, OnDestroy, OnInit} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType15Component extends BaseDepositPaymentComponent implements OnInit, OnDestroy{
  public date = new Date();
  public settings = {
    bigBanner: false,
    format: 'MM/YYYY z',
    defaultOpen: false,
    timePicker: true,
    closeOnSelect: true,
    cal_days_labels: [],
    cal_full_days_lables: [],
    cal_months_labels: [],
    cal_months_labels_short: []
  };

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('BankName', new FormControl('0000', [Validators.required]));
    this.paymentForm.addControl('CardNumber', new FormControl('', [Validators.pattern(/^[0-9]{16}$/)]));
    this.paymentForm.addControl('ActivationCode', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('ExpirationDate', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('Amount', new FormControl(this.quickDepositAmount, [Validators.required]));
  }

  submit() {
    if (this.paymentForm.valid) {
      const requestData = this.paymentForm.getRawValue();
      requestData.paymentType = 'deposit';
      requestData.PaymentSystemId = this.paymentSystemId;
      requestData.ExpirationDate = requestData.ExpirationDate.substr(0, 2) + '/' + requestData.ExpirationDate.substr(2);
      this.createPayment(requestData);
    } else this.markFormGroupTouched(this.paymentForm);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('BankName');
    this.paymentForm.removeControl('CardNumber');
    this.paymentForm.removeControl('ActivationCode');
    this.paymentForm.removeControl('ExpirationDate');
    this.paymentForm.removeControl('Amount');
  }

}
