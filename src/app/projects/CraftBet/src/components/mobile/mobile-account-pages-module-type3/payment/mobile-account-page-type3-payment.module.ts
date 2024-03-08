import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { MobileAccountPageType3PaymentComponent } from './mobile-account-page-type3-payment.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3PaymentComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3PaymentComponent],
    imports: [
        RouterModule.forChild(routes),
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

export class MobileAccountPageType3PaymentModule {

}
