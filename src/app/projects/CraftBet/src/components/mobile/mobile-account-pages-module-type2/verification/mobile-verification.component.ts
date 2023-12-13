import {Component, Injector, OnInit} from '@angular/core';
import {CommonSettingsComponent} from "../../../common/common-settings/common-settings.component";
import {LayoutService} from "../../../../../../../@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.scss']
})
export class MobileVerificationComponent extends CommonSettingsComponent {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

}
