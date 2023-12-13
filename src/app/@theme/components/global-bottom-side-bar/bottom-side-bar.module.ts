import {NgModule} from "@angular/core";
import {GlobalBottomSideBarComponent} from "./global-bottom-side-bar.component";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ToNumberPipeModule} from "../../pipes/to-number/to-number-pipe.module";
import {MobileMoreMenuModule} from "../mobile-more-menu/mobile-more-menu.module";


@NgModule({
    declarations:[GlobalBottomSideBarComponent],
    imports: [
        CommonModule,
        ToNumberPipeModule,
        TranslateModule,
        MobileMoreMenuModule
    ]
})

export class BottomSideBarModule
{
    getComponent()
    {
        return GlobalBottomSideBarComponent;
    }
}
