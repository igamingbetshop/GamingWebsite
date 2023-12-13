import {Directive, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {Bank} from "@core/interfaces";

@Directive()
export class BaseDepositType13Component extends BaseDepositPaymentComponent {

    banks:Bank[] = [];
    selectedBank:Bank;
    userData;
    NameSurname: string;

    constructor(public injector: Injector) {
        super(injector);
        this.userData = this.localStorageService.get('user');
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankId', new FormControl('', [Validators.required]));2
        this.paymentControllerService.getBanksList(this.paymentSystemId);
        this.subscriptions.push(this.paymentControllerService.notifyGetPaymentBanksList.subscribe((data) => {
            this.banks = data;
            this.paymentForm.get('BankId').patchValue(this.banks[0].Id);
        }));

        this.subscriptions.push(this.paymentForm.get('BankId').valueChanges.subscribe(bankId => {
            this.selectedBank = this.banks.find(b => b.Id == bankId);
        }));
        this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
    }


    submit() {
        if (this.paymentForm.valid) {
            const requestData = this.paymentForm.getRawValue();
            requestData.paymentType = 'deposit';
            requestData.PaymentSystemId = this.paymentSystemId;
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('BankId');
    }

}
