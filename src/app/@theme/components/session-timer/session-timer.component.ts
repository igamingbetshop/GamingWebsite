import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseService } from '../../../@core/services/app/base.service';
import { LocalStorageService } from '../../../@core/services';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.scss']
})
export class SessionTimerComponent implements OnInit, OnDestroy {
  timer: number = 2; // to change
  timerDisplay: string;
  countdownInterval: any;
  timerInterval: any;
  userData: any;

  constructor(private baseService: BaseService, public localStorageService: LocalStorageService) {
    this.userData = this.localStorageService.get('user');
    console.log('userData',this.userData);
    // this.timer = this.userData; // to change
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    this.updateTimerDisplay();

    this.countdownInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 1) {
        clearInterval(this.countdownInterval);
        this.startTimer(60);
      } else {
        this.updateTimerDisplay();
      }
    }, 60000);
  }

  startTimer(duration: number): void {
    let timer = duration;

    this.timerInterval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      this.timerDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      console.log(this.timerDisplay);

      if (minutes === 0 && seconds === 0) {
        this.logoutClient();
        clearInterval(this.timerInterval);
      } else {
        timer--;
      }
    }, 1000);
  }

  updateTimerDisplay(): void {
    const minutes = this.timer < 10 ? `0${this.timer}` : `${this.timer}`;
    this.timerDisplay = `${minutes}:00`;
    console.log(this.timerDisplay);
  }

  logoutClient(): void {
    console.log('Logged out');
    this.baseService.logOut().then(() => {
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
    clearInterval(this.timerInterval);
  }
}
