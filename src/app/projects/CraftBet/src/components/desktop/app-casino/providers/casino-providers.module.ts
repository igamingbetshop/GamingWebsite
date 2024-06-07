import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {CasinoProvidersComponent} from "./casino-providers.component";
import {SearchPipeModule} from "../../../../../../../@theme/pipes/search/search.pipe.module";
import {OrderByPipeModule} from "../../../../../../../@theme/pipes/order-by/order-by-pipe.module";
import {FormsModule} from "@angular/forms";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {CompareByKeyPipeModule} from "../../../../../../../@theme/pipes/compare-by-key/compare-by-key-pipe.module";
import {CasinoSearchModule} from "../search/casino-search.module";
import {DropdownDirectiveModule} from "../../../../../../../@theme/directives/dropdown/dropdown-directive.module";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations:[CasinoProvidersComponent],
  exports:[CasinoProvidersComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SearchPipeModule,
        OrderByPipeModule,
        FontAwesomeIcons,
        FormsModule,
        CasinoSearchModule,
        CompareByKeyPipeModule,
        DropdownDirectiveModule,
        SanitizerModule
    ]
})

export class CasinoProvidersModule
{

}
