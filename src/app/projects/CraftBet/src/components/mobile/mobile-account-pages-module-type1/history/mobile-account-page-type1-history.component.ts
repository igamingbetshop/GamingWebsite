import {Component, Injector} from '@angular/core';
import {LayoutService} from "@core/services/app/layout.service";
import {MobileUserInfoComponent} from "../../mobile-user-info/mobile-user-info.component";
import {BetsHistoryComponent} from "../../../../../../../@theme/components";

@Component({
    selector: 'app-mobile-account-page-type1-history',
    templateUrl: './mobile-account-page-type1-history.component.html'
})
export class MobileAccountPageType1HistoryComponent extends BetsHistoryComponent {

    constructor(public injector: Injector, public layoutService: LayoutService) {
        super(injector);
    }

    public openInfo(data) {
        this.simpleModalService.addModal(MobileUserInfoComponent, {
            title: 'User Info',
            message: true,
            data: data
        }).subscribe((isConfirmed) => {});
    }

}
