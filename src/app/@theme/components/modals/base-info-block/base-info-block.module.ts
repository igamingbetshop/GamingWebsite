import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {BaseInfoBlockComponent} from "./base-info-block.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations:[BaseInfoBlockComponent],
    exports:[BaseInfoBlockComponent],
    imports:[
        CommonModule,
        TranslateModule,
        FontAwesomeModule
    ]
})

export class BaseInfoBlockModule
{

}