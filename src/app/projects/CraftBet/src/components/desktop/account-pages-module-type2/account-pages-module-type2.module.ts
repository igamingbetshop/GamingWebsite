import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AccountPageType2MenuComponent} from './menu/account-page-type2-menu.component';
import {AccountPageType2StatementComponent} from './statement/account-page-type2-statement.component';
import {AccountPageType2MenuStatementComponent} from './menu-statement/account-page-type2-menu-statement.component';
import {AccountPageType2TicketsComponent} from './tickets/account-page-type2-tickets.component';
import {AccountPageType2BonusesComponent} from './bonuses/account-page-type2-bonuses.component';
import {AccountPageType2BetsComponent} from './bets/account-page-type2-bets.component';
import { AccountPageType2FriendsComponent } from './friends/account-page-type2-friends.component';
import { AccountPageType2SettingsComponent } from './settings/account-page-type2-settings.component';
import { AccountPageType2TransactionsComponent } from './transactions/account-page-type2-transactions.component';
import { AccountPageType2DefaultComponent } from './default/account-page-type2-default.component';
import { AccountPageType2HistoryDefaultComponent } from './history-default/account-page-type2-history-default.component';
import { AccountPageType2SelfLimitationComponent } from './self-limtation/account-page-type2-self-limitation.component';
import { AccountPageType2BettingStatmentItemComponent } from './betting-statment-item/account-page-type2-betting-statment-item.component';
import { AccountPageType2BettingStatmentSportItemComponent } from './betting-statment-sport-item/account-page-type2-betting-statment-sport-item.component';
import { AccountPageType2AnnouncementsComponent } from './announcements/account-page-type2-announcements.component';
import { AccountPageType2BankAccountsComponent } from './bank-accounts/account-page-type2-bank-accounts.component';
import { AccountPageType2OpenTicketsComponent } from './open-tickets/account-page-type2-open-tickets.component';
import { AccountPageType2HistoryComponent } from './history/account-page-type2-history.component';
import {AccountPagesModuleType2RoutingModule} from "./account-pages-module-type2-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {SimpleModalModule} from "ngx-simple-modal";
import {HttpClientModule} from "@angular/common/http";
import {FilterPipeModule} from "ngx-filter-pipe";
import {NgxMaskModule} from "ngx-mask";
import {ClickOutsideModule} from "ng-click-outside";
import {NgxPrintModule} from "ngx-print";
import {ThemeModule} from "../../../../../../@theme/theme.module";
import { AccountPageType2PaymentsComponent } from './payments/account-page-type2-payments.component';
import { AccountPageType2ChangePasswordComponent } from './change-password/account-page-type2-change-password.component';
import {GlobalLogoutModule} from "../../../../../../@theme/components/global-logout/global-logout.module";
import {GetSettingsService} from "../../../../../../@core/services/app/getSettings.service";
import {FriendsService} from "../../../../../../@core/services/api/friends.service";
import {BonusesService} from "../../../../../../@core/services/api/bonuses.service";
import {GetBetsHistoryService} from "../../../../../../@core/services/app/getBetsHistory.service";
import {PaymentControllerService} from "../../../../../../@core/services/app/paymentController.services";
import {BetsService} from "../../../../../../@core/services/app/bets.services";
import {GetTransactionsService} from "../../../../../../@core/services/app/getTransactions.service";
import {GetPaymentsService} from "../../../../../../@core/services/app/getPayments.service";
import {CollapseDirectiveModule} from "../../../../../../@theme/directives/collapse/collapse-directive.module";
import {AccountPageType2VerificationComponent} from "./verification/account-page-type2-verification.component";
import {ProfileService} from "../../../../../../@theme/components/profile/service/profile.service";
import {ExportDataService} from "../../../../../../@core/services";
import {DesktopModule} from "../desktop.module";

@NgModule({
  declarations: [
    AccountPageType2MenuComponent,
    AccountPageType2StatementComponent,
    AccountPageType2MenuStatementComponent,
    AccountPageType2TicketsComponent,
    AccountPageType2BonusesComponent,
    AccountPageType2BetsComponent,
    AccountPageType2FriendsComponent,
    AccountPageType2SettingsComponent,
    AccountPageType2TransactionsComponent,
    AccountPageType2DefaultComponent,
    AccountPageType2HistoryDefaultComponent,
    AccountPageType2SelfLimitationComponent,
    AccountPageType2BettingStatmentItemComponent,
    AccountPageType2BettingStatmentSportItemComponent,
    AccountPageType2AnnouncementsComponent,
    AccountPageType2BankAccountsComponent,
    AccountPageType2OpenTicketsComponent,
    AccountPageType2HistoryComponent,
    AccountPageType2PaymentsComponent,
    AccountPageType2ChangePasswordComponent,
    AccountPageType2VerificationComponent
  ],
    imports: [
        CommonModule,
        AccountPagesModuleType2RoutingModule,
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
        GlobalLogoutModule,
        CollapseDirectiveModule,
        DesktopModule
    ],
  providers:[
    GetSettingsService,
    FriendsService,
    BonusesService,
    GetBetsHistoryService,
    PaymentControllerService,
    BetsService,
    GetTransactionsService,
    GetPaymentsService,
    ProfileService,
    ExportDataService,
    DatePipe
  ],
  bootstrap: [
    AccountPageType2DefaultComponent
  ]
})
export class AccountPagesModuleType2Module {
}
