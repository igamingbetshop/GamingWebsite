import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidation {
  static matchTo(control: AbstractControl): ValidationErrors {
    const isInvalid = control.value !== this['value'];
    return !isInvalid ? null : { matchTo: isInvalid };
  }
}
