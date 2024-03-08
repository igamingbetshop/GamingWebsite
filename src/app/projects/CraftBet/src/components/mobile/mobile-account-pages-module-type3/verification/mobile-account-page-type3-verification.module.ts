import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { MobileAccountPageType3VerificationComponent } from './mobile-account-page-type3-verification.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3VerificationComponent
    }
];
@NgModule({
    declarations: [MobileAccountPageType3VerificationComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SanitizerModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        ProfileService
    ]
})

export class MobileAccountPageType3VerificationModule {
}
