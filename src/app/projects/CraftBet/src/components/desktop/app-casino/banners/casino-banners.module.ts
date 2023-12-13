import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {CasinoBannersComponent} from "./casino-banners.component";

@NgModule({
  declarations:[CasinoBannersComponent],
  exports:[CasinoBannersComponent],
  imports:[
    CommonModule,
    TranslateModule,
    SlickCarouselModule
  ]
})

export class CasinoBannersModule
{

}
