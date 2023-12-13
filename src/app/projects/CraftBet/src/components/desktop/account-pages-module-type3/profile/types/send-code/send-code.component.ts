import {Component, ViewChild} from '@angular/core';
import { BaseSendCode } from '../../../../../../../../../@theme/components/profile/types/send-code/base-send-code';

@Component({
  selector: 'send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent extends BaseSendCode {
  @ViewChild('emailData') emailData: HTMLInputElement;

  toggleEdit() {
    this.profileService.changeEditState({value: !this.profileService.getEditState.value, isReset: false});
    this.focusInput(this.emailData);
  }

  focusInput(input: HTMLInputElement) {
    if (this.profileService.getEditState.value === true && this.profileService.getEditState.isReset === false) {
      input.focus();
    }
  }

}
