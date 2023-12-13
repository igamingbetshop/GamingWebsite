import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageType3SelfLimitationComponent } from './account-page-type3-self-limitation.component';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';

@NgModule({
    declarations: [AccountPageType3SelfLimitationComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseDirectiveModule,
        DropdownDirectiveModule,
        SanitizerModule
    ]
})

export class AccountPageType3SelfLimitationModule {
    getComponent() {
        return AccountPageType3SelfLimitationComponent;
    }
}
