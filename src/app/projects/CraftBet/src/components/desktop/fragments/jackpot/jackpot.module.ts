import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {JackpotComponent} from "./jackpot.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[JackpotComponent],
  exports:[JackpotComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SanitizerModule,
  ]
})

export class JackpotModule
{

}
