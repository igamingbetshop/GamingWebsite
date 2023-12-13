import {Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[reg-exp-input]',
})
export class RegExpInputDirective implements OnChanges, OnInit
{
    @Input('regExp') regExpPattern:string;

    private maxlength;

    constructor(private el: ElementRef)
    {

    }

    @HostListener('keydown', ['$event']) onKeyDown($event)
    {
        if(this.regExpPattern
            &&!this.regExpPattern.includes('@')
            &&$event.key !== 'Backspace'
            && $event.key !== 'Delete'
            && this.maxlength > 0
            && this.el.nativeElement.value.length === this.maxlength)
            return false;
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes.regExpPattern?.currentValue)
        {
            this.parsePattern();
        }
    }
    ngOnInit()
    {
        
    }

    private parsePattern()
    {
       const p1 = this.regExpPattern.split('{')[1];
       if(p1)
       {
           const p2 = p1.split(',')[1];
           if(p2)
           {
               const p3 = Number(p2.split('}')[0]);
               if(!isNaN(p3))
               {
                   this.maxlength = p3;
               }
           }
       }
    }

}
