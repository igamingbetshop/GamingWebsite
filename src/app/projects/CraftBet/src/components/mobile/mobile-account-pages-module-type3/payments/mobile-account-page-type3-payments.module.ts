import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { MobileAccountPageType3PaymentsComponent } from './mobile-account-page-type3-payments.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3PaymentsComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3PaymentsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        CollapseDirectiveModule,
        NgxPaginationModule,
        DropdownDirectiveModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        DatePipe
    ]
})

export class MobileAccountPageType3PaymentsModule {

}
