import {Directive, ElementRef, HostListener, inject, input, output, signal, WritableSignal} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {WINDOW} from "../../app.module";

@Directive({
    selector: '[infinite-scroll]',
    standalone:true,
    exportAs: 'infiniteScroll'
})
export class InfiniteScrollDirective
{
    document = inject(DOCUMENT);
    window = inject(WINDOW);
    isLoading = input.required<boolean>();
    onLoadItems = output<boolean>();
    showTotals:WritableSignal<boolean> = signal(false);
    timeout:any;

    @HostListener('window:scroll',['$event'])
    onWindowScroll(event:any)
    {
        if(!this.isLoading() && this.window.innerHeight + this.window.scrollY >= this.document.body.offsetHeight)
        {
            this.onLoadItems.emit(true);
        }
        this.showTotals.set(true);
    }
    @HostListener('window:scrollend',['$event'])
    onWindowScrollEnd(event:any)
    {
        if(this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.showTotals.set(false);
        }, 2000);
    }
    constructor(private el: ElementRef) {}
}
