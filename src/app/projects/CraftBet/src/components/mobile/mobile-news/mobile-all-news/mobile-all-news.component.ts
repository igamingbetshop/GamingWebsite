import {Component, Injector} from '@angular/core';
import {BaseNewsComponent} from "../../../../../../../@theme/components/common/news/base-news.component";

@Component({
  selector: 'mobile-all-news',
  templateUrl: './mobile-all-news.component.html'
})
export class MobileAllNewsComponent extends BaseNewsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }
}
