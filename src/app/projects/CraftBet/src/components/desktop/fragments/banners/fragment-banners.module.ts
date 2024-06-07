import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {FragmentBannersComponent} from "./fragment-banners.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {PointerOnLinkDirective} from "../../../../../../../@theme/directives/pointer-on-link/pointer-on-link.directive";

@NgModule({
  declarations:[FragmentBannersComponent],
  exports:[FragmentBannersComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SlickCarouselModule,
        SanitizerModule,
        PointerOnLinkDirective
    ]
})

export class FragmentBannersModule
{

}
