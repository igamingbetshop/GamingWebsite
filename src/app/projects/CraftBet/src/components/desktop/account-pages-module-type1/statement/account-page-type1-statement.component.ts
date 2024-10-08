import {Component, Injector } from '@angular/core';
import {UserAccountStatmentComponent} from "../../../../../../../@theme/components";
import {DefaultService} from "@core/services";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-account-page-type1-statement',
  templateUrl: './account-page-type1-statement.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class AccountPageType1StatementComponent extends UserAccountStatmentComponent{

  public accountData: Array<any> = [];

  constructor(public injector: Injector, public defaultService: DefaultService) {
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
