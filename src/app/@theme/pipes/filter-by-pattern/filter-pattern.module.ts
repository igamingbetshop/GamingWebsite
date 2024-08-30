import {NgModule} from "@angular/core";
import {FilterPatternPipe} from "./filter-pattern.pipe";

@NgModule({
    declarations: [
        FilterPatternPipe
    ],
    exports: [
        FilterPatternPipe
    ]
})

export class FilterPatternModule {

}