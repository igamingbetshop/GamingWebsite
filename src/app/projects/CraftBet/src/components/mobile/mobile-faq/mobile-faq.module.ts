import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {MobileFAQComponent} from "./mobile-faq.component";
import {LanguageService} from "../../../../services/languageService";

const routes: Routes = [
  {
    path:"",
    component:MobileFAQComponent,
  }
];
@NgModule({
  declarations:[MobileFAQComponent],
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

export class MobileFaqModule
{

}