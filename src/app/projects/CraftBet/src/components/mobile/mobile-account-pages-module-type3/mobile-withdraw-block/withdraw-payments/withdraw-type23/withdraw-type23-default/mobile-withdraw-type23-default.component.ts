import {Component, Injector} from '@angular/core';
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {
    BaseWithdrawType23Component
} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type23/base-withdraw-type23.component";

@Component({
    selector: 'app-mobile-withdraw-type23-default',
    templateUrl: './mobile-withdraw-type23-default.component.html'
})
export class MobileWithdrawType23DefaultComponent extends BaseWithdrawType23Component {
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
