import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageType3TicketsComponent } from './account-page-type3-tickets.component';
import { AccountPageType3OpenTicketsComponent } from '../open-tickets/account-page-type3-open-tickets.component';

@NgModule({
    declarations: [AccountPageType3TicketsComponent, AccountPageType3OpenTicketsComponent],
    imports: [
        CommonModule,
        TranslateModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule
    ]
})

export class AccountPageType3TicketsModule {
    getComponent() {
        return AccountPageType3TicketsComponent;
    }
}
