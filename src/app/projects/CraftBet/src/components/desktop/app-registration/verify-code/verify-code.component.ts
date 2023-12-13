import {Component, forwardRef} from '@angular/core';
import {BaseVerifyCode} from "../../../../../../../@theme/components/register/types/base-verify-code.";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'verify-code-type',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VerifyCodeComponent),
      multi: true
    }
  ]
})
export class VerifyCodeComponent extends BaseVerifyCode {



}
