import {Component, Injector} from '@angular/core';
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {
    BaseWithdrawType24Component
} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type24/base-withdraw-type24.component";


@Component({
    selector: 'app-mobile-withdraw-type24-default',
    templateUrl: './mobile-withdraw-type24-default.component.html'
})
export class MobileWithdrawType24DefaultComponent extends BaseWithdrawType24Component {
    clientPaymentMethods: Array<any> = [];

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();

        this.subscriptions.push(this.getPaymentsService.notifyGetClientPaymentMethods$.subscribe(data => {
            this.clientPaymentMethods = data;
        }));
    }

}
