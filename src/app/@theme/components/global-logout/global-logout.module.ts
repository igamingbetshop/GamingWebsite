import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalLogoutComponent} from "./global-logout.component";

@NgModule({
    declarations:[GlobalLogoutComponent],
    exports:[GlobalLogoutComponent],
    imports:[
        CommonModule,
        TranslateModule,
    ]
})

export class GlobalLogoutModule
{

}