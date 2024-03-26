import {Component, Injector} from '@angular/core';
import {LayoutService} from "@core/services/app/layout.service";
import {BetsHistoryComponent} from "../../../../../../../@theme/components";

@Component({
  selector: 'app-mobile-account-page-type2-history',
  templateUrl: './mobile-account-page-type2-history.component.html'
})
export class MobileAccountPageType2HistoryComponent extends BetsHistoryComponent {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

  async openInfo(data:any) {
    const {MobileUserInfoComponent} = await import('../../mobile-user-info/mobile-user-info.component');
    this.dialog.open(MobileUserInfoComponent, {data:{ title: 'User Info',
        message: true,info:data}});
  }

}
