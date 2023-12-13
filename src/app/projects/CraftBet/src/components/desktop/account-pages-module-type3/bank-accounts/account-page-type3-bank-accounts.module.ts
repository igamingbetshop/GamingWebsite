import { NgModule } from '@angular/core';
import { GetPaymentsService } from '@core/services/app/getPayments.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { AccountPageType3BankAccountsComponent } from './account-page-type3-bank-accounts.component';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import {DesktopModule} from "../../desktop.module";

@NgModule({
    declarations: [AccountPageType3BankAccountsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        ToNumberPipeModule,
        DesktopModule
    ],
    providers: [
        ProfileService,
        GetPaymentsService
    ]
})

export class AccountPageType3BankAccountsModule {
    getComponent() {
        return AccountPageType3BankAccountsComponent;
    }
}
