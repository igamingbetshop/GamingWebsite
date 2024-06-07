import {Component, Injector} from '@angular/core';
import {BasePasswordRecoveryComponent} from '../../../../../../@theme/components/common/base-password-recovery/base-password-recovery.component';

@Component({
  selector: 'app-app-forgot-password-recovery',
  templateUrl: './app-forgot-password-recovery.component.html',
  styleUrls: ['./app-forgot-password-recovery.component.scss']
})
export class AppForgotPasswordRecoveryComponent extends BasePasswordRecoveryComponent {
  public logoUrl: string = '../../../../../../../assets/images/' + window.location.hostname + '.png';
  public showPassword: boolean = false;
  public showConfirmPass: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
  showConfPassword() {
    this.showConfirmPass = !this.showConfirmPass;
  }

}
