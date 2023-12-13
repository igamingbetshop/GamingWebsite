import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { AccountPageType1BalanceComponent } from './account-page-type1-balance.component';

const routes: Routes = [
    {
        path: '',
        component: AccountPageType1BalanceComponent
    }
];
@NgModule({
    declarations: [AccountPageType1BalanceComponent],
    exports: [AccountPageType1BalanceComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ToNumberPipeModule,
        RouterModule.forChild(routes),
    ],
})

export class AccountPageType1BalanceModule {

}
