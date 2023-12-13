import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {CustomBlockDefaultComponent} from './custom-block-default/custom-block-default.component';
import {CustomBlockSettingsComponent} from './custom-block-settings/custom-block-settings.component';
import {CustomBlockBetListComponent} from './custom-block-bet-list/custom-block-bet-list.component';
import {CustomBlockAnnouncementComponent} from './custom-block-announcement/custom-block-announcement.component';
import {CustomBlockBettingStatementComponent} from './custom-block-betting-statement/custom-block-betting-statement.component';
import {CustomBlockBettingStatementItemComponent} from './custom-block-betting-statement-item/custom-block-betting-statement-item.component';
import {CustomBlockBettingStatementSportItemComponent} from './custom-block-betting-statement-sport-item/custom-block-betting-statement-sport-item.component';

const routes: Routes = [
  {
    path: '',
    component: CustomBlockDefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        component: CustomBlockSettingsComponent
      },
      {
        path: 'betList',
        component: CustomBlockBetListComponent
      },
      {
        path: 'announcement',
        component: CustomBlockAnnouncementComponent
      },
      {
        path: 'betting-statement',
        component: CustomBlockBettingStatementComponent
      },
      {
        path: 'betting-statement/item/:id',
        component: CustomBlockBettingStatementItemComponent
      },
      {
        path: 'betting-statement/item/:id/sport/:sportType',
        component: CustomBlockBettingStatementSportItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CustomBlockRoutingModule {
}
