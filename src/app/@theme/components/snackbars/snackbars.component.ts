import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StateService} from "@core/services/app/state.service";
import {NgClass} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-snackbars',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule
  ],
  templateUrl: './snackbars.component.html',
  styleUrl: './snackbars.component.scss'
})
export class SnackbarsComponent implements OnInit, OnChanges {
  @Input() snackbarMessage: any;
  progress: number = 100;

  constructor(public stateService: StateService) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.snackbarMessage && this.snackbarMessage) {
      this.countDown(this.snackbarMessage.delay || 5000);
    }
  }

  countDown(delay: number) {
    this.progress = 100;
    const intervalTime = 50;
    const decrementAmount = (100 / (delay / intervalTime));

    const interval = setInterval(() => {
      this.progress -= decrementAmount;
      if (this.progress <= 0) {
        clearInterval(interval);
        this.closeSnackbar();
      }
    }, intervalTime);
  }

  closeSnackbar() {
    this.snackbarMessage = null;
  }
}
