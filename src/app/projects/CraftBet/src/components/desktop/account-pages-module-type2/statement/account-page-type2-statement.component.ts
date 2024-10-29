import {Component, Injector, OnInit} from '@angular/core';
import {UserAccountStatmentComponent} from "../../../../../../../@theme/components";
import {DefaultService} from "@core/services";

@Component({
  selector: 'app-account-page-type2-statement',
  templateUrl: './account-page-type2-statement.component.html',
})
export class AccountPageType2StatementComponent extends UserAccountStatmentComponent{

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
    const realBalance:any = {AccountTypeName: this.translate.instant('Balance.Real Balance'), Balance:0, CurrencyId:''};
    for (let i = 0; i < responseData.ResponseObject.Accounts.length; i++)
    {
      if(responseData.ResponseObject.Accounts[i].TypeId === 1 || responseData.ResponseObject.Accounts[i].TypeId === 2)
      {
        realBalance.Balance += responseData.ResponseObject.Accounts[i].Balance;
        realBalance.CurrencyId = responseData.ResponseObject.Accounts[i].CurrencyId;
        realBalance.CurrencySymbol = responseData.ResponseObject.Accounts[i].CurrencySymbol;
        responseData.ResponseObject.Accounts.splice(i,1);
        i--;
      }
    }
    responseData.ResponseObject.Accounts.unshift(realBalance);
    this.accountData = responseData.ResponseObject.Accounts.map(account => {
      account.FromattedValue = account.CurrencyId ? this.formatValue(account.Balance) : account.Balance;
      return account;
    });
  }

}
