import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { MobileAccountPageType2BalanceComponent } from './mobile-account-page-type2-balance.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType2BalanceComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType2BalanceComponent],
    exports: [MobileAccountPageType2BalanceComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ToNumberPipeModule,
        RouterModule.forChild(routes),
        FontAwesomeModule,
    ],
})

export class MobileAccountPageType2BalanceModule {

}
