import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MobileForgotPasswordRecoveryComponent} from "./mobile-forgot-password-recovery.component";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path:"",
    component:MobileForgotPasswordRecoveryComponent,
  }
];
@NgModule({
  declarations:[MobileForgotPasswordRecoveryComponent],
  imports:[
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})

export class MobileForgotPasswordRecoveryModule
{

}