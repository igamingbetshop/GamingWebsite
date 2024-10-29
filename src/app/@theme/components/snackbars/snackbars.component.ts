import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {UtilityService} from "@core/services/app/utility.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-snackbars',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './snackbars.component.html',
  styleUrl: './snackbars.component.scss'
})
export class SnackbarsComponent implements OnInit, OnDestroy {
  snackbarMessage: any;
  public snackbarProcess = false;
  progress: number = 100;
  private interval: any; // Interval reference
  @HostBinding('style.display') display:string;
  private subscription: Subscription;

  constructor(public utilityService: UtilityService) {

  }

  ngOnInit() {
    this.subscription = this.utilityService.onGetSnackbar.subscribe((snackbar) => {
      if (snackbar) {
        this.displaySnackbar(snackbar);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.clearInterval();
  }

  async displaySnackbar(snackbar: any): Promise<void> {
    if (!this.snackbarProcess) {
    console.log(snackbar);
    this.snackbarProcess = snackbar?.showMessage;
      this.display = this.snackbarProcess ? 'block' : 'none';
      this.snackbarMessage = snackbar;
      await this.snackbarTimeout(snackbar?.delay || 5000);
      this.snackbarProcess = false;
    }
  }

  snackbarTimeout(delay: number): Promise<void> {
    this.countDown(delay);
    return new Promise(resolve => {
      setTimeout(() => resolve(), delay);
    });
  }

  countDown(delay: number) {
    this.clearInterval();
    this.progress = 100;
    const intervalTime = 50;
    const decrementAmount = (100 / (delay / intervalTime));

    this.interval = setInterval(() => {
      this.progress -= decrementAmount;
      if (this.progress <= 0) {
        this.clearInterval();
        this.closeSnackbar();
      }
    }, intervalTime);
  }

  closeSnackbar() {
    this.clearInterval();
    this.snackbarMessage = null;
    this.snackbarProcess = false;
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
