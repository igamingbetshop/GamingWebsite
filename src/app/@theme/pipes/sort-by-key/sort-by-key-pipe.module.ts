import {NgModule} from "@angular/core";
import {SortByKeyPipe} from "./sort-by-key.pipe";


@NgModule({
    declarations:[SortByKeyPipe],
    exports:[SortByKeyPipe]
})

export class SortByKeyPipeModule
{

}
