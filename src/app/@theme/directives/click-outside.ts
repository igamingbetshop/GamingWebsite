import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  constructor(private _elementRef : ElementRef) {
  }

  @Output()
  public clickOutside = new EventEmitter<any>();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(targetElement);
    }
  }

  private isClickInElement(e:any):boolean {
    var current = e;
    if(current == this._elementRef.nativeElement) {
      return true;
    }
    for(let parentKey in e.path) {
      if(e.path[parentKey] == this._elementRef.nativeElement)
      {
        return true;
      }
    }

    return false;
  }
}
