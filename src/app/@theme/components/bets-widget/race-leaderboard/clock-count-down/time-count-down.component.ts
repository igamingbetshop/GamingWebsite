import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  input,
  viewChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {interval, Subscription} from 'rxjs';
import {TranslateModule} from "@ngx-translate/core";

type ITimeRemaining = {
  [key: string]: any;
  complete: any;
  Sec: any;
  Min: any;
  Hour: any;
  Day: any;
}

type INumbers = {
  displayTop: any;
}

type ISegment = {
  [key: string]: any;
  numbers: INumbers[];
  temporalUnits: string;
}


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
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.setSegmentStaticData();
  }

  setSegmentStaticData() {
    this.timeSegments = ['Day','Hour', 'Min', 'Sec'].map(segment => {
       return {
        numbers: [
          {displayTop: null},
          {displayTop: null}
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

  updateTimeSegment(timeValue: any, segment: any) {

    if (parseInt(segment.displayTop, 10) == timeValue) {
      return;
    }

    segment.displayTop = timeValue;
    this.changeDetectorRef.detectChanges();

  }

  updateTimeSection(timeValue: any, segment: any) {

    const firstNumber = Math.floor(timeValue / 10) || 0;
    const secondNumber = timeValue % 10 || 0;

    this.updateTimeSegment(firstNumber, segment.numbers[0]);
    this.updateTimeSegment(secondNumber, segment.numbers[1]);
  }

  getTimeRemaining(targetDateTime: any) {
    const nowTime = Date.now();
    const complete = nowTime >= targetDateTime;

    if (complete) {
      return {complete, Sec: 0, Min: 0, Hour: 0, Day: 0};
    }

    const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
    const days = Math.floor(secondsRemaining / 24 / 60 / 60);
    const hours = Math.floor(secondsRemaining / 60 / 60) - days * 24;
    const absoluteHours = Math.floor(secondsRemaining / 60 / 60);
    const minutes = Math.floor(secondsRemaining / 60) - absoluteHours * 60;
    const seconds = secondsRemaining % 60;
    return {complete, Sec: seconds, Min: minutes, Hour: hours, Day: days};
  }

  updateAllSegments() {
    const timeRemainingBits: ITimeRemaining = this.getTimeRemaining(this.closeTime().getTime());
    this.timeSegments.forEach((segment: ISegment) => {
      this.updateTimeSection(timeRemainingBits[segment.temporalUnits], segment);
    });

    return timeRemainingBits.complete;
  }

  ngOnDestroy() {
    this.subInterval.unsubscribe();
  }
}

