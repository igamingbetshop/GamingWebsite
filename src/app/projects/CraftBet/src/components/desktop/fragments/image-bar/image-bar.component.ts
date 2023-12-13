import {Component, Injector} from '@angular/core';
import {BaseImageBar} from "../../../../../../../@theme/fragments/home/base-image-bar";

@Component({
    selector: 'image-bar',
    templateUrl: './image-bar.component.html',
    styleUrls: ['./image-bar.component.scss']
})
export class ImageBarComponent extends BaseImageBar
{

    constructor(protected injector:Injector)
    {
        super(injector);
    }

}

