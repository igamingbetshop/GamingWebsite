import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageType3ProfileComponent } from './account-page-type3-profile.component';
import { AccountPageType3ChangePasswordComponent } from '../change-password/account-page-type3-change-password.component';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';

@NgModule({
    declarations: [AccountPageType3ProfileComponent, AccountPageType3ChangePasswordComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        CollapseDirectiveModule
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
