import {Component, inject, Injector} from '@angular/core';
import {BaseFullWindowComponent} from "../../../../../../@theme/components/common/base-full-window/base-full-window.component";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-full-window',
  templateUrl: './mobile-full-window.component.html'
})
export class MobileFullWindowComponent extends BaseFullWindowComponent {

  layoutService = inject(LayoutService);
  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
