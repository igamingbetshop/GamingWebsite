import {Directive, inject } from '@angular/core';
import {UserInfoComponent} from '../../desktop/user-info/user-info.component';
import {BetsHistoryComponent} from '../../../../../../@theme/components/common/bets-history/bets-history.component';
import {MatDialog} from "@angular/material/dialog";


@Directive()
export class AppCommonBetsHistoryComponent extends BetsHistoryComponent {

  dialog = inject(MatDialog);

  public openInfo(data) {
    this.dialog.open(UserInfoComponent, {data:{
        title: 'User-Info',
        message: true,
        info: data
      }});
  }
}
