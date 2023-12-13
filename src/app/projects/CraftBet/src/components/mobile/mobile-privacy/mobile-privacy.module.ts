import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {MobilePrivacyComponent} from "./mobile-privacy.component";
import {LanguageService} from "../../../../services/languageService";

const routes: Routes = [
  {
    path:"",
    component:MobilePrivacyComponent,
  }
];
@NgModule({
  declarations:[MobilePrivacyComponent],
  imports:[
    CommonModule,
    TranslateModule,
    SanitizerModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    LanguageService
  ]
})

export class MobilePrivacyModule
{

}