import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppCommonMessageModalComponent} from "./app-common-message-modal.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations:[AppCommonMessageModalComponent],
  exports:[AppCommonMessageModalComponent],
  imports:[
    CommonModule,
    FontAwesomeModule,
    TranslateModule
  ],
  entryComponents:[
    AppCommonMessageModalComponent
  ]
})

export class CommonMessageModalModule
{

}
