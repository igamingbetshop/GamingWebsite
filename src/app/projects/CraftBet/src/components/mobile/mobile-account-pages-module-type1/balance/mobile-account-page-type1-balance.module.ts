import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { MobileAccountPageType1BalanceComponent } from './mobile-account-page-type1-balance.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType1BalanceComponent
    }
];
@NgModule({
    declarations: [MobileAccountPageType1BalanceComponent],
    exports: [MobileAccountPageType1BalanceComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ToNumberPipeModule,
        RouterModule.forChild(routes),
    ],
})
export class MobileAccountPageType1BalanceModule {

}
