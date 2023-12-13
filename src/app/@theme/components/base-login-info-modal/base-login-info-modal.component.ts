import {Component, NgModule, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageService} from "../../../@core/services";

export interface ConfirmModel {
  title: string;
  loginData: any;
}


@Component({
  selector: 'app-base-login-info-modal',
  templateUrl: './base-login-info-modal.component.html',
  styleUrls: ['./base-login-info-modal.component.scss']
})
export class BaseLoginInfoModalComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  public title: string;
  public loginData: any;

  constructor(public localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit() {}

  confirm() {
    this.localStorageService.add("popupShown", true);
    this.close();
  }

}
@NgModule({
  declarations:[BaseLoginInfoModalComponent],
  imports:[
    CommonModule,
    TranslateModule
  ]
})

export class BaseLoginInfoModalModule
{

}