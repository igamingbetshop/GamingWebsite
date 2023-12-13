import {Component, Injectable, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {Validator} from "@core/validators/validators";

@Injectable()
export class BaseWithdrawType7Component extends BaseWithdrawPaymentComponent {

    public amountValue: any;
    public CommissionPercent;

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('Email', new FormControl('', [Validators.required, Validator.noWhitespaceValidator, Validators.email]));
    }

    submit() {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        if (this.paymentForm.valid) {
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('Email');
    }

}
