import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SaveData} from "@core/services";

@Component({
  selector: 'app-global-sign-up-btn',
  templateUrl: './global-sign-up-btn.component.html',
  styleUrls: ['./global-sign-up-btn.component.scss']
})
export class GlobalSignUpBtnComponent implements OnInit, OnDestroy {

  @Input() itemClassname: string;
  @Input() hasIcon: boolean = false;
  @Input() menuItem: any;

  constructor(private saveData: SaveData) {
  }

  ngOnInit() {
  }

  showSignUp(data, event: MouseEvent) {
    event.stopPropagation();
    if (data === 'open') {
      this.saveData.showSignUpSection.next('signUp');
    }
  }

  ngOnDestroy() {

  }

}
