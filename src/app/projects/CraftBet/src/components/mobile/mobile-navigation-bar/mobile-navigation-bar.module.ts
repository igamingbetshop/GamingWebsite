import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MobileNavigationBarComponent} from "./mobile-navigation-bar.component";

@NgModule({
    declarations:[MobileNavigationBarComponent],
    exports:[MobileNavigationBarComponent],
    imports:[
        CommonModule,
        TranslateModule
    ]
})

export class MobileNavigationBarModule
{
    constructor()
    {

    }

    getComponent()
    {
        return MobileNavigationBarComponent;
    }
}
