import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccountPageType3VerificationComponent } from './account-page-type3-verification.component';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import {DropdownDirectiveModule} from "../../../../../../../@theme/directives/dropdown/dropdown-directive.module";

@NgModule({
    declarations: [AccountPageType3VerificationComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SanitizerModule,
        DropdownDirectiveModule
    ],
    providers: [
        ProfileService
    ]
})

export class AccountPageType3VerificationModule {
    getComponent() {
        return AccountPageType3VerificationComponent;
    }
}
