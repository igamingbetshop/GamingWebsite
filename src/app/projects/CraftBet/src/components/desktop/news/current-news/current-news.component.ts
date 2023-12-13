import {Component, Injector} from '@angular/core';
import {BaseCurrentNewsComponent} from "../../../../../../../@theme/components/common/news/base-current-news.component";

@Component({
  selector: 'current-news',
  templateUrl: './current-news.component.html'
})
export class CurrentNewsComponent extends BaseCurrentNewsComponent {

  constructor(public injector: Injector)
  {
    super(injector);
  }
}
