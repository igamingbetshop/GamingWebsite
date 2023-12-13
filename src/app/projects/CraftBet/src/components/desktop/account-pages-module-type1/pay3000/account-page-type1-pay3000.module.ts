import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { AccountPageType1Pay3000Component } from './account-page-type1-pay3000.component';

const routes: Routes = [
    {
        path: '',
        component: AccountPageType1Pay3000Component
    }
];

@NgModule({
    declarations: [AccountPageType1Pay3000Component],
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

export class AccountPageType1Pay3000Module {

}
