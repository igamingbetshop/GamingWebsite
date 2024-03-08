import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {CasinoCategoryComponent} from "./casino-category.component";
import {CasinoGameModule} from "../game/casino-game.module";
import {SimpleModalModule} from "ngx-simple-modal";
import {CasinoProvidersModule} from "../providers/casino-providers.module";
import {CasinoMenuModule} from "../menu/casino-menu.module";
import {RouterModule} from "@angular/router";
import {CasinoSearchModule} from "../search/casino-search.module";
import {
  HorizontalScrollDirectiveModule
} from "../../../../../../../@theme/directives/horizontal-scroll/horizontal-scroll.directive.module";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[CasinoCategoryComponent],
  exports:[CasinoCategoryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CasinoGameModule,
        SimpleModalModule,
        CasinoProvidersModule,
        RouterModule,
        CasinoMenuModule,
        CasinoSearchModule,
        HorizontalScrollDirectiveModule,
        SanitizerModule
    ]
})

export class CasinoCategoryModule
{

}
