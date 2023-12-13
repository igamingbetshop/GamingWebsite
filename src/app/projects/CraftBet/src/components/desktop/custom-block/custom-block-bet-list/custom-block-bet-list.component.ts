import {Component, Injector} from '@angular/core';
import {AppCommonBetsHistoryComponent} from "../../../common/app-common-bets-history/app-common-bets-history.component";

@Component({
  selector: 'app-custom-block-bet-list',
  templateUrl: './custom-block-bet-list.component.html'
})
export class CustomBlockBetListComponent extends AppCommonBetsHistoryComponent {

  tabsName = [
    {
      'id': 1,
      'routeName': 'betList',
      'pageName': 'betList',
      'icon': 'icon-top-panel-bet-list'
    },
    {
      'id': 2,
      'routeName': 'betting-statement',
      'pageName': 'statement',
      'icon': 'icon-top-panel-statement'
    },
    {
      'id': 3,
      'routeName': 'settings',
      'pageName': 'settings',
      'icon': 'icon-top-panel-settings'
    },
    {
      'id': 4,
      'routeName': 'announcement',
      'pageName': 'announcement',
      'icon': 'icon-top-panel-announcements'
    }
  ];

  constructor(public injector: Injector) {
    super(injector);
  }

}
