import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

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
import {MobileAccountPageType2HistoryComponent} from './history/mobile-account-page-type2-history.component';
import {MobileAccountPageType2BettingStatementSportComponent} from './betting-statement-sport/mobile-account-page-type2-betting-statement-sport.component';
import {MobileAccountPageType2StatmentComponent} from "./statment/mobile-account-page-type2-statment.component";
import {MobileSelfLimitationComponent} from "./self-limitation/mobile-self-limitation.component";
import {MobileChangePasswordComponent} from "./change-password/mobile-change-password.component";
import {IsAgentGuard} from "../../../../../../@core/services/helpers/is-agent.guard";
import {AccountsFilterStateService} from "@core/services/app/accounts-filter-state.service";

const routes: Routes = [
  {
    path: '',
    component: MobileAccountPageType2DefaultComponent,
    children: [
      {
        path: 'account',
        component: MobileAccountPageType2StatmentComponent
      },
      {
        path: 'friends',
        component: MobileAccountPageType2FriendsComponent
      },
      {
        path: 'betting-statement',
        component: MobileAccountPageType2BetsComponent
      },
      {
        path: 'betting-statement/item/:id',
        component: MobileAccountPageType2BettingStatmentItemComponent
      },
      {
        path: 'betting-statement/item/:id/sport/:sportType',
        component: MobileAccountPageType2BettingStatementSportComponent
      },
      {
        path: 'settings',
        component: MobileAccountPageType2SettingsComponent
      },
      {
        path: 'bankAccounts',
        component: MobileAccountPageType2BanksAccountsComponent
      },
      {
        path: 'history',
        component: MobileAccountPageType2HistoryComponent
      },
      {
        path: 'payments',
        component: MobileAccountPageType2PaymentsComponent
      },
      {
        path: 'transactions',
        component: MobileAccountPageType2TransactionsComponent
      },
      {
        path: 'bonuses',
        component: MobileAccountPageType2BonusesComponent
      },
      {
        path: 'tickets',
        component: MobileAccountPageType2TicketsComponent
      },
      {
        path: 'announcements',
        component: MobileAccountPageType2AnnouncementsComponent
      },
      {
        path: 'self-limitation',
        component: MobileSelfLimitationComponent
      },
      {
        path: 'profile-details',
        loadChildren: () => import('./profile/mobile-profile.module').then(m => m.MobileProfileModule),
      },
      {
        path: 'deposit',
        loadChildren: () => import('./mobile-deposit-block/deposit-block.module').then(m => m.MobileDepositBlockModule)
      },
      {
        path: 'deposit/:id',
        loadChildren: () => import('./mobile-deposit-block/deposit-block.module').then(m => m.MobileDepositBlockModule)
      },
      {
        path: 'withdraw',
        loadChildren: () => import('./mobile-withdraw-block/withdraw-block.module').then(m => m.MobileWithdrawBlockModule)
      },
      {
        path: 'verification',
        loadChildren: () => import('./verification/mobile-verification.module').then(m => m.MobileVerificationModule),
      },
      {
        path: 'changepassword',
        component: MobileChangePasswordComponent
      },
      {
        path: 'two-factor',
        loadChildren: () => import('./two-factor/mobile-account-page-type2-two-factor.module').then(m => m.MobileAccountPageType2TwoFactorModule),
      },
      {
        path: 'balance',
        loadChildren: () => import('./balance/mobile-account-page-type2-balance.module').then(m => m.MobileAccountPageType2BalanceModule),
      },
      {
        path: 'agents-report',
        canActivate: [IsAgentGuard],
        loadComponent: () => import('./agents-report/mobile-account-page-type2-agents-report.component').then(m => m.MobileAccountPageType2AgentsReportComponent)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers:[AccountsFilterStateService]
})
export class MobileAccountPagesModuleType2RoutingModule {
}
