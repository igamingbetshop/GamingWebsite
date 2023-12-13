import { Component, Injector } from '@angular/core';
import { BaseChangePassword } from '../../../../../../../@theme/components/profile/change-password/base-change-password';

@Component({
  selector: 'app-account-page-type3-change-password',
  templateUrl: './account-page-type3-change-password.component.html',
  styleUrls: ['./account-page-type3-change-password.component.scss']
})
export class AccountPageType3ChangePasswordComponent extends BaseChangePassword {

  constructor(public injector: Injector) {
    super(injector);
  }

}
