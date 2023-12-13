import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BankAccount} from "@core/models";
import {FormControl, Validators} from "@angular/forms";

@Directive()
export class BaseWithdrawType12Component extends BaseWithdrawPaymentComponent {
    public getPaymentsService: GetPaymentsService;

    public accounts: Array<BankAccount> = [];
    public banks = [];
    public userData;
    public NameSurname: string;
    public showList = false;

    amountValue: any;
    public CommissionPercent;

    public bankNumberFilter: any = {BankAccountNumber: ''};

    public editField = false;

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);
        this.userData = this.localStorageService.get('user');
        this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
    }


    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankName', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('CardNumber', new FormControl('',
            [Validators.pattern(/^[0-9]{16}$/)]));
        this.paymentForm.addControl('BankACH', new FormControl('',
            [Validators.required, Validators.pattern(/^[0-9]{24}$/)]));

        this.paymentForm.addControl('BankAccountHolder', new FormControl({
            value: this.userData.FirstName || this.userData.LastName || ''
        }));

        this.getPaymentsService._notifyGetBanksList.subscribe((data) => {
            if (this.paymentForm.get('BankName')) {
                this.paymentForm.get('BankName').patchValue(data[0].Id);
            }
        });

        this.getPaymentsService.getClientBanks(this.paymentSystemId);

        this.subscriptions.push(this.getPaymentsService.notifyGetClientBanksList$.subscribe((data) => {
            this.banks = data;
            this.paymentForm.get('BankName').patchValue(this.banks[0].BankName);

        }));

        this.showList = false;
    }

    chooseBankAccountNumber(item) {
        this.bankNumberFilter.BankAccountNumber = item.BankAccountNumber;
        this.showList = false;
    }

    reSearch(el?) {
        this.showList = true;
    }

    selectBank(bankName) {
        this.accounts = this.banks.find(bank => bank.BankName == bankName)['Accounts'];
    }

    submit(data) {
        const requestData = this.paymentForm.getRawValue();
        this.paymentForm.get('BankAccountNumber').patchValue(this.bankNumberFilter.BankAccountNumber);
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.BankAccountHolder = this.paymentForm.get('BankAccountHolder').value != '' ? this.paymentForm.get('BankAccountHolder').value : this.NameSurname;
        requestData.BankAccountNumber = this.bankNumberFilter.BankAccountNumber;

        if (this.paymentForm.valid) {
            requestData.BankACH = 'IR' + this.paymentForm.get('BankACH').value;
            this.createPayment(requestData);
            this.bankNumberFilter.BankAccountNumber = '';

        } else this.markFormGroupTouched(this.paymentForm);
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('BankName');
        this.paymentForm.removeControl('BankAccountNumber');
        this.paymentForm.removeControl('BankAccountHolder');
        this.paymentForm.removeControl('CardNumber');
        this.paymentForm.removeControl('BankACH');
    }

}
