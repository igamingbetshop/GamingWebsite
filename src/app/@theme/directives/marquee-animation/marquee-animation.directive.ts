import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[marqueeAnimation]'
})
export class MarqueeAnimationDirective {
  @Input('marqueeDuration') animationDuration = 25;
  @Input('marqueeAnimation') timingFunction = 'linear';

  @HostBinding('style.animation-duration')
  get animationDurationStyle(): string {
    return `${this.animationDuration}s`;
  }

  @HostBinding('style.animation-timing-function')
  get timingFunctionStyle(): string {
    return this.timingFunction;
  }

  constructor(private el: ElementRef) { }

}
