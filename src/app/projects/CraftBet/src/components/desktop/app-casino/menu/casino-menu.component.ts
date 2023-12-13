import {Component, Input} from '@angular/core';
import {BaseCasinoMenu} from "../../../../../../../@theme/fragments/casino/menu/base-casino-menu";
import {Fragment} from "../../../../../../../@core/models";
import {getFragmentsByType} from "../../../../../../../@core/utils";
import {FragmentSource, FragmentType} from "../../../../../../../@core/enums";

@Component({
    selector: 'casino-menu',
    templateUrl: './casino-menu.component.html',
    styleUrls: ['./casino-menu.component.scss']
})
export class CasinoMenuComponent extends BaseCasinoMenu
{
    @Input('position') position:string;
    fragments: {[key: string]: Fragment};

    ngOnInit()
    {
        super.ngOnInit();
        const block = this.configService.defaultOptions[FragmentSource.Web];
        this.fragments = getFragmentsByType(block, this.position, FragmentType.Menu);
    }
}
