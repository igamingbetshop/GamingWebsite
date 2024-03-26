import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {CasinoCategoryComponent} from "./casino-category.component";
import {CasinoGameModule} from "../game/casino-game.module";
import {CasinoProvidersModule} from "../providers/casino-providers.module";
import {CasinoMenuModule} from "../menu/casino-menu.module";
import {RouterModule} from "@angular/router";
import {CasinoSearchModule} from "../search/casino-search.module";
import {
  HorizontalScrollDirectiveModule
} from "../../../../../../../@theme/directives/horizontal-scroll/horizontal-scroll.directive.module";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {GroupByRowsPipe} from "../../../../../../../@theme/pipes/group-by-rows.pipe";

@NgModule({
  declarations:[CasinoCategoryComponent],
  exports:[CasinoCategoryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        CasinoGameModule,
        CasinoProvidersModule,
        RouterModule,
        CasinoMenuModule,
        CasinoSearchModule,
        HorizontalScrollDirectiveModule,
        SanitizerModule,
        GroupByRowsPipe
    ]
})

export class CasinoCategoryModule
{

}
