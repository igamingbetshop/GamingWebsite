import {Injectable, Injector} from '@angular/core';
import {BaseForgotPasswordComponent} from '../../../../../../@theme/components/common/base-forgot-password/base-forgot-password.component';

@Injectable()
export class AppCommonForgotPasswordComponent extends BaseForgotPasswordComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
