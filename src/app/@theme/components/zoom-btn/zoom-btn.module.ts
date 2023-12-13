import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ZoomBtnComponent} from "./zoom-btn.component";
import {FontAwesomeIcons} from "../../font-awsome/font-awesome-icons";

@NgModule({
  declarations:[ZoomBtnComponent],
  exports:[ZoomBtnComponent],
  imports:[
    CommonModule,
    TranslateModule,
      FontAwesomeIcons
  ]
})

export class ZoomBtnModule
{

}