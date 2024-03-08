import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { GetSettingsService } from '../../../../../../../@core/services/app/getSettings.service';
import { MobileAccountPageType3DocumentVerificationComponent } from './mobile-account-page-type3-document-verification.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3DocumentVerificationComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3DocumentVerificationComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DropdownDirectiveModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        GetSettingsService
    ]
})

export class MobileAccountPageType3DocumentVerificationModule {
    
}
