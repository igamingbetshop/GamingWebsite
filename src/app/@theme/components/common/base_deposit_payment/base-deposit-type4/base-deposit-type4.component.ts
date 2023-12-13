import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType4Component extends BaseDepositPaymentComponent {

  public showAmountFields: boolean;
  private currentMobileNumber: string;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('MobileNumber', new FormControl('', [Validators.required]));

    this.subscriptions.push(this.paymentControllerService.notifyGetSmsCodeError.subscribe((responseData) => {
      this.errorMessage = responseData;
    }));

    this.subscriptions.push(this.paymentControllerService.notifyGetSmsCode.subscribe((responseData) => {
      this.showAmountFields = true;
      this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
      this.paymentForm.addControl('SMSCode', new FormControl('', [Validators.required]));
      this.paymentForm.removeControl('MobileNumber');

    }));
  }

  submit() {
    if (this.paymentForm.valid) {
      if (this.showAmountFields) {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'deposit';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.MobileNumber = this.currentMobileNumber;
        this.createPayment(requestData);
      } else {
        this.currentMobileNumber = '+7' + this.paymentForm.get('MobileNumber').value;
        this.paymentControllerService.getSmsCode(this.currentMobileNumber);
      }
    }
    else this.markFormGroupTouched(this.paymentForm);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('MobileNumber');
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('SMSCode');
  }

}
