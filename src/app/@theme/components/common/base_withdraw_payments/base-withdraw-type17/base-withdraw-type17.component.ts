import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {FormControl, Validators} from "@angular/forms";

@Directive()
export class BaseWithdrawType17Component extends BaseWithdrawPaymentComponent {
    public getPaymentsService: GetPaymentsService;

    public banks = [];

    public accountTypes = [{Name:'Cuenta Corriente', Id:0}, {Name:'Cuenta Ahorro', Id:1}]
    public documentTypes = [{Name:'DNI', Id:1}, {Name:'PAS', Id:2},  {Name:'CE', Id:3}, {Name:'RUC', Id:4}]

    constructor(public injector: Injector)
    {
        super(injector);
        this.getPaymentsService = injector.get(GetPaymentsService);
    }


    ngOnInit()
    {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankId', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('AccountType', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('TypeDocumentId', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('NationalId', new FormControl('', [Validators.required]));

        this.getPaymentsService.getClientBanks(this.paymentSystemId);

        this.subscriptions.push(this.getPaymentsService.notifyGetClientBanksList$.subscribe((data) => {
            this.banks = data;
            this.paymentForm.get('BankId').patchValue(this.banks[0].Id);
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
        this.paymentForm.removeControl('TypeDocumentId');
        this.paymentForm.removeControl('BankId');
        this.paymentForm.removeControl('AccountType');
        this.paymentForm.removeControl('NationalId');
    }


}
