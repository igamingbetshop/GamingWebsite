import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LuckyGameComponent} from "./lucky-game.component";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[LuckyGameComponent],
  exports:[LuckyGameComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FontAwesomeIcons,
        RouterModule
    ]
})

export class LuckyGameModule
{
  getComponent()
  {
    return LuckyGameComponent;
  }
}
