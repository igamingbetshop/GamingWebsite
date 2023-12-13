import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {Subscription} from "rxjs";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {WithdrawType20DefaultComponent} from "./withdraw-type20-default/withdraw-type20-default.component";

@Component({
    selector: 'app-withdraw-type3',
    template: `
        <template #loadChildComponent></template>`
})
export class WithdrawType20Component extends BaseCreateDynamicComponent {
    protected subscriptions: Subscription[] = [];

    public getPaymentsService: GetPaymentsService;

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);

    }

    ngOnInit() {
        super.ngOnInit();
    }

    createSubComponent(Id: number, ContentType: number, info: number[], maxMinAmount?: any) {
        super.createSubComponent(Id, ContentType, info, maxMinAmount);

        this.getPaymentsService.getClientPaymentMethods(Id);

        switch (Id) {
            default: {
                this.componentRef = this.entry.createComponent(WithdrawType20DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
