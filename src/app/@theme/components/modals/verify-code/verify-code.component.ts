import {Component, Injector, ViewEncapsulation} from '@angular/core';
import {BaseVerifyCode} from '../../register/types/base-verify-code.';

@Component({
  selector: 'common-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class VerifyCodeComponent extends BaseVerifyCode {
  public logoUrl: string = '';
  constructor(public injector: Injector) {
    super(injector);
  }
  errorHandler(event) {
    event.target.src = '../../../../../../../assets/images/logo.png';
  }
}
