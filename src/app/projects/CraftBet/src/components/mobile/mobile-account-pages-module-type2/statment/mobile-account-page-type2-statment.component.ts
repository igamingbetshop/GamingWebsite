import {Component, Injector} from '@angular/core';
import {UserAccountStatmentComponent} from "../../../../../../../@theme/components";
import {DefaultService} from "@core/services";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-account-page-type2-statment',
  templateUrl: './mobile-account-page-type2-statment.component.html'
})
export class MobileAccountPageType2StatmentComponent extends UserAccountStatmentComponent {

  public accountData: Array<any> = [];

  constructor(public injector: Injector,
              public defaultService: DefaultService,
              public layoutService: LayoutService) {
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
    this.accountData = responseData.ResponseObject.Accounts;
  }
}
