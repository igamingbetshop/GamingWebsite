import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QRCodeModule } from 'angularx-qrcode';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { MobileAccountPageType1TwoFactorComponent } from './mobile-account-page-type1-two-factor.component';
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType1TwoFactorComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule.forChild(routes),
        FontAwesomeModule,
        QRCodeModule,
        FormsModule,
        SanitizerModule
    ],
    declarations: [
        MobileAccountPageType1TwoFactorComponent
    ],
    providers: [
        ProfileService
    ]
})

export class MobileAccountPageType1TwoFactorModule {
    getComponent() {
        return MobileAccountPageType1TwoFactorComponent;
    }
}
