import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MobileJackpotWinnerComponent} from "./mobile-jackpot-winner.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[MobileJackpotWinnerComponent],
  exports:[MobileJackpotWinnerComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SanitizerModule,
  ],
})

export class MobileJackpotWinnerModule
{
  getComponent()
  {
    return MobileJackpotWinnerComponent;
  }
}
