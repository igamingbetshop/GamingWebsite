import {Component, Injector} from '@angular/core';
import {CommonSettingsComponent} from "../../../common/common-settings/common-settings.component";

@Component({
  selector: 'app-self-limitation',
  templateUrl: './self-limitation.component.html'
})
export class SelfLimitationComponent extends CommonSettingsComponent {
  showActiveTab = 'limitation';
  // limitValue: any = '1';
  public limitValues = [
    { Id: 0, Name: 'SelectType' },
    { Id: 1, Name: 'TotalDeposit' },
    { Id: 2, Name: 'TotalBets' },
    { Id: 3, Name: 'TotalLost' },
  ];

  constructor(public injector: Injector) {
    super(injector);
  }

  public changeTab(type) {
    this.showActiveTab = type;
  }

}
