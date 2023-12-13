import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileAccountPageType1Pay3000Component } from './mobile-account-page-type1-pay3000.component';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType1Pay3000Component
    }
];

@NgModule({
    declarations: [MobileAccountPageType1Pay3000Component],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        DatePipe
    ]
})

export class MobileAccountPageType1Pay3000Module {

}
