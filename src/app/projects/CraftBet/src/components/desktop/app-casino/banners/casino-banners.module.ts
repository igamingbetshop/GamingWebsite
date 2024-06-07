import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {CasinoBannersComponent} from "./casino-banners.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {PointerOnLinkDirective} from "../../../../../../../@theme/directives/pointer-on-link/pointer-on-link.directive";

@NgModule({
  declarations:[CasinoBannersComponent],
  exports:[CasinoBannersComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SlickCarouselModule,
        SanitizerModule,
        PointerOnLinkDirective
    ]
})

export class CasinoBannersModule
{

}
