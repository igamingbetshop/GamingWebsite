import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {VerifyCodeComponent} from "./verify-code.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
    ],
  exports: [
      VerifyCodeComponent
  ],
  declarations: [
      VerifyCodeComponent
  ]
})
export class VerifyCodeModule
{

}