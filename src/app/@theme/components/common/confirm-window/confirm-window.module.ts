import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ConfirmWindowComponent} from "./confirm-window.component";

@NgModule({
  declarations:[ConfirmWindowComponent],
  exports:[ConfirmWindowComponent],
  entryComponents:[ConfirmWindowComponent],
  imports:[
    FontAwesomeModule,
    TranslateModule,
  ]
})

export class ConfirmWindowModule
{

}