import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccountPageType3PaymentComponent } from './account-page-type3-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';

@NgModule({
    declarations: [AccountPageType3PaymentComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule
    ],
    providers: [
        DatePipe
    ]
})

export class AccountPageType3PaymentModule {
    getComponent() {
        return AccountPageType3PaymentComponent;
    }
}
