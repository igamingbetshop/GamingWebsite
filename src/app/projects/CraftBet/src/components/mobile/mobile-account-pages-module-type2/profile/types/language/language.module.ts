import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageComponent} from "./language.component";
import {FilterByKeyPipeModule} from "../../../../../../../../../@theme/pipes/filter-by-key/filter-by-key-pipe.module";
import {FormsModule} from "@angular/forms";
import {DropdownDirectiveModule} from "../../../../../../../../../@theme/directives/dropdown/dropdown-directive.module";

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