import {Component, NgModule, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {ConfirmModel} from "@core/interfaces";
import {CommonModule} from "@angular/common";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-base-mobile-verified',
  templateUrl: './base-mobile-verified.component.html',
  styleUrls: ['./base-mobile-verified.component.scss']
})
export class BaseMobileVerifiedComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  public title: string;
  public message: string | boolean;
  public info: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  confirm() {
    this.close();
  }

}
@NgModule({
  declarations:[BaseMobileVerifiedComponent],
  imports:[
    CommonModule,
    SanitizerModule,
    TranslateModule,
  ]
})

export class BaseMobileVerifiedModule
{

}