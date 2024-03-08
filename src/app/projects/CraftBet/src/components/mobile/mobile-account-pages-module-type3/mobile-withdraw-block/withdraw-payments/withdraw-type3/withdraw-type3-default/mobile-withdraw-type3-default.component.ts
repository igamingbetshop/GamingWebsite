import {Component, Injector} from '@angular/core';
import {BaseWithdrawType3Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type3/base-withdraw-type3.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";

@Component({
    selector: 'app-mobile-withdraw-type3-default',
    templateUrl: './mobile-withdraw-type3-default.component.html'
})
export class MobileWithdrawType3DefaultComponent extends BaseWithdrawType3Component {
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
