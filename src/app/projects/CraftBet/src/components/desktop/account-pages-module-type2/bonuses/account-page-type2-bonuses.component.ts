import {Component, Injector} from '@angular/core';
import {BonusesComponent} from "../../../../../../../@theme/components/common/bonuses/bonuses.component";

@Component({
  selector: 'app-account-page-type2-bonuses',
  templateUrl: './account-page-type2-bonuses.component.html'
})
export class AccountPageType2BonusesComponent extends BonusesComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
