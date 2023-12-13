import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FunctionalBtnComponent} from "./functional-btn.component";

@NgModule({
  declarations:[FunctionalBtnComponent],
  exports:[FunctionalBtnComponent],
  imports:[
    CommonModule,
    TranslateModule,
  ]
})

export class FunctionalBtnModule
{

}