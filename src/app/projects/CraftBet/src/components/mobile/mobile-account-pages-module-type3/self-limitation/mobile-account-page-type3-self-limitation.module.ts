import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { MobileAccountPageType3SelfLimitationComponent } from './mobile-account-page-type3-self-limitation.component';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3SelfLimitationComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3SelfLimitationComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseDirectiveModule,
        DropdownDirectiveModule,
        RouterModule.forChild(routes),
        SanitizerModule
    ]
})

export class MobileAccountPageType3SelfLimitationModule {

}
