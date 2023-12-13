import {NgModule} from "@angular/core";
import {BaseSuccessMessageComponent} from "./base-success-message.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations:[BaseSuccessMessageComponent],
    exports:[BaseSuccessMessageComponent],
    imports:[
        TranslateModule
    ]
})

export class BaseSuccessMessageModule
{

}