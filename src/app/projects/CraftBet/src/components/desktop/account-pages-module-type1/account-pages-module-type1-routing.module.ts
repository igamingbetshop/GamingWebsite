import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountPageType1SettingsComponent} from './settings/account-page-type1-settings.component';
import {AccountPageType1FriendsComponent} from './friends/account-page-type1-friends.component';
import {AccountPageType1BetsComponent} from './bets/account-page-type1-bets.component';
import {AccountPageType1PaymentsComponent} from './payments/account-page-type1-payments.component';
import {AccountPageType1TransactionsComponent} from './transactions/account-page-type1-transactions.component';
import {AccountPageType1BonusesComponent} from './bonuses/account-page-type1-bonuses.component';
import {AccountPageType1TicketsComponent} from './tickets/account-page-type1-tickets.component';
import {AccountPageType1StatementComponent} from './statement/account-page-type1-statement.component';
import {AccountPageType1DefaultComponent} from './default/account-page-type1-default.component';
import {AccountPageType1BettingStatmentItemComponent} from './betting-statment-item/account-page-type1-betting-statment-item.component';
import {AccountPageType1BettingStatmentSportItemComponent} from './betting-statment-sport-item/account-page-type1-betting-statment-sport-item.component';
import {AccountPageType1AnnouncementsComponent} from './announcements/account-page-type1-announcements.component';
import {AccountPageType1BankAccountsComponent} from './bank-accounts/account-page-type1-bank-accounts.component';
import {AccountPageType1HistoryComponent} from './history/account-page-type1-history.component';
import {SelfLimitationComponent} from './self-limitation/self-limitation.component';
import {AccountPageType1VerificationComponent} from './verification/account-page-type1-verification.component';
import {AccountPageType1ChangePasswordComponent} from './change-password/account-page-type1-change-password.component';

const routes: Routes = [
    {
        path: '',
        component: AccountPageType1DefaultComponent,
        children: [
            {
                path: 'account',
                component: AccountPageType1StatementComponent,
            },
            {
                path: 'friends',
                component: AccountPageType1FriendsComponent
            },
            {
                path: 'betting-statement',
                component: AccountPageType1BetsComponent
            },
            {
                path: 'betting-statement/item/:id',
                component: AccountPageType1BettingStatmentItemComponent
            },
            {
                path: 'betting-statement/item/:id/sport/:sportType',
                component: AccountPageType1BettingStatmentSportItemComponent
            },
            {
                path: 'settings',
                component: AccountPageType1SettingsComponent
            },
            {
                path: 'bankAccounts',
                component: AccountPageType1BankAccountsComponent
            },
            {
                path: 'history',
                component: AccountPageType1HistoryComponent
            },
            {
                path: 'balance',
                loadChildren: () => import('../account-pages-module-type2/balance/account-page-type2-balance.module').then(m => m.AccountPageType2BalanceModule),
            },
            {
                path: 'ussdpin',
                loadChildren: () => import('../account-pages-module-type1/ussd-pin/ussd-pin.module').then(m => m.UssdPinModule),
            },
            {
                path: 'profile-details',
                loadChildren: () => import('../account-pages-module-type1/profile/profile.module').then(m => m.ProfileModule),
            },
            {
                path: 'two-factor',
                loadChildren: () => import('../account-pages-module-type1/two-factor/two-factor.module').then(m => m.TwoFactorModule),
            },
            {
                path: 'security-questions',
                loadChildren: () => import('../account-pages-module-type1/edit-security-questions/edit-security-questions.module').then(m => m.EditSecurityQuestionsModule),
            },
            {
                path: 'deposit',
                loadChildren: () => import('../account-pages-module-type1/deposit-block/account-type1-deposit-block.module').then(m => m.AccountType1DepositBlockModule),
            },
            {
                path: 'deposit/:id',
                loadChildren: () => import('../account-pages-module-type1/deposit-block/account-type1-deposit-block.module').then(m => m.AccountType1DepositBlockModule),
            },
            {
                path: 'withdraw',
                loadChildren: () => import('../account-pages-module-type1/withdraw-block/account-type1-withdraw-block.module').then(m => m.AccountType1WithdrawBlockModule),
            },
            {
                path: 'payments',
                component: AccountPageType1PaymentsComponent
            },
            {
                path: 'transactions',
                component: AccountPageType1TransactionsComponent
            },
            {
                path: 'bonuses',
                component: AccountPageType1BonusesComponent
            },
            {
                path: 'tickets',
                component: AccountPageType1TicketsComponent
            },
            {
                path: 'announcements',
                component: AccountPageType1AnnouncementsComponent
            },
            {
                path: 'self-limitation',
                component: SelfLimitationComponent
            },
            {
                path: 'changepassword',
                component: AccountPageType1ChangePasswordComponent
            },
            {
                path: 'verification',
                component: AccountPageType1VerificationComponent
            },
            {
                path: 'payment',
                loadChildren: () => import('../account-pages-module-type1/pay3000/account-page-type1-pay3000.module').then(m => m.AccountPageType1Pay3000Module),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AccountPagesModuleType1RoutingModule {
}
