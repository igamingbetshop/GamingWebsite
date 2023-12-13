import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import { SecurityQuestionsModalComponent } from './security-questions-modal.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [SecurityQuestionsModalComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FontAwesomeModule
    ],
    exports: [
        SecurityQuestionsModalComponent
    ]
})
export class SecurityQuestionsModalModule
{
    getComponent()
    {
        return SecurityQuestionsModalComponent;
    }
}
