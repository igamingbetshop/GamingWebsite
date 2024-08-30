import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageComponent} from "./language.component";
import {FormsModule} from "@angular/forms";
import {DropdownDirectiveModule} from "../../../../../directives/dropdown/dropdown-directive.module";
import {FilterByKeyPipeModule} from "../../../../../pipes/filter-by-key/filter-by-key-pipe.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FilterByKeyPipeModule,
        FormsModule,
        DropdownDirectiveModule
    ],
  exports: [
      LanguageComponent
  ],
  declarations: [
      LanguageComponent
  ]
})
export class LanguageModule
{
    getComponent()
    {
        return LanguageComponent;
    }
}