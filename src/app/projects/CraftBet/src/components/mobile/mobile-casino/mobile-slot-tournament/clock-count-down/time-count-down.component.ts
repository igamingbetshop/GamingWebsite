import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
  input,
  viewChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {interval, Subscription} from 'rxjs';
import {ISegment, ITimeRemaining} from "../../../../../../../../@core/models";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'time-count-down',
  templateUrl: 'time-count-down.component.html',
  styleUrls: ['./time-count-down.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ]
})
export class TimeCountDownComponent implements OnInit, AfterViewInit, OnDestroy {

  overlays = viewChildren<ElementRef<HTMLDivElement>>('overlayRef');
  closeTime = input.required<Date>();
  timeSegments: ISegment[] = [];
  public numbers:number[] = [];

  private subInterval: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    this.setSegmentStaticData();
  }

  setSegmentStaticData() {
    this.timeSegments = ['Days','Hours', 'Minutes', 'Seconds'].map(segment => {
       return {
        numbers: [
          {displayTop: null, displayBottom: null, overlayTop: null, overlayBottom: null},
          {displayTop: null, displayBottom: null, overlayTop: null, overlayBottom: null}
        ],
        temporalUnits: segment
      };
    });
  }

  ngAfterViewInit() {
    this.subInterval = interval(1000).subscribe(() => {
      const isComplete = this.updateAllSegments();

      if (isComplete) {
        this.subInterval.unsubscribe();
      }
    });

    this.updateAllSegments();
  }

  updateTimeSegment(timeValue: any, segment: any, segmentOverlay: any) {

    if (parseInt(segment.displayTop, 10) == timeValue) {
      return;
    }

    this.renderer.addClass(segmentOverlay, 'flip');
    segment.displayTop = timeValue;
    segment.overlayBottom = timeValue;
    this.changeDetectorRef.detectChanges();

    const finishAnimation = () => {
      this.renderer.removeClass(segmentOverlay, 'flip');
      segment.displayBottom = timeValue;
      segment.overlayTop = timeValue;
      this.changeDetectorRef.detectChanges();
      segmentOverlay.removeEventListener('animationend', finishAnimation);
    };

    segmentOverlay.addEventListener('animationend', finishAnimation);
  }

  updateTimeSection(index: number, timeValue: any, segment: any) {

    const firstNumber = Math.floor(timeValue / 10) || 0;
    const secondNumber = timeValue % 10 || 0;
    const startedElement = index * 2;
    const endedElement = index * 2 + 1;
    const segmentOverlay = this.overlays().filter((el, i) => (i >= startedElement && i <= endedElement));

    this.updateTimeSegment(firstNumber, segment.numbers[0], segmentOverlay[0].nativeElement);
    this.updateTimeSegment(secondNumber, segment.numbers[1], segmentOverlay[1].nativeElement);
  }

  getTimeRemaining(targetDateTime: any) {
    const nowTime = Date.now();
    const complete = nowTime >= targetDateTime;

    if (complete) {
      return {complete, Seconds: 0, Minutes: 0, Hours: 0, Days: 0};
    }

    const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
    const days = Math.floor(secondsRemaining / 24 / 60 / 60);
    const hours = Math.floor(secondsRemaining / 60 / 60) - days * 24;
    const absoluteHours = Math.floor(secondsRemaining / 60 / 60);
    const minutes = Math.floor(secondsRemaining / 60) - absoluteHours * 60;
    const seconds = secondsRemaining % 60;
    return {complete, Seconds: seconds, Minutes: minutes, Hours: hours, Days: days};
  }

  updateAllSegments() {
    const timeRemainingBits: ITimeRemaining = this.getTimeRemaining(this.closeTime().getTime());
    this.timeSegments.forEach((segment: ISegment, index: any) => {
      this.updateTimeSection(index, timeRemainingBits[segment.temporalUnits], segment);
    });

    return timeRemainingBits.complete;
  }

  ngOnDestroy() {
    this.subInterval.unsubscribe();
  }
}

