import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from '../../../../../@core/services/app/getPayments.service';
import {GroupByPipe} from "../../../../pipes";
import {BankAccount} from "@core/models";


@Directive()
export class BaseWithdrawType11Component extends BaseWithdrawPaymentComponent {

    public getPaymentsService: GetPaymentsService;
    public accounts: Array<BankAccount> = [];
    public banks = [];
    public userData;
    public NameSurname: string;

    public accountBanks = [];

    public showList = false;
    public bankNumberFilter: any = {BankAccountNumber: ''};

    amountValue: any;
    public CommissionPercent;

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
        this.paymentForm.addControl('BankACH', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('CardNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('NameSurname', new FormControl({
            value: this.userData.FirstName || this.userData.LastName || '',
            disabled: true
        }));

        this.getPaymentsService._notifyGetBanksList.subscribe((data) => {
            if (this.paymentForm.get('BankName')) {
                this.paymentForm.get('BankName').patchValue(data[0].Id);
            }
        });

        this.getPaymentsService.getBankAccounts();
        this.subscriptions.push(this.getPaymentsService.notifyGetBankAccounts$.subscribe(data => {
            let groupByPipe = new GroupByPipe();
            this.accountBanks = groupByPipe.transform(data, 'BankName');
        }));

        this.getPaymentsService.getClientBanks(this.paymentSystemId);

        this.subscriptions.push(this.getPaymentsService.notifyGetClientBanksList$.subscribe((data) => {
            this.banks = data;
            this.paymentForm.get('BankName').patchValue(this.banks[0].BankName);

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

    selectBank(bankName) {

        if (bankName !== null) {
            if (this.accountBanks.find(bank => bank.key == bankName) != undefined) {
                this.accounts = this.accountBanks.find(bank => bank.key == bankName).value;
            }
        }
    }

    submit(data) {
        const requestData = this.paymentForm.getRawValue();
        this.paymentForm.get('BankAccountNumber').patchValue(this.bankNumberFilter.BankAccountNumber);
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.NameSurname = this.NameSurname;
        requestData.BankAccountNumber = this.bankNumberFilter.BankAccountNumber;
        if (this.paymentForm.valid) {
            this.createPayment(requestData);
            this.bankNumberFilter.BankAccountNumber = '';
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('BankName');
        this.paymentForm.removeControl('BankAccountNumber');
        this.paymentForm.removeControl('NameSurname');
        this.paymentForm.removeControl('BankACH');
        this.paymentForm.removeControl('CardNumber');
    }

}
