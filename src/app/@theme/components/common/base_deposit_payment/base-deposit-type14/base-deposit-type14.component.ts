import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType14Component extends BaseDepositPaymentComponent {

  public errorMessage: string;
  public successMessage: string;
  public userData;

  constructor(public injector: Injector) {
    super(injector);

    this.userData = this.localStorageService.get('user');
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('WalletNumber', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('Info', new FormControl('', [Validators.required]));

    this.paymentControllerService.notifyGetCreatePaymentData.subscribe((data) => {

    });
  }


  submit()
  {
    const requestData = this.paymentForm.getRawValue();
    requestData.paymentType = 'deposit';
    requestData.PaymentSystemId = this.paymentSystemId;
    if (this.paymentForm.valid)
    {
      requestData.Info = btoa(requestData.Info);
      this.createPayment(requestData);
    } else this.markFormGroupTouched(this.paymentForm);
  }


  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('WalletNumber');
    this.paymentForm.removeControl('Info');
  }

}
