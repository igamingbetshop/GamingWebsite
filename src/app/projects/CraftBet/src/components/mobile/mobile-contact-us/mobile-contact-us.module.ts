import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {MobileContactUsComponent} from "./mobile-contact-us.component";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  {
    path:"",
    component:MobileContactUsComponent,
  }
];
@NgModule({
  declarations:[MobileContactUsComponent],
  imports:[
    CommonModule,
    TranslateModule,
    SanitizerModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})

export class MobileContactUsModule
{

}