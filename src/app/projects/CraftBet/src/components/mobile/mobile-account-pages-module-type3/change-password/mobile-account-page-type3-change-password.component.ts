import { Component, Injector } from '@angular/core';
import { BaseChangePassword } from '../../../../../../../@theme/components/profile/change-password/base-change-password';

@Component({
  selector: 'app-mobile-account-page-type3-change-password',
  templateUrl: './mobile-account-page-type3-change-password.component.html',
  styleUrls: ['./mobile-account-page-type3-change-password.component.scss']
})
export class MobileAccountPageType3ChangePasswordComponent extends BaseChangePassword {

  constructor(public injector: Injector) {
    super(injector);
  }

}
