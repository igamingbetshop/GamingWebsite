import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType6Component extends BaseDepositPaymentComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('CardNumber', new FormControl('', [Validators.required]));

    this.paymentControllerService.notifyGetCreatePaymentData.subscribe((data) => {
      this.popupCenter('', '', screen.width * 0.5, screen.height * 0.5);
      this.openedWindow.location.href = data['Url'];
    });
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
    this.paymentForm.removeControl('CardNumber');
  }

}
