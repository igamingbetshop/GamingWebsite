import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MobileAccountPagesModuleType2RoutingModule} from "./mobile-account-pages-module-type2-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {NgxPrintModule} from "ngx-print";

import {MobileAccountPageType2SettingsComponent} from './settings/mobile-account-page-type2-settings.component';
import {MobileAccountPageType2FriendsComponent} from './friends/mobile-account-page-type2-friends.component';
import {MobileAccountPageType2BetsComponent} from './bets/mobile-account-page-type2-bets.component';
import {MobileAccountPageType2PaymentsComponent} from './payments/mobile-account-page-type2-payments.component';
import {MobileAccountPageType2TransactionsComponent} from './transactions/mobile-account-page-type2-transactions.component';
import {MobileAccountPageType2BonusesComponent} from './bonuses/mobile-account-page-type2-bonuses.component';
import {MobileAccountPageType2TicketsComponent} from './tickets/mobile-account-page-type2-tickets.component';
import {MobileAccountPageType2DefaultComponent} from './default/mobile-account-page-type2-default.component';
import {MobileAccountPageType2BettingStatmentItemComponent} from './betting-statment-item/mobile-account-page-type2-betting-statment-item.component';
import {MobileAccountPageType2AnnouncementsComponent} from './announcements/mobile-account-page-type2-announcements.component';
import {MobileAccountPageType2BanksAccountsComponent} from './banks-accounts/mobile-account-page-type2-banks-accounts.component';
import {MobileAccountPageType2OpenTicketsComponent} from './open-tickets/mobile-account-page-type2-open-tickets.component';
import {MobileAccountPageType2HistoryComponent} from './history/mobile-account-page-type2-history.component';
import {MobileAccountPageType2AddBankAccountComponent} from './add-bank-account/mobile-account-page-type2-add-bank-account.component';
import {MobileAccountPageType2UserInfoComponent} from './user-info/mobile-account-page-type2-user-info.component';
import {MobileAccountPageType2BettingStatementSportComponent} from './betting-statement-sport/mobile-account-page-type2-betting-statement-sport.component';
import { MobileAccountPageType2StatmentComponent } from './statment/mobile-account-page-type2-statment.component';
import {ThemeModule} from "../../../../../../@theme/theme.module";
import {DesktopMobileCommonModule} from "../../common/common.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {OrderByPipeModule} from "../../../../../../@theme/pipes/order-by/order-by-pipe.module";
import {ExportDataService} from "../../../../../../@core/services";
import {GetSettingsService} from "../../../../../../@core/services/app/getSettings.service";
import {FriendsService} from "../../../../../../@core/services/api/friends.service";
import {BonusesService} from "../../../../../../@core/services/api/bonuses.service";
import {GetBetsHistoryService} from "../../../../../../@core/services/app/getBetsHistory.service";
import {PaymentControllerService} from "../../../../../../@core/services/app/paymentController.services";
import {BetsService} from "../../../../../../@core/services/app/bets.services";
import {GetTransactionsService} from "../../../../../../@core/services/app/getTransactions.service";
import {GetPaymentsService} from "../../../../../../@core/services/app/getPayments.service";
import {ProfileService} from "../../../../../../@theme/components/profile/service/profile.service";
import { MobileSelfLimitationComponent } from './self-limitation/mobile-self-limitation.component';
import {MobileChangePasswordComponent} from "./change-password/mobile-change-password.component";
import {NgxMaskDirective} from "ngx-mask";
import {DropdownDirectiveModule} from "../../../../../../@theme/directives/dropdown/dropdown-directive.module";


@NgModule({
    declarations: [
        MobileAccountPageType2SettingsComponent,
        MobileAccountPageType2FriendsComponent,
        MobileAccountPageType2BetsComponent,
        MobileAccountPageType2PaymentsComponent,
        MobileAccountPageType2TransactionsComponent,
        MobileAccountPageType2BonusesComponent,
        MobileAccountPageType2TicketsComponent,
        MobileAccountPageType2DefaultComponent,
        MobileAccountPageType2BettingStatmentItemComponent,
        MobileAccountPageType2AnnouncementsComponent,
        MobileAccountPageType2BanksAccountsComponent,
        MobileAccountPageType2OpenTicketsComponent,
        MobileAccountPageType2HistoryComponent,
        MobileAccountPageType2AddBankAccountComponent,
        MobileAccountPageType2UserInfoComponent,
        MobileAccountPageType2BettingStatementSportComponent,
        MobileAccountPageType2StatmentComponent,
        MobileSelfLimitationComponent,
        MobileChangePasswordComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MobileAccountPagesModuleType2RoutingModule,
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
        DropdownDirectiveModule
    ],
    providers:[
        ExportDataService,
        GetSettingsService,
        FriendsService,
        BonusesService,
        GetBetsHistoryService,
        PaymentControllerService,
        BetsService,
        GetTransactionsService,
        GetPaymentsService,
        ProfileService,
        DatePipe
    ]
})
export class MobileAccountPagesModuleType2Module {
}
