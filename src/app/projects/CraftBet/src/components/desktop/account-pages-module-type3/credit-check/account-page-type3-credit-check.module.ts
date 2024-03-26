import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { AccountPageType3CreditCheckComponent } from './account-page-type3-credit-check.component';

@NgModule({
    declarations: [AccountPageType3CreditCheckComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
    ]
})

export class AccountPageType3CreditModule {
    getComponent() {
        return AccountPageType3CreditCheckComponent;
    }
}
