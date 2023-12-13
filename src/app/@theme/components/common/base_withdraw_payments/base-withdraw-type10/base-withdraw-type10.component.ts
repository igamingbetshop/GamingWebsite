import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BankAccount} from "@core/models";

@Directive()
export class BaseWithdrawType10Component extends BaseWithdrawPaymentComponent {
    public getPaymentsService: GetPaymentsService;

    public accounts: Array<BankAccount> = [];
    public banks = [];
    public userData;
    public NameSurname: string;
    public showList = false;

    amountValue: any;
    public CommissionPercent;

    public bankNumberFilter: any = {BankAccountNumber: ''};

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);
        this.userData = this.localStorageService.get('user');
        this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
    }


    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankId', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('CardNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankAccountHolder', new FormControl({
            value: this.userData.FirstName || this.userData.LastName || '',
            disabled: true
        }));

        this.getPaymentsService._notifyGetBanksList.subscribe((data) => {
            if (this.paymentForm.get('BankId')) {
                this.paymentForm.get('BankId').patchValue(data[0].Id);
            }
        });

        this.getPaymentsService.getClientBanks(this.paymentSystemId);

        this.subscriptions.push(this.getPaymentsService.notifyGetClientBanksList$.subscribe((data) => {
            this.banks = data;
            this.paymentForm.get('BankId').patchValue(this.banks[0].BankId);
        }));

        this.showList = false;
    }


    chooseBankAccountNumber(item) {
        this.bankNumberFilter.BankAccountNumber = item.BankAccountNumber = item.BankAccountNumber;
        this.showList = false;
    }

    reSearch(el?) {
        this.showList = true;
    }

    selectBank(bankId) {

        if (!bankId) {
            bankId = this.banks[0].Branches[0].Id;
        }
        this.accounts = this.banks.find(bank => bank.Branches[0].Id == bankId)?.['Accounts'];
    }

    submit(data) {
        const requestData = this.paymentForm.getRawValue();

        this.paymentForm.get('BankAccountNumber').patchValue(this.bankNumberFilter.BankAccountNumber);

        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.BankAccountHolder = this.NameSurname;
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
        this.paymentForm.removeControl('BankAccountHolder');
        this.paymentForm.removeControl('CardNumber');
    }


}
