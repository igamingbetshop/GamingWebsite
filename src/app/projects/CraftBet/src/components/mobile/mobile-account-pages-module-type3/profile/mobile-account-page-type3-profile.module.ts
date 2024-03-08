import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { MobileAccountPageType3ProfileComponent } from './mobile-account-page-type3-profile.component';
import { MobileAccountPageType3ChangePasswordComponent } from '../change-password/mobile-account-page-type3-change-password.component';
import { LayoutService } from '../../../../../../../@core/services/app/layout.service';
import { OnlyNumberDirectiveModule } from '../../../../../../../@theme/directives/only-number/only-number.directive.module';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { LanguageModule } from '../../../../../../../@theme/components/global-language/language.module';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3ProfileComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3ProfileComponent, MobileAccountPageType3ChangePasswordComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        CollapseDirectiveModule,
        OnlyNumberDirectiveModule,
        SanitizerModule,
        LanguageModule
    ],
    providers: [
        ProfileService,
        LayoutService
    ]
})
export class MobileAccountPageType3ProfileModule {

}
