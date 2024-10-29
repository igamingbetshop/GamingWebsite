import {Component, Injector} from '@angular/core';
import {BaseChangePassword} from "../../../../../../../@theme/components/profile/change-password/base-change-password";

@Component({
  selector: 'app-account-page-type2-change-password',
  templateUrl: './account-page-type2-change-password.component.html'
})
export class AccountPageType2ChangePasswordComponent extends BaseChangePassword {

  constructor(public injector: Injector) {
    super(injector);
  }

}
