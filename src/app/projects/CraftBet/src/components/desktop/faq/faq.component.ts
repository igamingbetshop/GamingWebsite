import { Component, Injector } from '@angular/core';
import {CommonGetTextComponent} from '../../common/common-get-text/common-get-text.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends CommonGetTextComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
