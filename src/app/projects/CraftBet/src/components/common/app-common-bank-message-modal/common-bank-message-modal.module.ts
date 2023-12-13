import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonBankMessageModalComponent } from './app-common-bank-message-modal.component';

@NgModule({
    declarations: [AppCommonBankMessageModalComponent],
    exports: [AppCommonBankMessageModalComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TranslateModule
    ],
    entryComponents: [
        AppCommonBankMessageModalComponent
    ]
})
export class CommonBankMessageModalModule {

}
