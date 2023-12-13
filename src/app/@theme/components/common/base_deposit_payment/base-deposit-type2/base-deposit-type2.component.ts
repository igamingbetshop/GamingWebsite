import {Directive, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {BalanceService} from "@core/services/api/balance.service";

@Directive()
export class BaseDepositType2Component extends BaseDepositPaymentComponent {
    public balanceService: BalanceService;
    public balanceInfo: any;
    public availableBalance: string;
    public showAmountField: boolean = false;

    constructor(public injector: Injector) {
        super(injector);
        this.balanceService = injector.get(BalanceService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.get('Amount').valueChanges.subscribe((data) => {
            this.submitted = false;
        });

        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.balanceInfo = data;
            this.availableBalance = data.AvailableBalance;
        });

        if (this.nominals) {
            let filterNominals = [];
            for (const value in this.nominals) {
                if (this.nominals[value] !== 0) {
                    filterNominals.push(this.nominals[value]);
                } else {
                    this.showAmountField = true;
                }
            }

            this.nominals = filterNominals;
        }
    }

    submit() {
        if (this.paymentForm.valid)
        {
            const requestData = this.paymentForm.getRawValue();
            requestData.paymentType = 'deposit';
            requestData.PaymentSystemId = this.paymentSystemId;
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);

    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
    }

}
