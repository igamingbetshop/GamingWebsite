import { Component, Injector } from '@angular/core';
import {CommonGetTextComponent} from '../../common/common-get-text/common-get-text.component';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent extends CommonGetTextComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
