import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProgressBarComponent} from "./progress-bar.component";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations:[ProgressBarComponent],
  exports:[ProgressBarComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FontAwesomeIcons,
        RouterModule
    ]
})

export class ProgressBarModule
{

}
