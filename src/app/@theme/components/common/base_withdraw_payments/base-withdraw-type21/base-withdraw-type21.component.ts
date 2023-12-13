import {Directive,Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {Validator} from "@core/validators/validators";

@Directive()
export class BaseWithdrawType21Component extends BaseWithdrawPaymentComponent {

    public amountValue: any;
    public CommissionPercent;
    public userData;

    constructor(public injector: Injector)
    {
        super(injector);
        this.userData = this.localStorageService.get('user');
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('MobileNumber', new FormControl( this.userData.MobileNumber || '', [Validators.required]));
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
        this.paymentForm.removeControl('MobileNumber');
    }

}
