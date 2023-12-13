import {Component, Injector} from '@angular/core';
import {BaseFullWindowComponent} from "../../../../../../@theme/components/common/base-full-window/base-full-window.component";

@Component({
  selector: 'app-mobile-full-window',
  templateUrl: './mobile-full-window.component.html'
})
export class MobileFullWindowComponent extends BaseFullWindowComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
