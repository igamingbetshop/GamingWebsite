import {Component, Injector} from '@angular/core';
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {MobileWithdrawType24DefaultComponent} from "./withdraw-type24-default/mobile-withdraw-type24-default.component";
import {
    BaseCreateDynamicComponent
} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";

@Component({
    selector: 'app-mobile-withdraw-type24',
    template: `
        <template #loadChildComponent></template>`
})
export class MobileWithdrawType24Component extends BaseCreateDynamicComponent {

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
                this.componentRef = this.entry.createComponent(MobileWithdrawType24DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

}
