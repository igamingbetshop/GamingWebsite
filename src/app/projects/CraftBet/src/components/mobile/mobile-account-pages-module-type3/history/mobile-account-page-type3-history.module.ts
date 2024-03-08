import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownDirectiveModule } from '../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseDirectiveModule } from '../../../../../../../@theme/directives/collapse/collapse-directive.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BetsService } from '../../../../../../../@core/services/app/bets.services';
import { ExportDataService } from '../../../../../../../@core/services';
import { GetBetsHistoryService } from '../../../../../../../@core/services/app/getBetsHistory.service';
import { MobileAccountPageType3HistoryComponent } from './mobile-account-page-type3-history.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3HistoryComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3HistoryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        DropdownDirectiveModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseDirectiveModule,
        NgxPaginationModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        BetsService,
        ExportDataService,
        GetBetsHistoryService
    ]
})

export class MobileAccountPageType3HistoryModule {

}
