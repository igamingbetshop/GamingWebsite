import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BirthDateComponent} from "./birth-date.component";
import {TranslateModule} from "@ngx-translate/core";


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