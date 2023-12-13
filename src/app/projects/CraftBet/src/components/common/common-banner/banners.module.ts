import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {CommonBannerComponent} from "./common-banner.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations:[CommonBannerComponent],
  exports:[CommonBannerComponent],
  imports:[
    CommonModule,
    TranslateModule,
    SlickCarouselModule
  ]
})

export class BannersModule
{

}
