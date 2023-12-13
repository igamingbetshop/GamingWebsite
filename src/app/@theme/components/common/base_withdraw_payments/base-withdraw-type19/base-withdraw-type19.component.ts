import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from '../../../../../@core/services/app/getPayments.service';
import {GroupByPipe} from "../../../../pipes";
import {BankAccount} from "@core/models";
import {AuthService} from "../../../../../@core/services";
declare let IBAN: any;

@Directive()
export class BaseWithdrawType19Component extends BaseWithdrawPaymentComponent {

    public getPaymentsService: GetPaymentsService;
    private authService:AuthService;

    public accounts: Array<BankAccount> = [];
    public banks = [];
    public userData;
    public NameSurname: string;
    countries:any[] = [];

    amountValue: any;
    ibanState:number = -1;
    public CommissionPercent;

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);
        this.authService = injector.get(AuthService);
        this.userData = this.localStorageService.get('user');
        this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
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
        this.paymentForm.addControl('BankName', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankIBAN', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('NameSurname', new FormControl({
            value: this.userData.FirstName || this.userData.LastName || '',
            disabled: true
        }));
        this.paymentForm.addControl('SwiftCode', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('BankCountry', new FormControl(''));
        this.paymentForm.addControl('BankCity', new FormControl(''));
        this.paymentForm.addControl('BankAddress', new FormControl(''));


        this.getPaymentsService._notifyGetBanksList.subscribe((data) => {
            if (this.paymentForm.get('BankName')) {
                this.paymentForm.get('BankName').patchValue(data[0].Id);
            }
        });

        this.getPaymentsService.getBankAccounts();
        this.subscriptions.push(this.getPaymentsService.notifyGetBankAccounts$.subscribe(data => {
            let groupByPipe = new GroupByPipe();
            this.banks = groupByPipe.transform(data, 'BankName');
            this.paymentForm.get('BankName').patchValue(this.banks?.[0]['key']);
        }));
        //this.paymentForm.get('BankIBAN').valueChanges.subscribe(data => this.checkIban())
    }

    selectBank(bankName) {
        this.accounts = this.banks.find(bank => bank.key == bankName).value;
    }

    submit(data) {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        requestData.NameSurname = this.NameSurname;
        if (this.paymentForm.valid) {
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('BankName');
        this.paymentForm.removeControl('BankIBAN');
        this.paymentForm.removeControl('NameSurname');
        this.paymentForm.removeControl('SwiftCode');
        this.paymentForm.removeControl('BankCountry');
        this.paymentForm.removeControl('BankCity');
        this.paymentForm.removeControl('BankAddress');
    }

    checkIban(event?:MouseEvent)
    {
        if(event)
            event.stopPropagation();
        const ibanValue:string = this.paymentForm.get('BankIBAN').value;
        this.ibanState = IBAN.isValid(ibanValue) ? 1 : 0;
    }

}
