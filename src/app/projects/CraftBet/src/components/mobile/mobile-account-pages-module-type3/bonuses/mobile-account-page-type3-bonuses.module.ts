import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileAccountPageType3BonusesComponent } from './mobile-account-page-type3-bonuses.component';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { PaymentControllerService } from '../../../../../../../@core/services/app/paymentController.services';
import { BonusesService } from '../../../../../../../@core/services/api/bonuses.service';
import { GetBetsHistoryService } from '../../../../../../../@core/services/app/getBetsHistory.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3BonusesComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3BonusesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        ToNumberPipeModule,
        RouterModule.forChild(routes),
        NgxPaginationModule,
        FontAwesomeModule,
        DropdownDirectiveModule,
        CollapseDirectiveModule
    ],
    providers: [
        PaymentControllerService,
        BonusesService,
        GetBetsHistoryService,
        DatePipe
    ]
})

export class MobileAccountPageType3BonusesModule {
    
}
