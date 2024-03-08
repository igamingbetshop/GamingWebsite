import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageType3ProfileComponent } from './account-page-type3-profile.component';
import { AccountPageType3ChangePasswordComponent } from '../change-password/account-page-type3-change-password.component';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import {LanguageModule} from "../../../../../../../@theme/components/global-language/language.module";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {OnlyNumberDirectiveModule} from "../../../../../../../@theme/directives/only-number/only-number.directive.module";

@NgModule({
    declarations: [AccountPageType3ProfileComponent, AccountPageType3ChangePasswordComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        CollapseDirectiveModule,
        LanguageModule,
        SanitizerModule,
        OnlyNumberDirectiveModule
    ],
    providers: [
        ProfileService
    ]
})

export class AccountPageType3ProfileModule {
    getComponent() {
        return AccountPageType3ProfileComponent;
    }
}
