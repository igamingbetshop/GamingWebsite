import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {SendCodeComponent} from "./send-code.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
    ],
  exports: [
      SendCodeComponent
  ],
  declarations: [
      SendCodeComponent
  ]
})
export class SendCodeModule
{
    getComponent()
    {
        return SendCodeComponent;
    }
}