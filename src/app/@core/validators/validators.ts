import {AbstractControl} from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export class Validator {
  static noWhitespaceValidator(control: AbstractControl) {
    if (control.value) {
      const isWhitespace = (control.value.toString() || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : {required: true};
    }
    return {required: true};
  };

  static onlyNumber(control: AbstractControl): ValidationResult {
    let numberRegExp = /^[0-9]+$/;
    let value = control.value;
    if (!numberRegExp.test(value) && value !== '') {
      return {number: true}
    }
    return null;
  }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('Password').value;
    let confirmPassword = AC.get('ConfirmPassword').value;
    if (password != confirmPassword) {
      AC.get('ConfirmPassword').setErrors({MatchPassword: true})
    } else {
      return null;
    }
  }

  static luhnCheck(control: AbstractControl) {
    if (control.value) {
      const num = control.value.toString();
      var sum = 0, nDigit = 0, even = false;
      for (var i = num.length - 1; i >= 0; i--) {
        nDigit = parseInt(num.charAt(i), 10);
        if (even) {
          nDigit = nDigit * 2;
          if (nDigit > 9) {
            nDigit = 1 + (nDigit % 10);
          }
        }
        sum += nDigit;
        even = !even;
      }

      if (sum % 10 === 0) {
        return {luhnCheck: 'error'};
      }
    }

    return null;
  }


  static phonenumber(inputtxt: AbstractControl) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if ((inputtxt.value.match(phoneno))) {
      return true;
    } else {
      alert("message");
      return false;
    }
  }

}
