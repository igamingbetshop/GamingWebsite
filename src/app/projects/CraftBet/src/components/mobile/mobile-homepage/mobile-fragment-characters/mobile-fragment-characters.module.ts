import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {MobileFragmentCharactersComponent} from "./mobile-fragment-characters.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {MobileCharactersModule} from "../mobile-characters/mobile-characters.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[MobileFragmentCharactersComponent],
  exports:[MobileFragmentCharactersComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SlickCarouselModule,
        SanitizerModule,
        MobileCharactersModule,
        RouterModule
    ]
})

export class FragmentCharactersModule
{

}
