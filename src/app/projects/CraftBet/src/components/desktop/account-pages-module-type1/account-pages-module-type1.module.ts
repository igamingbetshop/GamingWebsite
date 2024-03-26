import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountPageType1SettingsComponent} from './settings/account-page-type1-settings.component';
import {AccountPageType1FriendsComponent} from './friends/account-page-type1-friends.component';
import {AccountPageType1BetsComponent} from './bets/account-page-type1-bets.component';
import {AccountPageType1PaymentsComponent} from './payments/account-page-type1-payments.component';
import {AccountPageType1TransactionsComponent} from './transactions/account-page-type1-transactions.component';
import {AccountPageType1BonusesComponent} from './bonuses/account-page-type1-bonuses.component';
import {AccountPageType1TicketsComponent} from './tickets/account-page-type1-tickets.component';
import {AccountPageType1StatementComponent} from './statement/account-page-type1-statement.component';
import {AccountPageType1MenuComponent} from './menu/account-page-type1-menu.component';
import {AccountPagesModuleType1RoutingModule} from "./account-pages-module-type1-routing.module";
import {AccountPageType1DefaultComponent} from './default/account-page-type1-default.component';
import {AccountPageType1BettingStatmentItemComponent} from './betting-statment-item/account-page-type1-betting-statment-item.component';
import {AccountPageType1BettingStatmentSportItemComponent} from './betting-statment-sport-item/account-page-type1-betting-statment-sport-item.component';
import {AccountPageType1AnnouncementsComponent} from './announcements/account-page-type1-announcements.component';
import {TranslateModule} from "@ngx-translate/core";
import {AccountPageType1BankAccountsComponent} from './bank-accounts/account-page-type1-bank-accounts.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import {NgxPrintModule} from "ngx-print";
import {ThemeModule} from "../../../../../../@theme/theme.module";
import { AccountPageType1OpenTicketsComponent } from './open-tickets/account-page-type1-open-tickets.component';
import { AccountPageType1HistoryComponent } from './history/account-page-type1-history.component';
import { AccountPageType1ChangePasswordComponent } from './change-password/account-page-type1-change-password.component';
import { SelfLimitationComponent } from './self-limitation/self-limitation.component';
import { AccountPageType1VerificationComponent } from './verification/account-page-type1-verification.component';
import {DesktopModule} from "../desktop.module";
import {CommonMessageModalModule} from "../../common/app-common-message-modal/common-message-modal.module";
import {CollapseDirectiveModule} from "../../../../../../@theme/directives/collapse/collapse-directive.module";
import {GetSettingsService} from "../../../../../../@core/services/app/getSettings.service";
import {FriendsService} from "../../../../../../@core/services/api/friends.service";
import {BonusesService} from "../../../../../../@core/services/api/bonuses.service";
import {GetBetsHistoryService} from "../../../../../../@core/services/app/getBetsHistory.service";
import {BetsService} from "../../../../../../@core/services/app/bets.services";
import {GetTransactionsService} from "../../../../../../@core/services/app/getTransactions.service";
import {PaymentControllerService} from "../../../../../../@core/services/app/paymentController.services";
import {GetPaymentsService} from "../../../../../../@core/services/app/getPayments.service";
import {ProfileService} from "../../../../../../@theme/components/profile/service/profile.service";
import {ExportDataService} from "../../../../../../@core/services";
import {CommonBankMessageModalModule} from "../../common/app-common-bank-message-modal/common-bank-message-modal.module";
import {DropdownDirectiveModule} from "../../../../../../@theme/directives/dropdown/dropdown-directive.module";
import {NgxMaskDirective} from "ngx-mask";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AccountPageType1SettingsComponent,
    AccountPageType1FriendsComponent,
    AccountPageType1BetsComponent,
    AccountPageType1PaymentsComponent,
    AccountPageType1TransactionsComponent,
    AccountPageType1BonusesComponent,
    AccountPageType1TicketsComponent,
    AccountPageType1StatementComponent,
    AccountPageType1MenuComponent,
    AccountPageType1DefaultComponent,
    AccountPageType1BettingStatmentItemComponent,
    AccountPageType1BettingStatmentSportItemComponent,
    AccountPageType1AnnouncementsComponent,
    AccountPageType1BankAccountsComponent,
    AccountPageType1OpenTicketsComponent,
    AccountPageType1HistoryComponent,
    AccountPageType1ChangePasswordComponent,
    SelfLimitationComponent,
    AccountPageType1VerificationComponent
  ],
    imports: [
        CommonModule,
        AccountPagesModuleType1RoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        HttpClientModule,
        NgxMaskDirective,
        NgxPrintModule,
        ThemeModule,
        DesktopModule,
        CommonMessageModalModule,
        CollapseDirectiveModule,
        CommonBankMessageModalModule,
        DropdownDirectiveModule,
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
    DatePipe,
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: {} }
  ]

})
export class AccountPagesModuleType1Module {}
