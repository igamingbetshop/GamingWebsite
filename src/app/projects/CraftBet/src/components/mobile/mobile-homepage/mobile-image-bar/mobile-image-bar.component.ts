import {Component, Injector} from '@angular/core';
import {BaseImageBar} from '../../../../../../../@theme/fragments/home/base-image-bar';

@Component({
    selector: 'app-mobile-image-bar',
    templateUrl: './mobile-image-bar.component.html',
    styleUrls: ['./mobile-image-bar.component.scss']
})
export class MobileImageBarComponent extends BaseImageBar {

    constructor(
        protected injector: Injector
    ) {
        super(injector);
    }

}

