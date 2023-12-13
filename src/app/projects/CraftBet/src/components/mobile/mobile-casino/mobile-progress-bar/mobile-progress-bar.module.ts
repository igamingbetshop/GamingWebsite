import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MobileProgressBarComponent} from "./mobile-progress-bar.component";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[MobileProgressBarComponent],
  exports:[MobileProgressBarComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FontAwesomeIcons,
        RouterModule
    ]
})

export class MobileProgressBarModule
{

}
