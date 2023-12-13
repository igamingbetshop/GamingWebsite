import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AccountPageType2StatementComponent} from './statement/account-page-type2-statement.component';
import {AccountPageType2MenuStatementComponent} from './menu-statement/account-page-type2-menu-statement.component';
import {AccountPageType2TicketsComponent} from './tickets/account-page-type2-tickets.component';
import {AccountPageType2BonusesComponent} from './bonuses/account-page-type2-bonuses.component';
import {AccountPageType2BetsComponent} from './bets/account-page-type2-bets.component';
import {AccountPageType2FriendsComponent} from './friends/account-page-type2-friends.component';
import {AccountPageType2SettingsComponent} from './settings/account-page-type2-settings.component';
import { AccountPageType2SelfLimitationComponent } from './self-limtation/account-page-type2-self-limitation.component';
import {AccountPageType2DefaultComponent} from './default/account-page-type2-default.component';
import {AccountPageType2HistoryDefaultComponent} from './history-default/account-page-type2-history-default.component';
import {AccountPageType2BettingStatmentItemComponent} from './betting-statment-item/account-page-type2-betting-statment-item.component';
import {AccountPageType2BettingStatmentSportItemComponent} from './betting-statment-sport-item/account-page-type2-betting-statment-sport-item.component';
import {AccountPageType2AnnouncementsComponent} from './announcements/account-page-type2-announcements.component';
import {AccountPageType2BankAccountsComponent} from './bank-accounts/account-page-type2-bank-accounts.component';
import {AccountPageType2TransactionsComponent} from "./transactions/account-page-type2-transactions.component";
import {AccountPageType2PaymentsComponent} from "./payments/account-page-type2-payments.component";
import {AccountPageType2VerificationComponent} from "./verification/account-page-type2-verification.component";
import {AccountPageType2ChangePasswordComponent} from "./change-password/account-page-type2-change-password.component";

const routes: Routes = [
    {
        path: '',
        component: AccountPageType2DefaultComponent,
        children: [
            {
                path: 'account',
                component: AccountPageType2StatementComponent
            },
            {
                path: 'account-statement',
                component: AccountPageType2MenuStatementComponent
            },
            {
                path: 'friends',
                component: AccountPageType2FriendsComponent
            },
            {
                path: 'betting-statement',
                component: AccountPageType2BetsComponent
            },
            {
                path: 'betting-statement/item/:id',
                component: AccountPageType2BettingStatmentItemComponent
            },
            {
                path: 'betting-statement/item/:id/sport/:sportType',
                component: AccountPageType2BettingStatmentSportItemComponent
            },
            {
                path: 'settings',
                component: AccountPageType2SettingsComponent
            },
            {
                path: 'bankAccounts',
                component: AccountPageType2BankAccountsComponent
            },
            /* {
               path: 'history',
               component: AccountPageType2HistoryComponent
             },*/
            {
                path: 'deposit',
                loadChildren: () => import('app/projects/CraftBet/src/components/desktop/account-pages-module-type2/deposit-block/account-type2-deposit-block.module').then(m => m.AccountType2DepositBlockModule)
            },
            {
                path: 'deposit/:id',
                loadChildren: () => import('app/projects/CraftBet/src/components/desktop/account-pages-module-type2/deposit-block/account-type2-deposit-block.module').then(m => m.AccountType2DepositBlockModule)
            },
            {
                path: 'withdraw',
                loadChildren: () => import('app/projects/CraftBet/src/components/desktop/account-pages-module-type2/withdraw-block/account-type2-withdraw-block.module').then(m => m.AccountType2WithdrawBlockModule),
                /*resolve: {
                    activeWithdraws: ActiveWithdrawsResolver
                }*/
            },
             {
               path: 'transactions',
               component: AccountPageType2TransactionsComponent
             },
            {
                path: 'verification',
                component: AccountPageType2VerificationComponent
            },
            {
                path: 'balance',
                loadChildren: () => import('../account-pages-module-type2/balance/account-page-type2-balance.module').then(m => m.AccountPageType2BalanceModule),
            },
            {
                path: 'profile-details',
                loadChildren: () => import('../account-pages-module-type2/profile/profile.module').then(m => m.ProfileModule),
            },
            {
                path: 'two-factor',
                loadChildren: () => import('../account-pages-module-type2/two-factor/two-factor.module').then(m => m.TwoFactorModule),
            },
            {
                path: 'bonuses',
                component: AccountPageType2BonusesComponent
            },
            {
                path: 'tickets',
                component: AccountPageType2TicketsComponent
            },
            {
                path: 'announcements',
                component: AccountPageType2AnnouncementsComponent
            },
             {
               path: 'payments',
               component: AccountPageType2PaymentsComponent
             },
            {
                path: 'history',
                component: AccountPageType2HistoryDefaultComponent
            },
            {
                path: 'self-limitation',
                component:  AccountPageType2SelfLimitationComponent
            },
            {
                path: 'changepassword',
                component: AccountPageType2ChangePasswordComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AccountPagesModuleType2RoutingModule {
}
