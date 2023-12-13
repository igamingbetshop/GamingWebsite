import {Component, Injector} from '@angular/core';
import {BonusesComponent} from "../../../../../../../@theme/components/common/bonuses/bonuses.component";

@Component({
  selector: 'app-account-page-type1-bonuses',
  templateUrl: './account-page-type1-bonuses.component.html'
})
export class AccountPageType1BonusesComponent extends BonusesComponent {

  constructor(public injector: Injector) {
    super(injector);
  }
}
