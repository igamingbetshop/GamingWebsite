import {Component, Injector} from '@angular/core';
import {LayoutService} from "@core/services/app/layout.service";
import {BetsHistoryComponent} from "../../../../../../../@theme/components";

@Component({
    selector: 'app-mobile-account-page-type1-history',
    templateUrl: './mobile-account-page-type1-history.component.html'
})
export class MobileAccountPageType1HistoryComponent extends BetsHistoryComponent {

    constructor(public injector: Injector, public layoutService: LayoutService) {
        super(injector);
    }

    async openInfo(data) {

        const {MobileUserInfoComponent} = await import('../../mobile-user-info/mobile-user-info.component');
        this.dialog.open(MobileUserInfoComponent, {data:{title: 'User Info',
                message: true,info:data}})
    }

}
