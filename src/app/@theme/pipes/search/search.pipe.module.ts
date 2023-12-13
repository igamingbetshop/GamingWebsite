import {NgModule} from "@angular/core";
import {SearchByFirstLetterPipe} from "./search-by-first-letter.pipe";
import {SearchByNamePipe} from "./search-by-name.pipe";

@NgModule({
    declarations:[SearchByFirstLetterPipe, SearchByNamePipe],
    exports:[SearchByFirstLetterPipe,SearchByNamePipe]
})

export class SearchPipeModule
{

}
