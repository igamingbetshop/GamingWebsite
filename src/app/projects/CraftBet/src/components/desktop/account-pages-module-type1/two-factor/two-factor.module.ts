import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QRCodeModule } from 'angularx-qrcode';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { TwoFactorComponent } from './two-factor.component';
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

const routes: Routes = [
    {
        path: '',
        component: TwoFactorComponent
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
        TwoFactorComponent
    ],
    providers: [
        ProfileService
    ]
})

export class TwoFactorModule {

}
