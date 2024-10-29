import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {JackpotWinnerComponent} from "./jackpot-winner.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[JackpotWinnerComponent],
  exports:[JackpotWinnerComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SanitizerModule,
  ],
})

export class JackpotWinnerModule
{
  getComponent()
  {
    return JackpotWinnerComponent;
  }
}
