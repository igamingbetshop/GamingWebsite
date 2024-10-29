import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MobileJackpotComponent} from "./mobile-jackpot.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[MobileJackpotComponent],
  exports:[MobileJackpotComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SanitizerModule,
  ]
})

export class MobileJackpotModule
{

}
