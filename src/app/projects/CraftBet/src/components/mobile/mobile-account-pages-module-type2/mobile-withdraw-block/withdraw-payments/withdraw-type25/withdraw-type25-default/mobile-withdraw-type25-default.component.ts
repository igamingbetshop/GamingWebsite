import {Component, Injector} from '@angular/core';
import {
    BaseWithdrawType25Component
} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type25/base-withdraw-type25.component";

@Component({
    selector: 'app-mobile-withdraw-type25-default',
    templateUrl: './mobile-withdraw-type25-default.component.html'
})
export class MobileWithdrawType25DefaultComponent extends BaseWithdrawType25Component {

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

}
