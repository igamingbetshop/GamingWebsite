import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {FormControl, Validators} from "@angular/forms";

@Directive()
export class BaseWithdrawType15Component extends BaseWithdrawPaymentComponent {
    public getPaymentsService: GetPaymentsService;

    public banks = [];

    constructor(public injector: Injector)
    {
        super(injector);
        this.getPaymentsService = injector.get(GetPaymentsService);
    }


    ngOnInit()
    {
        super.ngOnInit();
        this.getPaymentsService.getPaymentAccountTypes(this.paymentSystemId);

        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankAccountHolder', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankId', new FormControl('', [Validators.required]));

        this.getPaymentsService.getClientBanks(this.paymentSystemId);

        this.subscriptions.push(this.getPaymentsService.notifyGetClientBanksList$.subscribe((data) => {
            this.banks = data;
            this.paymentForm.get('BankId').patchValue(this.banks[0]?.Branches[0]?.Id);
        }));
    }


    submit(data)
    {
        if (this.paymentForm.get('Amount').value.includes('.')) {
            let valueAmount = this.paymentForm.get('Amount').value.split('.').join("");
            this.paymentForm.get('Amount').patchValue(valueAmount);
        }

        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;

        if (this.paymentForm.valid)
        {
            this.createPayment(requestData);
        }
        else this.markFormGroupTouched(this.paymentForm);
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('BankAccountNumber');
        this.paymentForm.removeControl('BankAccountHolder');
        this.paymentForm.removeControl('BankId');
    }


}
