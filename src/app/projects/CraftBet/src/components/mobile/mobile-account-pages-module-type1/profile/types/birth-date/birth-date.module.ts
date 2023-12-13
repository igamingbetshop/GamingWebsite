import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BirthDateComponent} from "./birth-date.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        BirthDateComponent
    ],
    declarations: [
        BirthDateComponent
    ]
})
export class BirthDateModule
{
    getComponent()
    {
        return BirthDateComponent;
    }
}