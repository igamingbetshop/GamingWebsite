import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {WithdrawType13DefaultComponent} from "./withdraw-type13-default/withdraw-type13-default.component";

@Component({
    selector: 'app-withdraw-type13',
    template: `
        <template #loadChildComponent></template>`
})
export class WithdrawType13Component extends BaseCreateDynamicComponent {

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
                this.componentRef = this.entry.createComponent(WithdrawType13DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

}
