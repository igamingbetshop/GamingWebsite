import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { MobileAccountPageType3CreditCheckComponent } from './mobile-account-page-type3-credit-check.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3CreditCheckComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3CreditCheckComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        RouterModule.forChild(routes)
    ]
})
export class MobileAccountPageType3CreditCheckModule {

}
