import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QRCodeModule } from 'angularx-qrcode';
import { MobileAccountPageType2TwoFactorComponent } from './mobile-account-page-type2-two-factor.component';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType2TwoFactorComponent
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
        MobileAccountPageType2TwoFactorComponent
    ],
    providers: [
        ProfileService
    ]
})

export class MobileAccountPageType2TwoFactorModule {
    getComponent() {
        return MobileAccountPageType2TwoFactorComponent;
    }
}
