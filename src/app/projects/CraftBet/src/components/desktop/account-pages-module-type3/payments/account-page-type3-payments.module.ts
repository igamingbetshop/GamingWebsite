import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { AccountPageType3PaymentsComponent } from './account-page-type3-payments.component';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';

@NgModule({
    declarations: [AccountPageType3PaymentsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        CollapseDirectiveModule,
        NgxPaginationModule,
        DropdownDirectiveModule
    ],
    providers: [
        DatePipe
    ]
})

export class AccountPageType3PaymentsModule {
    getComponent() {
        return AccountPageType3PaymentsComponent;
    }
}
