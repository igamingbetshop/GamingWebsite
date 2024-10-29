import {Component,Injector} from '@angular/core';
import {UserAccountStatmentComponent} from "../../../../../../../@theme/components";
import {ConfigService, DefaultService, SaveData} from "@core/services";
import {LayoutService} from "@core/services/app/layout.service";
import {MenuType} from "@core/enums";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mobile-account-page-type2-statment',
  templateUrl: './mobile-account-page-type2-statment.component.html'
})
export class MobileAccountPageType2StatmentComponent extends UserAccountStatmentComponent {

  public accountData: Array<any> = [];

  constructor(public injector: Injector,
              public defaultService: DefaultService,
              public layoutService: LayoutService,
              public baseControllerService: BaseControllerService,
              public savedDateService: SaveData,
              public router: Router) {
    super(injector);
  }

  async ngOnInit() {
    super.ngOnInit();
    let input = {
      'Controller': 'Client',
      'Method': 'GetClientAccounts',
      'Token': this.userInfo.Token,
      'ClientId': this.userInfo.Id,
      'PartnerId': this.configService.defaultOptions.PartnerId,
      'RequestData': JSON.stringify({
        'ClientId': this.userInfo.Id
      })
    };

    let responseData = await this.defaultService.defaultRequest(input);
    this.accountData = responseData.ResponseObject.Accounts.map(account => {
      account.FromattedValue = account.CurrencyId ? this.formatValue(account.Balance) : account.Balance;
      return account;
    });
  }

}
