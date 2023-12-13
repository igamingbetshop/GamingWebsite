import {Component, Injector} from '@angular/core';
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {
    BaseWithdrawType22Component
} from "../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type22/base-withdraw-type22.component";

@Component({
    selector: 'app-mobile-withdraw-type22-default',
    templateUrl: './mobile-withdraw-type22-default.component.html'
})
export class MobileWithdrawType22DefaultComponent extends BaseWithdrawType22Component {
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
