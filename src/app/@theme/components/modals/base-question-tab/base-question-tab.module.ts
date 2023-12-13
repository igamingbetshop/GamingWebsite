import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BaseQuestionTabComponent} from "./base-question-tab.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations:[BaseQuestionTabComponent],
  exports:[BaseQuestionTabComponent],
  entryComponents:[BaseQuestionTabComponent],
  imports:[
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
  ]
})

export class BaseQuestionTabModule
{

}