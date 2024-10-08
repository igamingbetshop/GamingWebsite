import {Component, Injector} from '@angular/core';
import { BaseCasinoMenu } from '../../../../../../../@theme/fragments/casino/menu/base-casino-menu';

@Component({
    selector: 'app-mobile-casino-menu',
    templateUrl: './mobile-casino-menu.component.html',
    styleUrls: ['./mobile-casino-menu.component.scss']
})
export class MobileCasinoMenuComponent extends BaseCasinoMenu {

    override resourceFolderName = 'mobilefragments';
    constructor(
        protected injector: Injector,
    ) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
