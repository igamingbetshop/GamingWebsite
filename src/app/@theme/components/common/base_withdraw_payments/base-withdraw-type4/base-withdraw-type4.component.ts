import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";

@Directive()
export class BaseWithdrawType4Component extends BaseWithdrawPaymentComponent {
    public editField = false;
    public MobileNumber: string;
    public userData;
    mobileCodes:any[] = [];

    amountValue: any;
    public CommissionPercent;

    constructor(public injector: Injector) {
        super(injector);
        this.userData = this.localStorageService.get('user');
        this.MobileNumber = this.userData.MobileNumber;
    }

    ngOnInit() {
        super.ngOnInit();
        this.mobileCodes = this.configService.defaultOptions['MobileCodes'];
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('MobileNumber', new FormControl(this.userData.MobileNumber || ""));
        if(this.paymentSystemId === 385)
        {
            this.paymentForm.addControl('MobileCode', new FormControl('', [Validators.required]));
        }
    }

    submit()
    {
        if (this.paymentForm.valid)
        {
            const requestData = this.paymentForm.getRawValue();
            requestData.paymentType = 'withdraw';
            requestData.PaymentSystemId = this.paymentSystemId;
            requestData.MobileNumber = this.paymentForm.get('MobileNumber').value != '' ? this.paymentForm.get('MobileNumber').value : this.MobileNumber;
            if(requestData.MobileCode)
                requestData.MobileNumber = requestData.MobileCode + requestData.MobileNumber;
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('MobileNumber');
        this.paymentForm.removeControl('MobileCode');
    }
}
