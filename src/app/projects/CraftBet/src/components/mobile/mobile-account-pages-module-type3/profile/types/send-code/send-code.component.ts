import { Component } from '@angular/core';
import { BaseSendCode } from '../../../../../../../../../@theme/components/profile/types/send-code/base-send-code';

@Component({
  selector: 'app-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent extends BaseSendCode {
  toggleEdit() {
    this.profileService.changeEditState({value: !this.profileService.getEditState.value, isReset: false});
  }
}
