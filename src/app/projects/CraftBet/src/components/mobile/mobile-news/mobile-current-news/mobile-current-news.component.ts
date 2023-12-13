import {Component, Injector} from '@angular/core';
import {BaseCurrentNewsComponent} from "../../../../../../../@theme/components/common/news/base-current-news.component";

@Component({
  selector: 'mobile-current-news',
  templateUrl: './mobile-current-news.component.html'
})
export class MobileCurrentNewsComponent extends BaseCurrentNewsComponent {

  constructor(public injector: Injector)
  {
    super(injector);
  }
}
