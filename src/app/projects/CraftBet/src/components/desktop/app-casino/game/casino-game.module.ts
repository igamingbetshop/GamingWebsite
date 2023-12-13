import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {CasinoGameComponent} from "./casino-game.component";

@NgModule({
  declarations:[CasinoGameComponent],
  exports:[CasinoGameComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeIcons
  ]
})

export class CasinoGameModule
{

}
