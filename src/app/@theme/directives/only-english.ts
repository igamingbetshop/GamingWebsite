import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyEnglish]'
})
export class OnlyEnglish {

  constructor(private el: ElementRef) { }

  @HostListener('paste', ['$event']) blockPaste(e: ClipboardEvent) {
    let t =  e.clipboardData.getData('text/plain');
    if(!(/^([a-zA-Z0-9\+\%\#\&\-]+)$/.test(t)))
      e.preventDefault();
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if(!(/^([a-zA-Z0-9\+\%\#\&\-]+)$/.test(e.key)))
      e.preventDefault();
  }
}
