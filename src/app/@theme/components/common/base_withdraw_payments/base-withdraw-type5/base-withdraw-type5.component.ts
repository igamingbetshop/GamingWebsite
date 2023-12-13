import {Component, Injectable, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseWithdrawType5Component extends BaseWithdrawPaymentComponent {

    amountValue: any;
    public CommissionPercent;

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('CardNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('ExpirationDate', new FormControl('', [Validators.required]));

    }

    submit() {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.ExpirationDate = requestData.ExpirationDate.substr(0, 2) + "/" + requestData.ExpirationDate.substr(2);
        if (this.paymentForm.valid) {
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('CardNumber');
        this.paymentForm.removeControl('ExpirationDate');
    }
}
