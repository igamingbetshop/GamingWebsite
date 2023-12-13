import {Component, Injector} from '@angular/core';
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {MobileWithdrawType23DefaultComponent} from "./withdraw-type23-default/mobile-withdraw-type23-default.component";
import {
    BaseCreateDynamicComponent
} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";

@Component({
    selector: 'app-mobile-withdraw-type22',
    template: `
        <template #loadChildComponent></template>`
})
export class MobileWithdrawType23Component extends BaseCreateDynamicComponent {

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
                this.componentRef = this.entry.createComponent(MobileWithdrawType23DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

}
