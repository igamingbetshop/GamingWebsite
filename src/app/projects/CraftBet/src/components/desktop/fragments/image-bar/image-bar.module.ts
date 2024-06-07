import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ImageBarComponent} from "./image-bar.component";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {PointerOnLinkDirective} from "../../../../../../../@theme/directives/pointer-on-link/pointer-on-link.directive";

@NgModule({
  declarations:[ImageBarComponent],
  exports:[ImageBarComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SanitizerModule,
        PointerOnLinkDirective
    ]
})

export class ImageBarModule
{

}
