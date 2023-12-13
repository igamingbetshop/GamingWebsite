import {Injectable, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class BaseWithdrawType18Component extends BaseWithdrawPaymentComponent {
    public getPaymentsService: GetPaymentsService;

    public accounts: Array<any> = [];
    public banks = [];
    public userData;
    public bankType: any;
    public CommissionPercent;
    public showList = false;

    public bankNumberFilter: any = {BankAccountNumber: ''};

    public editField = false;

    amountValue: any;

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);
        this.userData = this.localStorageService.get('user');
    }


    ngOnInit()
    {
        super.ngOnInit();
        this.getPaymentsService.getPaymentAccountTypes();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('NationalId', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankId', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankBranchName', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankIBAN', new FormControl('', [Validators.required]));

        this.getPaymentsService.getClientBanks(this.paymentSystemId);

        this.subscriptions.push(this.getPaymentsService.notifyGetClientBanksList$.subscribe((data) => {
            this.banks = data;
            this.paymentForm.get('BankId').patchValue(this.banks[0].Branches[0].Id);
        }));
        this.showList = false;
    }

    chooseBankAccountNumber(item)
    {
        this.bankNumberFilter.BankAccountNumber = item.BankAccountNumber;
        this.showList = false;
    }

    reSearch(elem)
    {
        this.paymentForm.get('BankAccountNumber').patchValue(elem);
        this.showList = true;
    }


    selectBank(bankId)
    {
        this.bankType = bankId;
        this.accounts = this.banks.find(bank => bank.Branches[0].Id == bankId)['Accounts'];
    }


    selectAccountType(type)
    {
        let filterByBankName = this.banks.find(bank => bank.Branches[0].Id == this.bankType) != undefined ? this.banks.find(bank => bank.Id == this.bankType)['Accounts'] : [];
        this.accounts = filterByBankName.filter((item) => item.Type == type);
    }

    submit(data)
    {
        if (this.paymentForm.get('Amount').value.includes('.')) {
            let valueAmount = this.paymentForm.get('Amount').value.split('.').join("");
            this.paymentForm.get('Amount').patchValue(valueAmount);
        }

        const requestData = this.paymentForm.getRawValue();
        this.paymentForm.get('BankAccountNumber').patchValue(this.bankNumberFilter.BankAccountNumber);
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.BankAccountNumber = this.bankNumberFilter.BankAccountNumber;

        if (this.paymentForm.valid) {
            this.createPayment(requestData);
            this.bankNumberFilter.BankAccountNumber = '';

        } else this.markFormGroupTouched(this.paymentForm);
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('BankId');
        this.paymentForm.removeControl('BankAccountNumber');
        this.paymentForm.removeControl('NationalId');
        this.paymentForm.removeControl('BankBranchName');
        this.paymentForm.removeControl('BankIBAN');
    }


}
