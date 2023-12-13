import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {MobileAboutUsComponent} from "./mobile-about-us.component";

const routes: Routes = [
  {
    path:"",
    component:MobileAboutUsComponent,
  }
];
@NgModule({
  declarations:[MobileAboutUsComponent],
  imports:[
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})

export class MobileAboutUsModule
{

}