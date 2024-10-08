import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType5Component extends BaseDepositPaymentComponent {

  public bankList: Array<any> = [];
  public showBankName: boolean;
  public currentBankName: any;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl(this.quickDepositAmount, [Validators.required]));
    this.paymentForm.addControl('BankId', new FormControl('', [Validators.required]));

    this.paymentControllerService.getBanksList(this.paymentSystemId);

    this.subscriptions.push(this.paymentControllerService.notifyGetPaymentBanksList.subscribe((responseData) => {
      this.bankList = responseData;
      const defaultBank = this.bankList[0];
      this.paymentForm.get('BankId').patchValue(defaultBank.Id);
      this.currentBankName = this.bankList[0];
    }));

  }

  openBankList() {
    this.showBankName = !this.showBankName;
  }

  changeBank(type) {
    this.bankList.map((data) => {
      if (data.Id === type) {
        this.currentBankName = data;
      }
    });

    this.paymentForm.get('BankId').patchValue(type);
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
    this.paymentForm.removeControl('BankId');
  }

}
