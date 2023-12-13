import {Injectable, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseWithdrawType4Component extends BaseWithdrawPaymentComponent {
    public editField = false;
    public MobileNumber: string;
    public userData;

    amountValue: any;
    public CommissionPercent;

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
    }

    submit() {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.MobileNumber = this.paymentForm.get('MobileNumber').value != '' ? this.paymentForm.get('MobileNumber').value : this.MobileNumber;
        if (this.paymentForm.valid) {
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('MobileNumber');
    }
}
