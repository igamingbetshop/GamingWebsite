import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MobileForgotPasswordComponent} from "./mobile-forgot-password.component";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {MobileOpenTicketComponent} from "../mobile-open-ticket/mobile-open-ticket.component";
import {DefaultImageFallBackDirective} from "../../../../../../@theme/directives/default-image-fall-back.directive";

const routes: Routes = [
  {
    path:"",
    component:MobileForgotPasswordComponent,
  }
];
@NgModule({
  declarations:[MobileForgotPasswordComponent, MobileOpenTicketComponent],
  imports:[
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SanitizerModule,
    RouterModule.forChild(routes),
    FormsModule,
    DefaultImageFallBackDirective
  ]
})

export class MobileForgotPasswordModule
{

}