import {Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[horizontal-scroll]',
    exportAs: 'slider'
})
export class HorizontalScrollDirective implements OnChanges
{
    @Input() step:string;
    startX:number;
    scrollLeft:number;
    constructor(private el: ElementRef) {}

    @HostBinding('class.grab') isDown:boolean = false;
    /*@HostListener('wheel', ['$event']) onWheel($event)
    {
        $event.preventDefault();
        this.el.nativeElement.scrollBy({
            left: $event.deltaY < 0 ? -50 : 50,
        });
    }*/
    @HostListener('mousedown', ['$event']) onDown($event)
    {
        this.isDown = true;
        this.startX = $event.pageX - this.el.nativeElement.offsetLeft;
        this.scrollLeft = this.el.nativeElement.scrollLeft;
    }
    @HostListener('mousemove', ['$event']) onMove($event)
    {
        if(!this.isDown) return;
        $event.preventDefault();
        const x = $event.pageX - this.el.nativeElement.offsetLeft;
        const walk = (x - this.startX) * 3; //scroll-fast
        this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
    }

    @HostListener('mouseleave', ['$event']) onLeave($event)
    {
        this.isDown = false;
    }
    @HostListener('mouseup', ['$event']) onUp($event)
    {
        this.isDown = false;
    }

    ngOnChanges(changes: SimpleChanges)
    {

    }

    changeStep(direction)
    {
        const el = this.getFirstVisibleElement(this.el.nativeElement);
        const scrollElem = direction > 0 ?  el.nextElementSibling : el.previousElementSibling;
        if(scrollElem)
            scrollElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    getFirstVisibleElement(container)
    {
        const elements = container.querySelectorAll('casino-game');
        for (const element of elements)
        {
            const rect = element.getBoundingClientRect();
            if (rect.left >= 0 && rect.right <= container.clientWidth) {
                return element;
            }
        }
        return null;
    }
}
