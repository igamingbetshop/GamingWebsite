import { Component } from '@angular/core';
import { BaseTwoFactor } from '../../../../../../../@theme/components/common/base-two-factor/base-two-factor';

@Component({
    selector: 'app-two-factor',
    templateUrl: './two-factor.component.html',
    styleUrls: ['./two-factor.component.scss']
})

export class TwoFactorComponent extends BaseTwoFactor {


    copyAddress(copyText: HTMLElement) {
        const text = copyText.innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}
