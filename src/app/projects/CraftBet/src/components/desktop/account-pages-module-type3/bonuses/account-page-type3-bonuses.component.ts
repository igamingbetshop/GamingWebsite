import { Component, Injector } from '@angular/core';
import { BonusesComponent } from '../../../../../../../@theme/components/common/bonuses/bonuses.component';
import { Products } from '../../../../../../../@core/enums';

@Component({
  selector: 'app-account-page-type3-bonuses',
  templateUrl: './account-page-type3-bonuses.component.html',
  styleUrls: ['./account-page-type3-bonuses.component.scss']
})
export class AccountPageType3BonusesComponent extends BonusesComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.selectedProduct = Products.SPORTSBOOK;
    this.getBonus(this.selectedProduct);
  }

}
