import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {MobileWithdrawType14DefaultComponent} from "./withdraw-type14-default/mobile-withdraw-type14-default.component";

@Component({
    selector: 'app-mobile-withdraw-type14',
    template: `
        <template #loadChildComponent></template>`
})
export class MobileWithdrawType14Component extends BaseCreateDynamicComponent {

    getPaymentsService: GetPaymentsService;

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
                this.componentRef = this.entry.createComponent(MobileWithdrawType14DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

}
