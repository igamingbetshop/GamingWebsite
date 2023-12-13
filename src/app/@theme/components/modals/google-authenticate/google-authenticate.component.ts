import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import {UtilityService} from "@core/services/app/utility.service";

@Component({
  selector: 'app-google-authenticate',
  templateUrl: './google-authenticate.component.html',
  styleUrls: ['./google-authenticate.component.scss']
})
export class GoogleAuthenticateComponent extends SimpleModalComponent<any, boolean> {
  public twoFactorCode: any;
  public isCodeValid = false;
  public errorMessage:string;
  @Output('onVerified') onVerified: EventEmitter<any> = new EventEmitter<any>();
  @Input('prefixTitle') prefixTitle: string;
  private utilsService: UtilityService;

  callBack = (data:any) =>
  {
    if(data.hasOwnProperty('error'))
      this.utilsService.showMessageWithDelay(this, [{ errorMessage: data.error }]);
    else this.close();
  }

  constructor(protected injector: Injector) {
    super();
    this.utilsService = injector.get(UtilityService);
  }

  confirm() {
      this.onVerified.emit({ code: this.twoFactorCode, callBack: this.callBack, error: this.errorMessage });
  }
  cancel() {
    this.close();
  }

  preventKeys(event: KeyboardEvent) {
    const key = event.key;
    if (key === '+' || key === '-' || key === '.') {
      event.preventDefault();
    }
  }

  isMaxReached() {
    return +this.twoFactorCode > 999999;
  }

  validateTwoFactorCode() {
    this.isCodeValid = this.twoFactorCode.length === 6;
    if (this.twoFactorCode && this.twoFactorCode.toString().length === 6) {
      this.isCodeValid = true;
    } else {
      this.isCodeValid = false;
    }
  }

  onInput(event) {
    const input = <HTMLInputElement>event.target;
    let value = input.value;
    value = value.replace(/\D/g, '');
    if (value.length > 0 && isNaN(parseInt(value[0]))) {
      input.value = '';
    } else {
      input.value = value;
      this.twoFactorCode = value;
    }
    this.validateTwoFactorCode();
  }
}
