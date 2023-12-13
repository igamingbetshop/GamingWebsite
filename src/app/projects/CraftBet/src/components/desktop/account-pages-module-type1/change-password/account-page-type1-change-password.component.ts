import {Component, Injector} from '@angular/core';
import {BaseChangePassword} from "../../../../../../../@theme/components/profile/change-password/base-change-password";

@Component({
  selector: 'app-account-page-type1-change-password',
  templateUrl: './account-page-type1-change-password.component.html'
})
export class AccountPageType1ChangePasswordComponent extends BaseChangePassword {

  constructor(public injector: Injector) {
    super(injector);
  }

}
