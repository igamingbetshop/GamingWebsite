import {Component, Injector} from '@angular/core';
import {AppCommonBetsHistoryComponent} from "../../../common/app-common-bets-history/app-common-bets-history.component";
import {LayoutService} from "@core/services/app/layout.service";
import {MobileUserInfoComponent} from "../../mobile-user-info/mobile-user-info.component";
import {BetsHistoryComponent} from "../../../../../../../@theme/components";

@Component({
  selector: 'app-mobile-account-page-type2-history',
  templateUrl: './mobile-account-page-type2-history.component.html'
})
export class MobileAccountPageType2HistoryComponent extends BetsHistoryComponent {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

  public openInfo(data) {
    this.simpleModalService.addModal(MobileUserInfoComponent, {
      title: 'User Info',
      message: true,
      data: data
    }).subscribe((isConfirmed) => {
    });
  }

}
