import {Component, Injector} from '@angular/core';
import {BaseDefaultSportComponent} from '../../../../../../@theme/components/common/base-default-sport/base-default-sport.component';
import {StateService} from "@core/services/app/state.service";

@Component({
  selector: 'app-default-sport',
  templateUrl: './default-sport.component.html'
})
export class DefaultSportComponent extends BaseDefaultSportComponent {

  constructor(public injector: Injector, public stateService:StateService) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
