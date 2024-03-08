import {Component, ElementRef, HostListener, Injector, OnInit} from '@angular/core';
import { BaseCasinoProviders} from '../../../../../../../@theme/fragments/casino/providers/base-casino-providers';
import { StateService} from '../../../../../../../@core/services/app/state.service';

@Component({
    selector: 'app-mobile-casino-providers',
    templateUrl: './mobile-casino-providers.component.html',
    styleUrls: ['./mobile-casino-providers.component.scss']
})
export class MobileCasinoProvidersComponent extends BaseCasinoProviders
{
    @HostListener('window:resize', ['$event'])
    onResize(event)
    {
       this.calcGridItemCount();
    }
    public gridFrCount; // TODO later should be changed to dynamic
    dropdownOpened: boolean = false;

    constructor(
        protected injector: Injector,
        public stateService: StateService,
        private elementRef: ElementRef
    )
    {
        super(injector);
        this.calcGridItemCount();
    }

    private calcGridItemCount()
    {
        if (window.matchMedia('(max-width: 390px)').matches)
        {
            this.gridFrCount = 4;
        }
        else if (window.matchMedia('(max-width: 450px)').matches)
        {
            this.gridFrCount = 5;
        }
        else if (window.matchMedia('(max-width: 550px)').matches)
        {
            this.gridFrCount = 6;
        }
        else if (window.matchMedia('(max-width: 1200px)').matches) {
            this.gridFrCount = 8;
        }
    }

    toggleDropdown() {
        this.dropdownOpened = !this.dropdownOpened;
    }

    closeDropdown() {
        this.dropdownOpened = false;
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        console.log(event.target);
        const targetElement = event.target as HTMLElement;
        if (!this.elementRef.nativeElement.contains(targetElement)) {
            this.closeDropdown();
        }
    }
}
