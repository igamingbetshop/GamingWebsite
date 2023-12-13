import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType7Component extends BaseDepositPaymentComponent {

  public editField = false;
  public MobileNumber: string;
  public userData;

  constructor(public injector: Injector) {
    super(injector);

    this.userData = this.localStorageService.get('user');
    this.MobileNumber = this.userData.MobileNumber;
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('MobileNumber', new FormControl({
      value: this.userData.MobileNumber || ''
    }));

    this.paymentControllerService.notifyGetCreatePaymentData.subscribe((data) => {
      // this.popupCenter('', '', screen.width * 0.5, screen.height * 0.5);
      // this.openedWindow.location.href = data['Url'];
    });
  }


  submit() {
    if (this.paymentForm.valid) {
      const requestData = this.paymentForm.getRawValue();
      requestData.paymentType = 'deposit';
      requestData.PaymentSystemId = this.paymentSystemId;
      requestData.MobileNumber = this.paymentForm.get('MobileNumber').value != '' ? this.paymentForm.get('MobileNumber').value : this.MobileNumber;
      this.createPayment(requestData);
    }
    else this.markFormGroupTouched(this.paymentForm);
  }


  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('MobileNumber');
  }

}
