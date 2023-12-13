import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-block-betting-statement',
  templateUrl: './custom-block-betting-statement.component.html'
})
export class CustomBlockBettingStatementComponent implements OnInit {

  @Input() itemData;

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

  constructor() {
  }

  ngOnInit() {
  }

  changeTab() {

  }

}
