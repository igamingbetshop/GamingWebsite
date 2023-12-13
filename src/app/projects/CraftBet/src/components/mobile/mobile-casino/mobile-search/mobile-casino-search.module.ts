import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MobileCasinoSearchComponent} from "./mobile-casino-search.component";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";

@NgModule({
  declarations:[MobileCasinoSearchComponent],
  exports:[MobileCasinoSearchComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FontAwesomeIcons
  ]
})

export class MobileCasinoSearchModule
{

}
