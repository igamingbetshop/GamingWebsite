import { Component, Injector } from '@angular/core';
import { BaseTwoFactor } from '../../../../../../../@theme/components/common/base-two-factor/base-two-factor';
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-account-page-type2-two-factor',
  templateUrl: './mobile-account-page-type2-two-factor.component.html',
  styleUrls: ['./mobile-account-page-type2-two-factor.component.scss']
})
export class MobileAccountPageType2TwoFactorComponent extends BaseTwoFactor {
  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }
}
