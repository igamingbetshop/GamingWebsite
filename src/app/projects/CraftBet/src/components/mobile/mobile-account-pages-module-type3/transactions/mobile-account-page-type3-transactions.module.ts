import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { GetBetsHistoryService } from '../../../../../../../@core/services/app/getBetsHistory.service';
import { BetsService } from '../../../../../../../@core/services/app/bets.services';
import { GetTransactionsService } from '../../../../../../../@core/services/app/getTransactions.service';
import { MobileAccountPageType3TransactionsComponent } from './mobile-account-page-type3-transactions.component';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3TransactionsComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3TransactionsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DropdownDirectiveModule,
        NgxPaginationModule,
        CollapseDirectiveModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        GetBetsHistoryService,
        BetsService,
        GetTransactionsService
    ]
})

export class MobileAccountPageType3TransactionsModule {

}
