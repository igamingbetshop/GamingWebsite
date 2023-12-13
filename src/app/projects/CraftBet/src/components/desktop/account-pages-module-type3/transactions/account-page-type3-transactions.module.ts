import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountPageType3TransactionsComponent } from './account-page-type3-transactions.component';
import { GetBetsHistoryService } from '../../../../../../../@core/services/app/getBetsHistory.service';
import { BetsService } from '../../../../../../../@core/services/app/bets.services';
import { GetTransactionsService } from '../../../../../../../@core/services/app/getTransactions.service';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';

@NgModule({
    declarations: [AccountPageType3TransactionsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DropdownDirectiveModule,
        NgxPaginationModule,
        CollapseDirectiveModule
    ],
    providers: [
        GetBetsHistoryService,
        BetsService,
        GetTransactionsService
    ]
})

export class AccountPageType3TransactionsModule {
    getComponent() {
        return AccountPageType3TransactionsComponent;
    }
}
