import { Component, Injector } from '@angular/core';
import {CommonGetTextComponent} from '../../common/common-get-text/common-get-text.component';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent extends CommonGetTextComponent {

  constructor( public injector: Injector ) {
    super(injector);
  }

}
