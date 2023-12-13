import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {MobileSportComponent} from "./mobile-sport.component";
import {CommonModule} from "@angular/common";


@NgModule({
    declarations:[MobileSportComponent],
    imports:[CommonModule],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class MobileSportModule
{
    getComponent()
    {
        return MobileSportComponent;
    }
}