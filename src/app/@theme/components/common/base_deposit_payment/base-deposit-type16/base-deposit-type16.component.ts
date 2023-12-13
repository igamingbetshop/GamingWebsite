import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType16Component extends BaseDepositPaymentComponent {

  public errorMessage: string;
  public successMessage: string;
  public accountTypes:any[] = [];

  constructor(public injector: Injector)
  {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentService.notifyGetBanksList$.subscribe(data => {
      this.accountTypes = data.map(b => {
        return {BankName:b.BankName, BankCode:b.BankCode}
      });
    });
    this.paymentService.getBanks(this.paymentSystemId);
    this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('AccountType', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('BankName', new FormControl('', ));
    this.paymentForm.get('AccountType').valueChanges.subscribe(data => {
      const bankName = this.accountTypes.find(a => a.BankCode == data)?.BankName;
      this.paymentForm.get('BankName').setValue(bankName);
    });
  }


  submit()
  {
    const requestData = this.paymentForm.getRawValue();
    requestData.paymentType = 'deposit';
    requestData.PaymentSystemId = this.paymentSystemId;
    if (this.paymentForm.valid)
    {
      this.createPayment(requestData);
    } else this.markFormGroupTouched(this.paymentForm);
  }


  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('AccountType');
    this.paymentForm.removeControl('BankName');
  }

}
