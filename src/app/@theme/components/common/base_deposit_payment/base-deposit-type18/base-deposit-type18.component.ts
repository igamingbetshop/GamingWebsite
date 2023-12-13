import {Directive, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {take} from "rxjs";

@Directive()
export class BaseDepositType18Component extends BaseDepositPaymentComponent {

    public wallets:any[] = [];

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('WalletNumber', new FormControl('', [Validators.required]));
        this.paymentControllerService.getClientWallets(this.paymentSystemId).pipe(take(1)).subscribe(data => {
            if(data.ResponseCode === 0)
            {
                this.wallets = data.ResponseObject;
            }
        });
    }


    submit()
    {
        if (this.paymentForm.valid)
        {
            const requestData = this.paymentForm.getRawValue();
            requestData.paymentType = 'deposit';
            requestData.PaymentSystemId = this.paymentSystemId;
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    selectWallet(wallet)
    {
        this.paymentForm.get('WalletNumber').setValue(wallet.NickName);
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('WalletNumber');
    }

    onInputClick(element, event)
    {
        if(element.parentElement.classList.contains('opened'))
        {
            event.stopPropagation();
        }
    }

}
