import {Component, Injector} from '@angular/core';
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BaseWithdrawType14Component} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type14/base-withdraw-type14.component";

@Component({
    selector: 'app-mobile-withdraw-type14-default',
    templateUrl: './mobile-withdraw-type14-default.component.html'
})
export class MobileWithdrawType14DefaultComponent extends BaseWithdrawType14Component {
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
