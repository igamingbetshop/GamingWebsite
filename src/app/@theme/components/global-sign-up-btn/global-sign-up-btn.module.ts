import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalSignUpBtnComponent} from "./global-sign-up-btn.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations:[GlobalSignUpBtnComponent],
  exports:[GlobalSignUpBtnComponent],
  imports:[
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
  ]
})

export class GlobalSignUpBtnModule
{

}