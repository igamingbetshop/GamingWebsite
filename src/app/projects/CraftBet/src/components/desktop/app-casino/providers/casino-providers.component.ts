import {Component, ElementRef, HostListener, Injector, Input} from '@angular/core';
import {BaseCasinoProviders} from "../../../../../../../@theme/fragments/casino/providers/base-casino-providers";
import {StateService} from "../../../../../../../@core/services/app/state.service";
import {Fragment} from "../../../../../../../@core/models";
import {getFragmentsByType} from "../../../../../../../@core/utils";
import {FragmentSource, FragmentType} from "../../../../../../../@core/enums";

@Component({
    selector: 'casino-providers',
    templateUrl: './casino-providers.component.html',
    styleUrls: ['./casino-providers.component.scss']
})
export class CasinoProvidersComponent extends BaseCasinoProviders
{
    @Input('position') position:string;
    fragments: {[key: string]: Fragment};
    dropdownOpened: boolean = false;

    constructor(protected injector:Injector, public stateService:StateService, private elementRef: ElementRef)
    {
        super(injector);
    }

    ngOnInit()
    {
        super.ngOnInit();
        const block = this.configService.defaultOptions[FragmentSource.Web];
        this.fragments = getFragmentsByType(block, this.position, FragmentType.Provider);
    }

    toggleDropdown() {
        this.dropdownOpened = !this.dropdownOpened;
    }

    closeDropdown() {
        this.dropdownOpened = false;
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        if (!this.elementRef.nativeElement.contains(targetElement)) {
            this.closeDropdown();
        }
    }
}
