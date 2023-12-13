import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {WithdrawType3DefaultComponent} from './withdraw-type3-default/withdraw-type3-default.component';
import {GroupByPipe} from "../../../../../../../../../@theme/pipes";
import {Subscription} from "rxjs";
import {GetPaymentsService} from "@core/services/app/getPayments.service";

@Component({
    selector: 'app-withdraw-type3',
    template: `
        <template #loadChildComponent></template>`
})
export class WithdrawType3Component extends BaseCreateDynamicComponent {
    protected subscriptions: Subscription[] = [];

    public getPaymentsService: GetPaymentsService;

    constructor(public injector: Injector) {
        super(injector);

        this.getPaymentsService = injector.get(GetPaymentsService);

    }

    ngOnInit() {
        super.ngOnInit();
    }

    createSubComponent(Id: number, ContentType: number, info: number[], CommissionPercent: number) {
        super.createSubComponent(Id, ContentType, info, CommissionPercent);

        this.getPaymentsService.getClientPaymentMethods(Id);

        switch (Id) {
            default: {
                this.componentRef = this.entry.createComponent(WithdrawType3DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
