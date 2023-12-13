import {Component, Injector} from '@angular/core';
import {BaseSettingsComponent} from "../../../../../../../@theme/components/common/base-settings/base-settings.component";

@Component({
  selector: 'app-account-page-type2-change-password',
  templateUrl: './account-page-type2-change-password.component.html'
})
export class AccountPageType2ChangePasswordComponent extends BaseSettingsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
