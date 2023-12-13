import {Component, Injector} from '@angular/core';
import {BaseNewsComponent} from "../../../../../../../@theme/components/common/news/base-news.component";

@Component({
  selector: 'all-news',
  templateUrl: './all-news.component.html'
})
export class AllNewsComponent extends BaseNewsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }
}
