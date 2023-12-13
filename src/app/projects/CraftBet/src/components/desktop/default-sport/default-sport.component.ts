import {Component, Injector} from '@angular/core';
import {BaseDefaultSportComponent} from '../../../../../../@theme/components/common/base-default-sport/base-default-sport.component';

@Component({
  selector: 'app-default-sport',
  templateUrl: './default-sport.component.html'
})
export class DefaultSportComponent extends BaseDefaultSportComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
