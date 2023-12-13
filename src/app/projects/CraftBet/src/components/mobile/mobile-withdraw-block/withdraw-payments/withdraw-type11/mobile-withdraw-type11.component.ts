import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {MobileWithdrawType11DefaultComponent} from "./withdraw-type11-default/mobile-withdraw-type11-default.component";

@Component({
    selector: 'app-mobile-withdraw-type11',
    template: `
        <template #loadChildComponent></template>`
})
export class MobileWithdrawType11Component extends BaseCreateDynamicComponent {

    constructor(public injector: Injector) {
        super(injector);

    }

    ngOnInit() {
        super.ngOnInit();
    }

    createSubComponent(Id: number, ContentType: number, info: number[], CommissionPercent: number) {
        super.createSubComponent(Id, ContentType, info, CommissionPercent);
        switch (Id) {
            default: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType11DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

}
