import {Component, EventEmitter, inject, Injector, Input, OnInit, Output} from '@angular/core';
import {UtilityService} from "@core/services/app/utility.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-google-authenticate',
  templateUrl: './google-authenticate.component.html',
  styleUrls: ['./google-authenticate.component.scss']
})
export class GoogleAuthenticateComponent implements OnInit{
  public twoFactorCode: any;
  public isCodeValid = false;
  public errorMessage:string;
  @Output('onVerified') onVerified: EventEmitter<any> = new EventEmitter<any>();
  @Input('prefixTitle') prefixTitle: string;
  private utilsService: UtilityService;

  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<GoogleAuthenticateComponent>);

  callBack = (data:any) =>
  {
    if(data.hasOwnProperty('error'))
      this.utilsService.showMessageWithDelay(this, [{ errorMessage: data.error }]);
    else  this.dialogRef.close();
  }

  constructor(protected injector: Injector) {
    this.utilsService = injector.get(UtilityService);
  }

  ngOnInit()
  {
    this.prefixTitle = this.data.prefixTitle || this.prefixTitle;
    this.onVerified =  this.data.onVerified || this.onVerified;
  }

  confirm() {
      this.onVerified.emit({ code: this.twoFactorCode, callBack: this.callBack, error: this.errorMessage });
  }
  cancel() {
    this.dialogRef.close();
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
