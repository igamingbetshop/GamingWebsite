import {Component, Injector} from '@angular/core';
import {BasePasswordRecoveryComponent} from '../../../../../../@theme/components/common/base-password-recovery/base-password-recovery.component';
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-app-forgot-password-recovery',
  templateUrl: './mobile-forgot-password-recovery.component.html',
  styleUrls: ['./mobile-forgot-password-recovery.component.scss']
})
export class MobileForgotPasswordRecoveryComponent extends BasePasswordRecoveryComponent {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

}
