import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileAccountPageType3TicketsComponent } from './mobile-account-page-type3-tickets.component';

const routes: Routes = [
    {
        path: '',
        component: MobileAccountPageType3TicketsComponent
    }
];

@NgModule({
    declarations: [MobileAccountPageType3TicketsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})

export class MobileAccountPageType3TicketsModule {

}
