import {MobileEmailVerifyComponent} from "./mobile-email-verify.component";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path:"",
    component:MobileEmailVerifyComponent,
  }
];
@NgModule({
  declarations:[MobileEmailVerifyComponent],
  imports:[
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})

export class MobileEmailVerifyModule
{

}