import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { AccountPageType2BalanceComponent } from './account-page-type2-balance.component';

const routes: Routes = [
    {
        path: '',
        component: AccountPageType2BalanceComponent
    }
];
@NgModule({
    declarations: [AccountPageType2BalanceComponent],
    exports: [AccountPageType2BalanceComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ToNumberPipeModule,
        RouterModule.forChild(routes),
    ],
})

export class AccountPageType2BalanceModule {

}
