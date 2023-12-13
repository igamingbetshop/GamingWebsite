import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageType3HistoryComponent } from './account-page-type3-history.component';
import { BetsService } from '../../../../../../../@core/services/app/bets.services';
import { ExportDataService } from '../../../../../../../@core/services';
import { GetBetsHistoryService } from '../../../../../../../@core/services/app/getBetsHistory.service';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';


@NgModule({
    declarations: [AccountPageType3HistoryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DropdownDirectiveModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseDirectiveModule,
        NgxPaginationModule
    ],
    providers: [
        BetsService,
        ExportDataService,
        GetBetsHistoryService
    ]
})

export class AccountPageType3HistoryModule {
    getComponent() {
        return AccountPageType3HistoryComponent;
    }
}
