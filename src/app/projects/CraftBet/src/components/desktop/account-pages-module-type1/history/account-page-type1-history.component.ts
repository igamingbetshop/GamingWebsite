import {Component, Injector} from '@angular/core';
import {AppCommonBetsHistoryComponent} from "../../../common/app-common-bets-history/app-common-bets-history.component";

@Component({
  selector: 'app-account-page-type1-history',
  templateUrl: './account-page-type1-history.component.html'
})
export class AccountPageType1HistoryComponent extends AppCommonBetsHistoryComponent {

  public showInfoBox:boolean;
  public closeInfo:boolean;
  public selectedBet:any;

  constructor(public injector: Injector) {
    super(injector);
  }
  openInfoBox(item, index){
    this.showInfoBox = index;
    this.selectedBet = item;
    this.closeInfo = true;
  }
  closeInfoBox(){
    this.closeInfo = false;
  }
}
