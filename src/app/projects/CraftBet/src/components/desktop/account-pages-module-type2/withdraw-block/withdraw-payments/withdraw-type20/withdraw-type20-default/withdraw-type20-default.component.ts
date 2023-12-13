import {Component, Injector} from '@angular/core';
import {BaseWithdrawType20Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type20/base-withdraw-type20.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";

@Component({
    selector: 'app-withdraw-type20-default',
    templateUrl: './withdraw-type20-default.component.html'
})
export class WithdrawType20DefaultComponent extends BaseWithdrawType20Component {

    getPaymentsService: GetPaymentsService;
    clientPaymentMethods: Array<any> = [];

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.subscriptions.push(this.getPaymentsService.notifyGetClientPaymentMethods$.subscribe(data => {
            this.clientPaymentMethods = data;
        }));
    }

}
