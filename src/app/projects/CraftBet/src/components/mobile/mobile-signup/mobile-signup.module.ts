import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MobileSignupComponent} from "./mobile-signup.component";
import {RouterModule, Routes} from "@angular/router";
import {LoaderModule} from "../../common/loader/loader.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {NgxMaskModule} from "ngx-mask";
import {ConfigService} from "../../../../../../@core/services";
import { DropdownDirectiveModule } from "../../../../../../@theme/directives/dropdown/dropdown-directive.module";
import {SecurityQuestionsModule} from "./security-questions/security-questions.module";
import {VerifyCodeModule} from "./verify-code/verify-code..module";
import {RegExpInputDirectiveModule} from "../../../../../../@theme/directives/reg-exp-input/reg-exp-input-directive.module";
import {FileTypeModule} from "./file/file-type.module";
import {
  FilterMobileCodePipeModule
} from "../../../../../../@theme/pipes/filter-by-mobile-code/filter-mobile-code-pipe.module";
import {OnlyNumberDirectiveModule} from "../../../../../../@theme/directives/only-number/only-number.directive.module";

const routes: Routes = [
  {
    path:"",
    component:MobileSignupComponent,
  }
];
@NgModule({
  declarations:[MobileSignupComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        LoaderModule,
        TranslateModule,
        ReactiveFormsModule,
        SanitizerModule,
        NgxMaskModule.forRoot(),
        RouterModule.forChild(routes),
        DropdownDirectiveModule,
        SecurityQuestionsModule,
        VerifyCodeModule,
        RegExpInputDirectiveModule,
        FileTypeModule,
        FilterMobileCodePipeModule,
        FormsModule,
        OnlyNumberDirectiveModule
    ],
})

export class MobileSignupModule
{
  constructor()
  {

  }

}
