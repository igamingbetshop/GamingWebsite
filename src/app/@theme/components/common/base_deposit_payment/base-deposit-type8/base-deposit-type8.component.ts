import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType8Component extends BaseDepositPaymentComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('NationalId', new FormControl('', [Validators.required]));
  }


  submit() {
    if (this.paymentForm.valid) {
      if (JSON.stringify(this.paymentForm.get('Amount').value).includes('.')) {
        const valueAmount = JSON.stringify(this.paymentForm.get('Amount').value).split('.').join("");
        this.paymentForm.get('Amount').patchValue(JSON.parse(valueAmount));
      }

      const requestData = this.paymentForm.getRawValue();
      requestData.paymentType = 'deposit';
      requestData.PaymentSystemId = this.paymentSystemId;
      this.createPayment(requestData);
    } else this.markFormGroupTouched(this.paymentForm);
  }


  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('NationalId');
  }

}
