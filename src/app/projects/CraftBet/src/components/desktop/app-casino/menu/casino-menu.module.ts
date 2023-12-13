import {NgModule} from "@angular/core";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {TranslateModule} from "@ngx-translate/core";
import {CasinoMenuComponent} from "./casino-menu.component";
import {CommonModule} from "@angular/common";
import {CasinoSearchModule} from "../search/casino-search.module";

@NgModule({
  declarations:[CasinoMenuComponent],
  exports:[CasinoMenuComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule,
    CasinoSearchModule
  ]
})

export class CasinoMenuModule
{

}
