import { Component, Injector } from '@angular/core';
import { BonusesComponent } from '../../../../../../../@theme/components/common/bonuses/bonuses.component';
import { Products } from '../../../../../../../@core/enums';
import { LocalStorageService } from '../../../../../../../@core/services';

@Component({
  selector: 'app-account-page-type3-bonuses',
  templateUrl: './account-page-type3-bonuses.component.html',
  styleUrls: ['./account-page-type3-bonuses.component.scss']
})
export class AccountPageType3BonusesComponent extends BonusesComponent {
  public currencySymbol: any;
  public localStorageService: LocalStorageService;
  public openedIndex: number = null;

  constructor(public injector: Injector) {
    super(injector);
    this.localStorageService = injector.get(LocalStorageService);
    const userData = this.localStorageService.get('user');
    this.currencySymbol = userData ? userData.CurrencySymbol : '';
  }

  ngOnInit() {
    super.ngOnInit();
  }

  isItemOpened(index) {
    return this.openedIndex === index;
  }

  openBonusInfo(index) {
    if (index === this.openedIndex) {
      this.openedIndex = null;
    } else {
      this.openedIndex = index;
    }
  }

}
