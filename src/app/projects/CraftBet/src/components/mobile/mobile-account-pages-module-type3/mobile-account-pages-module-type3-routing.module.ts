import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MobileAccountPageType3DefaultComponent } from './default/mobile-account-page-type3-default.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3DefaultComponent,
        children: [
            {
                path: 'credit',
                loadChildren: () => import('./credit/mobile-account-page-type3-credit.module').then(m => m.MobileAccountPageType3CreditModule),
            },
            {
                path: 'verification',
                loadChildren: () => import('./verification/mobile-account-page-type3-verification.module').then(m => m.MobileAccountPageType3VerificationModule),
            },
            {
                path: 'transactions',
                loadChildren: () => import('./transactions/mobile-account-page-type3-transactions.module').then(m => m.MobileAccountPageType3TransactionsModule),
            },
            {
                path: 'history',
                loadChildren: () => import('./history/mobile-account-page-type3-history.module').then(m => m.MobileAccountPageType3HistoryModule),
            },
            {
                path: 'tickets',
                loadChildren: () => import('./tickets/mobile-account-page-type3-tickets.module').then(m => m.MobileAccountPageType3TicketsModule),
            },
            {
                path: 'self-limitation',
                loadChildren: () => import('./self-limitation/mobile-account-page-type3-self-limitation.module').then(m => m.MobileAccountPageType3SelfLimitationModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('./payment/mobile-account-page-type3-payment.module').then(m => m.MobileAccountPageType3PaymentModule),
            },
            {
                path: 'document-Verification',
                loadChildren: () => import('./document-verification/mobile-account-page-type3-document-verification.module').then(m => m.MobileAccountPageType3DocumentVerificationModule),
            },
            {
                path: 'bank-accounts',
                loadChildren: () => import('./bank-accounts/mobile-account-page-type3-bank-accounts.module').then(m => m.MobileAccountPageType3BankAccountsModule),
            },
            {
                path: 'bonuses',
                loadChildren: () => import('./bonuses/mobile-account-page-type3-bonuses.module').then(m => m.MobileAccountPageType3BonusesModule),
            },
            {
                path: 'credit-check',
                loadChildren: () => import('./credit-check/mobile-account-page-type3-credit-check.module').then(m => m.MobileAccountPageType3CreditCheckModule),
            },
            {
                path: 'payments',
                loadChildren: () => import('./payments/mobile-account-page-type3-payments.module').then(m => m.MobileAccountPageType3PaymentsModule),
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/mobile-account-page-type3-profile.module').then(m => m.MobileAccountPageType3ProfileModule),
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
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MobileAccountPagesModuleType3RoutingModule {
    
}
