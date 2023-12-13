import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {HomeBannersComponent} from "./home-banners.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[HomeBannersComponent],
  exports:[HomeBannersComponent],
  imports:[
    CommonModule,
    TranslateModule,
    SlickCarouselModule,
    SanitizerModule
  ]
})

export class HomeBannersModule
{

}
