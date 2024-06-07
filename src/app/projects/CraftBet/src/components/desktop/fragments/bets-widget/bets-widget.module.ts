import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BetsWidgetComponent} from "./bets-widget.component";

@NgModule({
  declarations:[BetsWidgetComponent],
  exports:[BetsWidgetComponent],
  imports:[
    CommonModule,
    TranslateModule,
  ]
})

export class BetsWidgetModule
{

}
