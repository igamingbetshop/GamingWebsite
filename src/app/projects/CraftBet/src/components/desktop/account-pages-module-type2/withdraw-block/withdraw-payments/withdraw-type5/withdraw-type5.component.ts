import {Component, Injector} from '@angular/core';
import {BaseCreateDynamicComponent} from "../../../../../../../../../@theme/components/common/base-create-dynamic/base-create-dynamic.component";
import {WithdrawType5DefaultComponent} from './withdraw-type5-default/withdraw-type5-default.component';

@Component({
    selector: 'app-withdraw-type5',
    template: `
        <template #loadChildComponent></template>`
})
export class WithdrawType5Component extends BaseCreateDynamicComponent {

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
                this.componentRef = this.entry.createComponent(WithdrawType5DefaultComponent);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
        }
    }

}