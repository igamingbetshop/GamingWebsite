import {NgModule} from '@angular/core';

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
import {RouterModule, Routes} from "@angular/router";
import {MobileAccountPageType1BettingStatementSportComponent} from './betting-statement-sport/mobile-account-page-type1-betting-statement-sport.component';
import {MobileAccountPageType1HistoryComponent} from "./history/mobile-account-page-type1-history.component";
import {MobileChangePasswordComponent} from './change-password/mobile-change-password.component';
import {MobileSelfLimitationComponent} from "./self-limitation/mobile-self-limitation.component";
import {IsAgentGuard} from "../../../../../../@core/services/helpers/is-agent.guard";
import {AccountsFilterStateService} from "@core/services/app/accounts-filter-state.service";

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType1DefaultComponent,
        children: [
            {
                path: 'account',
                component: MobileAccountPageType1StatementComponent
            },
            {
                path: 'friends',
                component: MobileAccountPageType1FriendsComponent
            },
            {
                path: 'betting-statement',
                component: MobileAccountPageType1BetsComponent
            },
            {
                path: 'betting-statement/item/:id',
                component: MobileAccountPageType1BettingStatmentItemComponent
            },
            {
                path: 'betting-statement/item/:id/sport/:sportType',
                component: MobileAccountPageType1BettingStatementSportComponent
            },
            {
                path: 'settings',
                component: MobileAccountPageType1SettingsComponent
            },
            {
                path: 'bankAccounts',
                component: MobileAccountPageType1BanksAccountsComponent
            },
            {
                path: 'history',
                component: MobileAccountPageType1HistoryComponent
            },
            {
                path: 'payments',
                component: MobileAccountPageType1PaymentsComponent
            },
            {
                path: 'transactions',
                component: MobileAccountPageType1TransactionsComponent
            },
            {
                path: 'bonuses',
                component: MobileAccountPageType1BonusesComponent
            },
            {
                path: 'tickets',
                component: MobileAccountPageType1TicketsComponent
            },
            {
                path: 'announcements',
                component: MobileAccountPageType1AnnouncementsComponent
            },
            {
                path: 'deposit',
                loadChildren: () => import('../mobile-deposit-block/deposit-block.module').then(m => m.MobileDepositBlockModule)
            },
            {
                path: 'deposit/:id',
                loadChildren: () => import('../mobile-deposit-block/deposit-block.module').then(m => m.MobileDepositBlockModule)
            },
            {
                path: 'withdraw',
                loadChildren: () => import('../mobile-withdraw-block/withdraw-block.module').then(m => m.MobileWithdrawBlockModule)
            },
            {
                path: 'profile-details',
                loadChildren: () => import('./profile/mobile-profile.module').then(m => m.MobileProfileModule),
            },
            {
                path: 'verification',
                loadChildren: () => import('./verification/mobile-verification.module').then(m => m.MobileVerificationModule),
            },
            {
                path: 'security-questions',
                loadChildren: () => import('./edit-security-questions/mobile-edit-security-questions.module').then(m => m.MobileEditSecurityQuestionsModule),
            },
            {
                path: 'balance',
                loadChildren: () => import('./balance/mobile-account-page-type1-balance.module').then(m => m.MobileAccountPageType1BalanceModule),
            },
            {
                path: 'ussdpin',
                loadChildren: () => import('./ussd-pin/mobile-ussd-pin.module').then(m => m.MobileUssdPinModule),
            },
            {
                path: 'changepassword',
                component: MobileChangePasswordComponent
            },
            {
                path: 'self-limitation',
                component: MobileSelfLimitationComponent
            },
            {
                path: 'two-factor',
                loadChildren: () => import('./two-factor/mobile-account-page-type1-two-factor.module').then(m => m.MobileAccountPageType1TwoFactorModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('./pay3000/mobile-account-page-type1-pay3000.module').then(m => m.MobileAccountPageType1Pay3000Module),
            },
            {
                path: 'agents-report',
                canActivate: [IsAgentGuard],
                loadComponent: () => import('./agents-report/mobile-account-page-type1-agents-report.component').then(m => m.MobileAccountPageType1AgentsReportComponent)
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


export class MobileAccountPagesModuleType1RoutingModule {
}
