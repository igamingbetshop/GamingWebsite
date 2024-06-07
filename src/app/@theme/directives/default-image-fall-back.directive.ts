import {Directive, ElementRef, HostListener, inject, input} from "@angular/core";

@Directive({
    selector: '[defaultImageFallBack]',
    standalone: true
})
export class DefaultImageFallBackDirective{

    defaultSrc = input.required<string>();

    private elementRef:ElementRef = inject(ElementRef);

    @HostListener('error',  ['$event']) onerror(event:ErrorEvent){
        (event.target as HTMLImageElement).src = this.defaultSrc();
    }
}