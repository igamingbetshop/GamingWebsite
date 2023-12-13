import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-page-type2-betting-statment-sport-item',
  templateUrl: './account-page-type2-betting-statment-sport-item.component.html',
})
export class AccountPageType2BettingStatmentSportItemComponent implements OnInit {


  public activeTabItem: string = '1';

  constructor() {
  }

  ngOnInit() {
  }

  changeTab(type) {
    this.activeTabItem = type;
  }

}
