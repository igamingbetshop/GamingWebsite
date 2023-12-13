import {Component, NgModule, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {CommonModule} from "@angular/common";
import {GlobalChangePasswordModule} from "../../global-change-password/global-change-password.module";
import {TranslateModule} from "@ngx-translate/core";

export interface ConfirmModel {
  title: string;
}

@Component({
  selector: 'app-base-reset-password-info',
  templateUrl: './base-reset-password-info.component.html',
  styleUrls: ['./base-reset-password-info.component.scss']
})
export class BaseResetPasswordInfoComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  public title: string;
  public deviceSize: any;

  constructor(public getSettingsInfoService: GetSettingsInfoService) {
    super();
  }

  ngOnInit() {
    this.deviceSize = window.innerWidth;

    this.getSettingsInfoService._notifyGetChangePasswordResponseMessage.subscribe(data => {
      if (data.message == 'Success')
      {
        //this.close();
        location.reload();
      }
    });
  }

  confirm() {
    this.close();
  }

}
@NgModule({
  declarations:[BaseResetPasswordInfoComponent],
  imports:[
    CommonModule,
    GlobalChangePasswordModule,
    TranslateModule
  ]
})

export class BaseResetPasswordInfoModule
{

}