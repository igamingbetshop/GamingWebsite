import {Component, Injector} from '@angular/core';
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {
    BaseWithdrawType20Component
} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type20/base-withdraw-type20.component";

@Component({
    selector: 'app-mobile-withdraw-type20-default',
    templateUrl: './mobile-withdraw-type20-default.component.html'
})
export class MobileWithdrawType20DefaultComponent extends BaseWithdrawType20Component {
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
