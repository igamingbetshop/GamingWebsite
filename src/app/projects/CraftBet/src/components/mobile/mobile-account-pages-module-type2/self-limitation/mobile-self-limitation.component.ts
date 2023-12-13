import { Component, Injector } from '@angular/core';
import { LayoutService } from '@core/services/app/layout.service';
import { CommonSettingsComponent } from '../../../common/common-settings/common-settings.component';

@Component({
  selector: 'app-mobile-self-limitation',
  templateUrl: './mobile-self-limitation.component.html',
  styleUrls: ['./mobile-self-limitation.component.scss']
})
export class MobileSelfLimitationComponent extends CommonSettingsComponent {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

}
