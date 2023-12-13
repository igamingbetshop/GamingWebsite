import {Component, Injector} from '@angular/core';
import {BaseAccountsComponent} from "../../../../../../@theme/components/common/base-accounts/base-accounts.component";

@Component({
    selector: 'app-common-accounts',
    templateUrl: './common-accounts.component.html',
})
export class CommonAccountsComponent extends BaseAccountsComponent {

    constructor(public injector: Injector) {
        super(injector);
    }

}
