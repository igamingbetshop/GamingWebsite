import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-account-page-type1-betting-statement-sport',
  templateUrl: './mobile-account-page-type1-betting-statement-sport.component.html'
})
export class MobileAccountPageType1BettingStatementSportComponent implements OnInit {


  public activeTabItem: string = '1';

  constructor() {
  }

  ngOnInit() {
  }

  changeTab(type) {
    this.activeTabItem = type;
  }

}
