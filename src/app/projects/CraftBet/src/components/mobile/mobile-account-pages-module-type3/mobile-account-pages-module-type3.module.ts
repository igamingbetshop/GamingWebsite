import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SimpleModalModule } from 'ngx-simple-modal';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxMaskModule } from 'ngx-mask';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxPrintModule } from 'ngx-print';
import { ThemeModule } from '../../../../../../@theme/theme.module';
import { DesktopMobileCommonModule } from '../../common/common.module';
import { OrderByPipeModule } from '../../../../../../@theme/pipes/order-by/order-by-pipe.module';
import { CommonMessageModalModule } from '../../common/app-common-message-modal/common-message-modal.module';
import { MobileUserInfoModule } from '../mobile-user-info/mobile-user-info.module';
import { TriggersModule } from '../../../../../../@theme/components/common/base-triggers/triggers.module';
import { CommonBankMessageModalModule } from '../../common/app-common-bank-message-modal/common-bank-message-modal.module';
import { ExportDataService, LocalStorageService } from '../../../../../../@core/services';
import { FriendsService } from '../../../../../../@core/services/api/friends.service';
import { GetSettingsService } from '../../../../../../@core/services/app/getSettings.service';
import { BonusesService } from '../../../../../../@core/services/api/bonuses.service';
import { GetBetsHistoryService } from '../../../../../../@core/services/app/getBetsHistory.service';
import { BetsService } from '../../../../../../@core/services/app/bets.services';
import { GetTransactionsService } from '../../../../../../@core/services/app/getTransactions.service';
import { GetPaymentsService } from '../../../../../../@core/services/app/getPayments.service';
import { PaymentControllerService } from '../../../../../../@core/services/app/paymentController.services';
import { ProfileService } from '../../../../../../@theme/components/profile/service/profile.service';
import { SanitizerModule } from '../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { ToNumberPipeModule } from '../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { MobileAccountPagesModuleType3RoutingModule } from './mobile-account-pages-module-type3-routing.module';
import { MobileAccountPageType3DefaultComponent } from './default/mobile-account-page-type3-default.component';
import { HorizontalScrollDirectiveModule } from '../../../../../../@theme/directives/horizontal-scroll/horizontal-scroll.directive.module';
import { MobileAccountPageType3OpenTicketsComponent } from './open-tickets/mobile-account-page-type3-open-tickets.component';
import { MobileAccountPageType3AddBankAccountsComponent } from './add-bank-accounts/mobile-account-page-type3-add-bank-accounts.component';

@NgModule({
    declarations: [
        MobileAccountPageType3DefaultComponent,
        MobileAccountPageType3OpenTicketsComponent,
        MobileAccountPageType3AddBankAccountsComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MobileAccountPagesModuleType3RoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SimpleModalModule,
        HttpClientModule,
        FilterPipeModule,
        NgxMaskModule.forRoot(),
        ClickOutsideModule,
        NgxPrintModule,
        ThemeModule,
        DesktopMobileCommonModule,
        OrderByPipeModule,
        CommonMessageModalModule,
        MobileUserInfoModule,
        TriggersModule,
        CommonBankMessageModalModule,
        SanitizerModule,
        ToNumberPipeModule,
        HorizontalScrollDirectiveModule
    ],
    providers: [
        ExportDataService,
        FriendsService,
        GetSettingsService,
        BonusesService,
        GetBetsHistoryService,
        BetsService,
        GetTransactionsService,
        GetPaymentsService,
        PaymentControllerService,
        ProfileService,
        LocalStorageService
    ]
})

export class MobileAccountPagesModuleType3Module {
    constructor() {
    }
}
