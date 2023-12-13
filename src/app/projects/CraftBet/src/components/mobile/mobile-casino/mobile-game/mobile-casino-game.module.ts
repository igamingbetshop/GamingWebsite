import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {MobileCasinoGameComponent} from "./mobile-casino-game.component";

@NgModule({
  declarations:[MobileCasinoGameComponent],
  exports:[MobileCasinoGameComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeIcons
  ]
})

export class MobileCasinoGameModule
{

}
