import {Component, Injector} from '@angular/core';
import {CommonSettingsComponent} from "../../../common/common-settings/common-settings.component";

@Component({
    selector: 'app-account-page-type2-self-limitation',
    templateUrl: './account-page-type2-self-limitation.component.html'
})
export class AccountPageType2SelfLimitationComponent extends CommonSettingsComponent {
    showActiveTab = 'limitation';
    limitValue: any = '1';

    constructor(public injector: Injector) {
        super(injector);
    }

    public changeTab(type) {
        this.showActiveTab = type;
    }

    changeLimit(value) {
        this.limitValue = value;
    }
}
