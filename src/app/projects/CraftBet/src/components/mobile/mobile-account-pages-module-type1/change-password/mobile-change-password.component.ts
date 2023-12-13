import {Component, Injector, OnInit} from '@angular/core';
import {BaseChangePassword} from "../../../../../../../@theme/components/profile/change-password/base-change-password";
import {LayoutService} from "../../../../../../../@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-change-password',
  templateUrl: './mobile-change-password.component.html',
  styleUrls: ['./mobile-change-password.component.scss']
})
export class MobileChangePasswordComponent extends BaseChangePassword {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

}
