import {Directive,Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {take} from "rxjs";

@Directive()
export class BaseWithdrawType26Component extends BaseWithdrawPaymentComponent {

    public amountValue: any;
    public CommissionPercent;
    public userData;
    public wallets:any[] = [];

    constructor(public injector: Injector)
    {
        super(injector);
        this.userData = this.localStorageService.get('user');
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('WalletNumber', new FormControl( null, [Validators.required]));
        this.paymentControllerService.getClientWallets(this.paymentSystemId).pipe(take(1)).subscribe(data =>
        {
            if(data.ResponseCode === 0)
            {
                this.wallets = data.ResponseObject;
            }
        });
    }

    submit()
    {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        if (this.paymentForm.valid) {
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy()
    {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('WalletNumber');
    }

}
