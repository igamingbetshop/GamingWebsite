import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { PaymentControllerService } from '../../../../../../../@core/services/app/paymentController.services';
import { BonusesService } from '../../../../../../../@core/services/api/bonuses.service';
import { MobileAccountPageType3CreditComponent } from './mobile-account-page-type3-credit.component';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { MobileDepositBlockModule } from '../mobile-deposit-block/deposit-block.module';
import { MobileWithdrawBlockModule } from '../mobile-withdraw-block/withdraw-block.module';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3CreditComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3CreditComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        ToNumberPipeModule,
        RouterModule.forChild(routes),
        CollapseDirectiveModule,
        MobileDepositBlockModule,
        MobileWithdrawBlockModule
    ],
    providers: [
        PaymentControllerService,
        BonusesService
    ]
})

export class MobileAccountPageType3CreditModule {

}
