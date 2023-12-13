import {Directive, Injector} from '@angular/core';
import {BaseSettingsComponent} from '../../../../../../@theme/components/common/base-settings/base-settings.component';
import {BaseControllerService} from "@core/services/app/baseController.service";


@Directive()
export class CommonSettingsComponent extends BaseSettingsComponent {

  public baseControllerService: BaseControllerService;

  constructor(public injector: Injector) {
    super(injector);
    this.baseControllerService = injector.get(BaseControllerService);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
