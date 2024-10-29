import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { BaseTwoFactor } from '../../../../../../../@theme/components/common/base-two-factor/base-two-factor';

@Component({
    selector: 'app-two-factor',
    templateUrl: './two-factor.component.html',
    styleUrls: ['./two-factor.component.scss']
})

export class TwoFactorComponent extends BaseTwoFactor {

    @ViewChildren('inputRef') inputRefs!: QueryList<ElementRef>;
    public twoFactorDigits: string[] = ['', '', '', '', '', ''];

    public digits: any[] = ['', '', '', '', '', ''];



    onDigitInput(event: any, index: number) {
        this.twoFactorDigits[index] = event.target.value.replace(/\D/g, '').slice(0, 1);
        this.validateTwoFactorCode();


        if (this.twoFactorDigits[index].length === 1 && index < this.twoFactorDigits.length - 1) {
            this.inputRefs.toArray()[index + 1].nativeElement.focus();
        }
    }


    validateTwoFactorCode() {
        this.isCodeValid = this.twoFactorDigits.every(digit => digit.length === 1);
    }


    copyAddress(copyText: HTMLElement) {
        const text = copyText.innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}
