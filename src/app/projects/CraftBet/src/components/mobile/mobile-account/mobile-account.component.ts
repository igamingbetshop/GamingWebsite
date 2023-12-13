import {Component, Injector } from '@angular/core';
import {DefaultService } from "@core/services";
import {LayoutService} from "@core/services/app/layout.service";
import {UserAccountStatmentComponent} from "../../../../../../@theme/components";

@Component({
  selector: 'app-mobile-account',
  templateUrl: './mobile-account.component.html',
  styleUrls: ['./mobile-account.component.scss']
})
export class MobileAccountComponent extends UserAccountStatmentComponent{

  public accountData: Array<any> = [];

  constructor(public injector: Injector,
              public defaultService: DefaultService,
              public layoutService:LayoutService)
  {
    super(injector);
  }

  async ngOnInit()
  {
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
