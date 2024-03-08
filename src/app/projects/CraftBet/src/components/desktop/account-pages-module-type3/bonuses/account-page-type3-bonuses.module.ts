import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageType3BonusesComponent } from './account-page-type3-bonuses.component';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { PaymentControllerService } from '../../../../../../../@core/services/app/paymentController.services';
import { BonusesService } from '../../../../../../../@core/services/api/bonuses.service';
import { GetBetsHistoryService } from '../../../../../../../@core/services/app/getBetsHistory.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CollapseDirectiveModule} from "../../../../../../../@theme/directives/collapse/collapse-directive.module";

@NgModule({
    declarations: [AccountPageType3BonusesComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        SanitizerModule,
        ToNumberPipeModule,
        FontAwesomeModule,
        CollapseDirectiveModule,
    ],
    providers: [
        PaymentControllerService,
        BonusesService,
        GetBetsHistoryService,
        DatePipe
    ]
})

export class AccountPageType3BonusesModule {
    getComponent() {
        return AccountPageType3BonusesComponent;
    }
}
