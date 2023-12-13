import {Directive, Injector} from '@angular/core';
import {BaseWithdrawPaymentComponent} from "../base-withdraw-payment/base-withdraw-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BalanceService} from "@core/services/api/balance.service";

@Directive()
export class BaseWithdrawType2Component extends BaseWithdrawPaymentComponent {

    amountValue: any;
    public balanceService: BalanceService;
    getPaymentsService: GetPaymentsService;
    public availableBalance: string;
    public CommissionPercent;
    public balanceInfo: any;

    clientPaymentMethods: Array<any> = [];
    constructor(public injector: Injector) {
        super(injector);
        this.balanceService = injector.get(BalanceService);
        this.getPaymentsService = injector.get(GetPaymentsService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Amount', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('CardNumber', new FormControl('', [Validators.required]));

        this.subscriptions.push(this.getPaymentsService.notifyGetClientPaymentMethods$.subscribe(data => {
            this.clientPaymentMethods = data;
        }));

        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.balanceInfo = data;
            this.availableBalance = data.AvailableBalance;
        });
    }

    submit() {
        const requestData = this.paymentForm.getRawValue();
        requestData.paymentType = 'withdraw';
        requestData.PaymentSystemId = this.paymentSystemId;
        if (this.paymentForm.valid) {
            this.createPayment(requestData);

        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('CardNumber');
    }


}
