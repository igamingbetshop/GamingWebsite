import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalSignUpBtnComponent} from "./global-sign-up-btn.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SanitizerModule} from "../../pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[GlobalSignUpBtnComponent],
  exports:[GlobalSignUpBtnComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TranslateModule,
        SanitizerModule,
    ]
})

export class GlobalSignUpBtnModule
{

}