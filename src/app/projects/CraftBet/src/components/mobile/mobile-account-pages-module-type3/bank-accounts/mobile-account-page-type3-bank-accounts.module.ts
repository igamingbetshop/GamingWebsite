import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileAccountPageType3BankAccountsComponent } from './mobile-account-page-type3-bank-accounts.component';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { GetPaymentsService } from '../../../../../../../@core/services/app/getPayments.service';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3BankAccountsComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3BankAccountsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        ToNumberPipeModule
    ],
    providers: [
        ProfileService,
        GetPaymentsService
    ]
})

export class MobileAccountPageType3BankAccountsModule {
    
}
