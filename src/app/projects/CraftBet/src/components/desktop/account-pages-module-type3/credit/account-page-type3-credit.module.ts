import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { AccountPageType3CreditComponent } from './account-page-type3-credit.component';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { PaymentControllerService } from '../../../../../../../@core/services/app/paymentController.services';
import { BonusesService } from '../../../../../../../@core/services/api/bonuses.service';
import {CollapseDirectiveModule} from "../../../../../../../@theme/directives/collapse/collapse-directive.module";
import {AccountPageType3DepositBlockModule} from "../deposit-block/account-page-type3-deposit-block.module";
import {AccountPageType3WithdrawBlockModule} from "../withdraw-block/account-page-type3-withdraw-block.module";

@NgModule({
    declarations: [AccountPageType3CreditComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        ToNumberPipeModule,
        CollapseDirectiveModule,
        AccountPageType3DepositBlockModule,
        AccountPageType3WithdrawBlockModule
    ],
    providers: [
        PaymentControllerService,
        BonusesService
    ]
})

export class AccountPageType3CreditModule {
    getComponent() {
        return AccountPageType3CreditComponent;
    }
}
