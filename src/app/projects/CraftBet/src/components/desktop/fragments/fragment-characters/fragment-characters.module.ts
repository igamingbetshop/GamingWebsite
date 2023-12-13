import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {FragmentCharactersComponent} from "./fragment-characters.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {CharactersModule} from "../characters/characters.module";

@NgModule({
  declarations:[FragmentCharactersComponent],
  exports:[FragmentCharactersComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule,
    SanitizerModule,
    CharactersModule
  ]
})

export class FragmentCharactersModule
{

}
