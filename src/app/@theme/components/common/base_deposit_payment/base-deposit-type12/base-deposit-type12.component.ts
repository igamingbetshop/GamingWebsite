import {Injectable, Injector, OnInit} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseDepositType12Component extends BaseDepositPaymentComponent {

    public list = [{"Name": "Etherium", "AccountType": 1}, {"Name": "USDT (ERC20)", "AccountType": 2}];

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl(this.quickDepositAmount, [Validators.required]));
        this.paymentForm.addControl('AccountType', new FormControl('', [Validators.required]));
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
        this.paymentForm.removeControl('AccountType');
    }

}
