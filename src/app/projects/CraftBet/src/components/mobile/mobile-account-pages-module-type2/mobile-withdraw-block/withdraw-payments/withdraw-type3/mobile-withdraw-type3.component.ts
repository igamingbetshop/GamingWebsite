import {Component, Injector, OnInit} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileWithdrawType3DefaultComponent} from './withdraw-type3-default/mobile-withdraw-type3-default.component';
import {GetPaymentsService} from "@core/services/app/getPayments.service";

@Component({
    selector: 'app-mobile-withdraw-type3',
    template: `
        <template #loadChildComponent></template>`
})
export class MobileWithdrawType3Component extends BaseCreateDynamicComponent {

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
                this.componentRef = this.entry.createComponent(MobileWithdrawType3DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

}
