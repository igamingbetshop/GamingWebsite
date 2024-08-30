import {Component, Injector, OnInit} from '@angular/core';
import {BetsHistoryComponent} from "../../../../../../../@theme/components";

@Component({
  selector: 'app-account-page-type2-history',
  templateUrl: './account-page-type2-history.component.html',
})
export class AccountPageType2HistoryComponent extends BetsHistoryComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  async openInfo(data) {

    const {UserInfoComponent} = await import('../../user-info/user-info.component');
    this.dialog.open(UserInfoComponent, {data:{title: 'User Info',
        message: true, info: data}});
  }

}
