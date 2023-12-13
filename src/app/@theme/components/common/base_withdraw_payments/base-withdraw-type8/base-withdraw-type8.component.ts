import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from '../../../../../@core/services/app/getPayments.service';
import {GroupByPipe} from "../../../../pipes";
import {BankAccount} from "@core/models";
import {AuthService} from "@core/services";
import {Router} from "@angular/router";

@Directive()
export class BaseWithdrawType8Component extends BaseWithdrawPaymentComponent {

    public getPaymentsService: GetPaymentsService;
    private authService:AuthService;
    public router: Router;
    public accounts: Array<BankAccount> = [];
    countries:any[] = [];
    public banks = [];
    public selectedBank;
    public userData;
    public NameSurname: string;

    amountValue: any;
    public CommissionPercent;

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);
        this.userData = this.localStorageService.get('user');
        this.router = injector.get(Router);
        this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
        this.authService = injector.get(AuthService);
    }

    /*
    BankCountry
    BankAddress
    BankCity
    * */


    ngOnInit() {
        super.ngOnInit();
        this.authService.getRegion({TypeId:5}).then(data => {
            this.countries = data.ResponseObject;
        });
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));

        this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('NameSurname', new FormControl({
            value: this.userData.FirstName || this.userData.LastName || '',
            disabled: true
        }));
        this.paymentForm.addControl('BankCountry', new FormControl(''));
        this.paymentForm.addControl('BankCity', new FormControl(''));
        this.paymentForm.addControl('BankAddress', new FormControl(''));


        this.getPaymentsService._notifyGetBanksList.subscribe((data) => {
            if (this.paymentForm.get('BankName')) {
                this.paymentForm.get('BankName').patchValue(data[0].Id);
            }
        });
        this.getPaymentsService.getBankAccounts();
        this.subscribePaymentsService();
    }

    subscribePaymentsService() {
        this.subscriptions.push(this.getPaymentsService.notifyGetBankAccounts$.subscribe(data => {
            if (data.length !== 0) {
                let groupByPipe = new GroupByPipe();
                this.banks = groupByPipe.transform(data, 'BankName');
                this.paymentForm.addControl('BankName', new FormControl(this.banks[0]?.key, { nonNullable: true, validators: [Validators.required] }));
                this.paymentForm.get('BankName').valueChanges.subscribe((data: any) => {
                    this.accounts = this.banks.find(bank => bank.key == data)?.value;
                });
                this.paymentForm.get('BankName').patchValue(this.banks[0]?.key);
                this.selectedBank = this.paymentForm.get('BankName').value;
                this.selectBank(this.selectedBank);
            }
        }));
    }

    selectBank(bankName) {
        this.selectedBank = bankName;
        this.paymentForm.get('BankName').patchValue(this.selectedBank);
        // this.accounts = this.banks.find(bank => bank.key == bankName)?.value;
    }

    submit(data) {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.NameSurname = this.NameSurname;
        if (this.paymentForm.valid)
        {
            this.createPayment(requestData);
            // console.log(this.banks);
            // this.selectedBank = this.banks[0].key;
            // console.log(this.selectedBank);
            // setTimeout(() => {
            //     this.paymentForm.get('BankName').setValue(this.selectedBank);
            // }, 1000);
        } else this.markFormGroupTouched(this.paymentForm);
        console.log(this.paymentForm.value)
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('BankName');
        this.paymentForm.removeControl('BankAccountNumber');
        this.paymentForm.removeControl('NameSurname');
        this.paymentForm.removeControl('BankCountry');
        this.paymentForm.removeControl('BankCity');
        this.paymentForm.removeControl('BankAddress');
    }

}
