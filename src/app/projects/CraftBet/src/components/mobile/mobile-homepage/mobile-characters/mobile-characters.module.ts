import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MobileCharactersComponent} from "./mobile-characters.component";

@NgModule({
  declarations:[MobileCharactersComponent],
  exports:[MobileCharactersComponent],
  imports:[
    CommonModule,
    TranslateModule
  ]
})

export class MobileCharactersModule
{
  getComponent()
  {
    return MobileCharactersComponent;
  }
}
