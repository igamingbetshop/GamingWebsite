import {Component, Injector, Input} from '@angular/core';
import {Fragment} from "../../../../../../../@core/models";
import {FragmentSource, FragmentType} from "../../../../../../../@core/enums";
import {getFragmentsByType} from "../../../../../../../@core/utils";
import {
    BaseCharacterHierarchy
} from "../../../../../../../@theme/fragments/casino/base-character-hierarchy/base-character-hierarchy";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {LayoutService} from "../../../../../../../@core/services/app/layout.service";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
    selector: 'mobile-character-hierarchy',
    templateUrl: './mobile-character-hierarchy.component.html',
    styleUrls: ['./mobile-character-hierarchy.component.scss'],
    standalone: true,
    imports:
        [
            CommonModule,
            TranslateModule,
            FormsModule,
            FontAwesomeIcons,
            NgxPaginationModule
        ]
})
export class MobileCharacterHierarchyComponent extends BaseCharacterHierarchy
{
    @Input('position') position:string;
    fragments: {[key: string]: Fragment};

    constructor(protected injector:Injector, public layoutService:LayoutService)
    {
        super(injector);
    }

    ngOnInit()
    {
        super.ngOnInit();
        const block = this.configService.defaultOptions[FragmentSource.Mobile];
        this.fragments = getFragmentsByType(block, this.position, FragmentType.CharacterHierarchy);
    }
}
