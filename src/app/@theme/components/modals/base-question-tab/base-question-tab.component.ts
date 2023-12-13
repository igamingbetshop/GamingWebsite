import {Component, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";

export interface ConfirmModel {
  title: string;
}

@Component({
  selector: 'app-base-question-tab',
  templateUrl: './base-question-tab.component.html',
  styleUrls: ['./base-question-tab.component.scss']
})
export class BaseQuestionTabComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  public title: string;

  constructor() {
    super();
  }

  ngOnInit() {

  }

  confirm() {
    this.result = true;
    this.close();
  }

}
