import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageType3DocumentVerificationComponent } from './account-page-type3-document-verification.component';
import { GetSettingsService } from '../../../../../../../@core/services/app/getSettings.service';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';

@NgModule({
    declarations: [AccountPageType3DocumentVerificationComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DropdownDirectiveModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        GetSettingsService
    ]
})

export class AccountPageType3DocumentVerificationModule {
    getComponent() {
        return AccountPageType3DocumentVerificationComponent;
    }
}
