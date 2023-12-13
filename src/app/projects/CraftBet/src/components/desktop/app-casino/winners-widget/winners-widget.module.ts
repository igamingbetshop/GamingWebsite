import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {WinnersWidgetComponent} from "./winners-widget.component";

@NgModule({
  declarations:[WinnersWidgetComponent],
  exports:[WinnersWidgetComponent],
  imports:[
    CommonModule,
    TranslateModule,
    SlickCarouselModule
  ]
})

export class WinnersWidgetModule
{

}
