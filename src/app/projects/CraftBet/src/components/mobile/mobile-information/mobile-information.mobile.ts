import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MobileInformationComponent} from "./mobile-information.component";
import {CommonModule} from "@angular/common";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";

const routes: Routes = [
  {
    path:"",
    component:MobileInformationComponent,
  }
];
@NgModule({
  declarations:[MobileInformationComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes),
        SanitizerModule
    ]
})

export class MobileInformationMobile
{

}