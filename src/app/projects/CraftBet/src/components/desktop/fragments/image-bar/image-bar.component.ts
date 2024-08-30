import {Component, Injector} from '@angular/core';
import {BaseImageBar} from "../../../../../../../@theme/fragments/home/base-image-bar";
import {TranslateModule} from "@ngx-translate/core";
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {PointerOnLinkDirective} from "../../../../../../../@theme/directives/pointer-on-link/pointer-on-link.directive";
import {NgStyle} from "@angular/common";

@Component({
    selector: 'image-bar',
    templateUrl: './image-bar.component.html',
    styleUrls: ['./image-bar.component.scss'],
    standalone:true,
    imports:[
        TranslateModule,
        SanitizerModule,
        PointerOnLinkDirective,
        NgStyle
    ]
})
export class ImageBarComponent extends BaseImageBar
{

    constructor(protected injector:Injector)
    {
        super(injector);
    }

}

