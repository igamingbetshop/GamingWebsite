import {NgModule} from "@angular/core";
import {SecurityQuestionsComponent} from "./security-questions.component";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule
    ],
  exports: [
    SecurityQuestionsComponent
  ],
  declarations: [
    SecurityQuestionsComponent
  ]
})
export class SecurityQuestionsModule
{

}