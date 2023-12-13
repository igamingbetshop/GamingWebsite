import {Component, Injector, Input} from '@angular/core';
import { BaseCasinoMenu } from '../../../../../../../@theme/fragments/casino/menu/base-casino-menu';
import { Fragment } from '../../../../../../../@core/models';
import { getFragmentsByType } from '../../../../../../../@core/utils';
import { FragmentSource, FragmentType } from '../../../../../../../@core/enums';

@Component({
    selector: 'app-mobile-casino-menu',
    templateUrl: './mobile-casino-menu.component.html',
    styleUrls: ['./mobile-casino-menu.component.scss']
})
export class MobileCasinoMenuComponent extends BaseCasinoMenu {

    constructor(
        protected injector: Injector,
    ) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
