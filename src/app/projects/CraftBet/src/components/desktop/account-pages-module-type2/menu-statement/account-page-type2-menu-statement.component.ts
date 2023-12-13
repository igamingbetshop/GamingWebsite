import {Component, Injector, OnInit} from '@angular/core';
import {UserAccountStatmentComponent} from "../../../../../../../@theme/components";
import {DefaultService, LocalStorageService} from "@core/services";

@Component({
  selector: 'app-account-page-type2-menu-statement',
  templateUrl: './account-page-type2-menu-statement.component.html',
})
export class AccountPageType2MenuStatementComponent extends UserAccountStatmentComponent{

  public accountData: Array<any> = [];
  public userData: any;
  constructor(public injector: Injector,public localStorageService: LocalStorageService,  public defaultService: DefaultService) {
    super(injector);
    this.userData = localStorageService.get('user');
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
    this.accountData = responseData.ResponseObject.Accounts;
  }

}
