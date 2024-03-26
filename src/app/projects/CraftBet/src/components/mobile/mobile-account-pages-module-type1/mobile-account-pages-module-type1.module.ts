import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MobileAccountPageType1SettingsComponent} from './settings/mobile-account-page-type1-settings.component';
import {MobileAccountPageType1FriendsComponent} from './friends/mobile-account-page-type1-friends.component';
import {MobileAccountPageType1BetsComponent} from './bets/mobile-account-page-type1-bets.component';
import {MobileAccountPageType1PaymentsComponent} from './payments/mobile-account-page-type1-payments.component';
import {MobileAccountPageType1TransactionsComponent} from './transactions/mobile-account-page-type1-transactions.component';
import {MobileAccountPageType1BonusesComponent} from './bonuses/mobile-account-page-type1-bonuses.component';
import {MobileAccountPageType1TicketsComponent} from './tickets/mobile-account-page-type1-tickets.component';
import {MobileAccountPageType1StatementComponent} from './statement/mobile-account-page-type1-statement.component';
import {MobileAccountPageType1DefaultComponent} from './default/mobile-account-page-type1-default.component';
import {MobileAccountPageType1BettingStatmentItemComponent} from './betting-statment-item/mobile-account-page-type1-betting-statment-item.component';
import {MobileAccountPageType1AnnouncementsComponent} from './announcements/mobile-account-page-type1-announcements.component';
import {MobileAccountPageType1BanksAccountsComponent} from './banks-accounts/mobile-account-page-type1-banks-accounts.component';
import {MobileAccountPageType1OpenTicketsComponent} from './open-tickets/mobile-account-page-type1-open-tickets.component';
import {MobileAccountPageType1HistoryComponent} from './history/mobile-account-page-type1-history.component';
import {MobileAccountPagesModuleType1RoutingModule} from "./mobile-account-pages-module-type1-routing.module";
import {TranslateModule} from '@ngx-translate/core';
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {NgxPrintModule} from "ngx-print";
import {MobileAccountPageType1AddBankAccountComponent} from './add-bank-account/mobile-account-page-type1-add-bank-account.component';
import {MobileAccountPageType1UserInfoComponent} from './user-info/mobile-account-page-type1-user-info.component';
import {MobileAccountPageType1BettingStatementSportComponent} from './betting-statement-sport/mobile-account-page-type1-betting-statement-sport.component';
import {ThemeModule} from "../../../../../../@theme/theme.module";
import {DesktopMobileCommonModule} from "../../common/common.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {OrderByPipeModule} from "../../../../../../@theme/pipes/order-by/order-by-pipe.module";
import {CommonMessageModalModule} from "../../common/app-common-message-modal/common-message-modal.module";
import {ExportDataService} from "../../../../../../@core/services";
import {FriendsService} from "../../../../../../@core/services/api/friends.service";
import {GetSettingsService} from "../../../../../../@core/services/app/getSettings.service";
import {BonusesService} from "../../../../../../@core/services/api/bonuses.service";
import {GetBetsHistoryService} from "../../../../../../@core/services/app/getBetsHistory.service";
import {BetsService} from "../../../../../../@core/services/app/bets.services";
import {GetTransactionsService} from "../../../../../../@core/services/app/getTransactions.service";
import {GetPaymentsService} from "../../../../../../@core/services/app/getPayments.service";
import {PaymentControllerService} from "../../../../../../@core/services/app/paymentController.services";
import { MobileChangePasswordComponent } from './change-password/mobile-change-password.component';
import { MobileSelfLimitationComponent } from './self-limitation/mobile-self-limitation.component';
import {CommonBankMessageModalModule} from "../../common/app-common-bank-message-modal/common-bank-message-modal.module";
import {HorizontalScrollDirectiveModule} from "../../../../../../@theme/directives/horizontal-scroll/horizontal-scroll.directive.module";
import {DropdownDirectiveModule} from "../../../../../../@theme/directives/dropdown/dropdown-directive.module";
import {NgxMaskDirective} from "ngx-mask";


@NgModule({
    declarations: [
        MobileAccountPageType1SettingsComponent,
        MobileAccountPageType1FriendsComponent,
        MobileAccountPageType1BetsComponent,
        MobileAccountPageType1PaymentsComponent,
        MobileAccountPageType1TransactionsComponent,
        MobileAccountPageType1BonusesComponent,
        MobileAccountPageType1TicketsComponent,
        MobileAccountPageType1StatementComponent,
        MobileAccountPageType1DefaultComponent,
        MobileAccountPageType1BettingStatmentItemComponent,
        MobileAccountPageType1AnnouncementsComponent,
        MobileAccountPageType1BanksAccountsComponent,
        MobileAccountPageType1OpenTicketsComponent,
        MobileAccountPageType1HistoryComponent,
        MobileAccountPageType1AddBankAccountComponent,
        MobileAccountPageType1UserInfoComponent,
        MobileAccountPageType1BettingStatementSportComponent,
        MobileChangePasswordComponent,
        MobileSelfLimitationComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MobileAccountPagesModuleType1RoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        HttpClientModule,
        NgxMaskDirective,
        NgxPrintModule,
        ThemeModule,
        DesktopMobileCommonModule,
        OrderByPipeModule,
        CommonMessageModalModule,
        CommonBankMessageModalModule,
        HorizontalScrollDirectiveModule,
        DropdownDirectiveModule
    ],

    providers:[
        ExportDataService,
        FriendsService,
        GetSettingsService,
        BonusesService,
        GetBetsHistoryService,
        BetsService,
        GetTransactionsService,
        GetPaymentsService,
        PaymentControllerService,
        DatePipe
    ]
})
export class MobileAccountPagesModuleType1Module {
    constructor() {}
}
