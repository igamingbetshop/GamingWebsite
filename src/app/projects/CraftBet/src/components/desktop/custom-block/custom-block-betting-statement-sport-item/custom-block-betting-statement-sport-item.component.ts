import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-block-betting-statement-sport-item',
  templateUrl: './custom-block-betting-statement-sport-item.component.html'
})
export class CustomBlockBettingStatementSportItemComponent implements OnInit {

  public activeTabItem: string = '1';

  constructor() {
  }

  ngOnInit() {
  }

  changeTab(type) {
    this.activeTabItem = type;
  }

}
