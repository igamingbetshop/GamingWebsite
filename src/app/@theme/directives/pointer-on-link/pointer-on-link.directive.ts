import {Directive, HostBinding, input} from '@angular/core';

@Directive({
    selector: '[pointerOnLink]',
    standalone: true,
    exportAs: 'pointerOnLink',
})
export class PointerOnLinkDirective {
    @HostBinding('class.pointer-on-link') active: boolean;
    pointerOnLink = input.required({transform: (href) => {
            this.active = !!href;
            return href;
        }});

}
