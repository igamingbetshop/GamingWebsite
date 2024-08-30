import {Directive, ElementRef, HostListener, input, Input} from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class OnlyNumberDirective {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;
  preventFirstDigit = input<number>();

  @HostListener('paste', ['$event']) blockPaste(e: ClipboardEvent) {
    let t =  e.clipboardData.getData('text/plain');
    if(isNaN(Number(t)))
      e.preventDefault();
    else
    {
      const splitPastText = t.split('.');

      let partAfterDot = splitPastText[1];
      let partBeforeDot = splitPastText[0];
      if((partBeforeDot && partBeforeDot.length >20) || (partAfterDot && partAfterDot.length >4))
      {
        e.preventDefault();
      }
    }
  }

  @HostListener('input', ['$event']) onChange(event)
  {
    event.target.value = event.target.value.replace(',', '.');

  }

  @HostListener('keydown', ['$event']) onKeyDown(event)
  {
    let e = <KeyboardEvent> event;
    if(!(e.target as HTMLInputElement).value && this.preventFirstDigit && this.preventFirstDigit() === +e.key)
    {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    //if(!/^[0-9]*\.?[0-9]*$/.test(event.target.value + e.key)){}
    if(e.keyCode == 188 || e.keyCode == 110 || e.key == '.')
    {
      if(event.target.value.length == 0 || event.target.value.indexOf('.') > -1)
      {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    }
    if (!e.shiftKey && [46, 8, 9, 27, 13, 110, 190, 188].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    let partAfterDot = event.target.value.split(".")[1];
    let partBeforeDot = event.target.value.split(".")[0];

    const dotIndex =  event.target.value.indexOf('.');

    if((partAfterDot && partAfterDot.length >= 4) && e.key != "Backspace" && event.target.selectionStart > partBeforeDot.length)
    {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    if((partBeforeDot && partBeforeDot.length >= 20) && e.key != "Backspace")
    {
      if(dotIndex === -1)
      {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
      else
      {
        if(event.target.selectionStart < dotIndex)
        {
          e.stopPropagation();
          e.preventDefault();
          return false;
        }
      }
    }
  }
}
