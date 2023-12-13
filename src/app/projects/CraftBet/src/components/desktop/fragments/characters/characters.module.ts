import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {CharactersComponent} from "./characters.component";

@NgModule({
  declarations:[CharactersComponent],
  exports:[CharactersComponent],
  imports:[
    CommonModule,
    TranslateModule
  ]
})

export class CharactersModule
{
  getComponent()
  {
    return CharactersComponent;
  }
}
