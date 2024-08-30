import {Directive, HostBinding, ElementRef, HostListener, Input, input} from '@angular/core';

@Directive({
    selector: '[collapse]',

})
export class CollapseDirective {

    closeAll = input<boolean>(false);
    @Input('collapse')
    set collapse(value:boolean)
    {
        this.opened = value;
    }
    @HostBinding('class.opened') opened: boolean = false;

    constructor(private el: ElementRef) {}

    @HostListener('click', ['$event']) onCollapseClick($event)
    {
        if(this.closeAll())
        {
            if(this.el.nativeElement == $event.currentTarget) {
                $event.stopPropagation();
                this.opened = !this.opened;
                let event = new CustomEvent('closeCollapse', {detail:this.el.nativeElement});
                document.dispatchEvent(event);
            }
        }
        else
        {
            $event.stopPropagation();
            this.opened = !this.opened;
        }
    }

    @HostListener('document:closeCollapse', ['$event']) closeByDetails($event)
    {
        if(this.closeAll())
        {
            if($event.detail != this.el.nativeElement)
                this.opened = false;
        }
    }
}
