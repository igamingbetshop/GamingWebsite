import {Directive,Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from "@core/services/app/getPayments.service";

@Directive()
export class BaseWithdrawType24Component extends BaseWithdrawPaymentComponent {

    amountValue: any;
    CommissionPercent;
    userData;
    banks = [];
    protected getPaymentsService: GetPaymentsService;

    constructor(public injector: Injector)
    {
        super(injector);
        this.userData = this.localStorageService.get('user');
        this.getPaymentsService = injector.get(GetPaymentsService);
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('AccountNumber', new FormControl( '', [Validators.required]));
        this.paymentForm.addControl('MobileNumber', new FormControl( '', [Validators.required]));
        this.paymentForm.addControl('DocumentId', new FormControl( '', [Validators.required]));
        this.paymentForm.addControl('BankBranchName', new FormControl( '', [Validators.required]));
        this.paymentForm.addControl('BeneficiaryName', new FormControl( '', [Validators.required]));
        this.paymentForm.addControl('BankAccountNumber', new FormControl( '', [Validators.required]));
        this.getPaymentsService.getClientBanks(this.paymentSystemId);
        this.subscriptions.push(this.getPaymentsService.notifyGetClientBanksList$.subscribe((data) => {
            this.banks = data;
            //this.paymentForm.get('BankId').patchValue(this.banks[0].BankId);
            if(this.banks.length)
            {
                this.paymentForm.removeControl('BankBranchName');
                this.paymentForm.addControl('BankId', new FormControl( '', [Validators.required]));
            }
        }));
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
        this.paymentForm.removeControl('AccountNumber');
        this.paymentForm.removeControl('MobileNumber');
        this.paymentForm.removeControl('DocumentId');
        this.paymentForm.removeControl('BankBranchName');
        this.paymentForm.removeControl('BeneficiaryName');
        this.paymentForm.removeControl('BankAccountNumber');
        this.paymentForm.removeControl('BankId');
    }

}
