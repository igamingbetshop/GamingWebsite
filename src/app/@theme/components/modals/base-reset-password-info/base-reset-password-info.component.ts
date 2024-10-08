import {Component, inject, NgModule, OnInit} from '@angular/core';
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {CommonModule} from "@angular/common";
import {GlobalChangePasswordModule} from "../../global-change-password/global-change-password.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-base-reset-password-info',
  templateUrl: './base-reset-password-info.component.html',
  styleUrls: ['./base-reset-password-info.component.scss']
})
export class BaseResetPasswordInfoComponent implements  OnInit {

  public deviceSize: any;
  data:any = inject(MAT_DIALOG_DATA);
  getSettingsInfoService = inject(GetSettingsInfoService);
  dialogRef = inject(MatDialogRef<BaseResetPasswordInfoComponent>)

  ngOnInit() {
    this.deviceSize = window.innerWidth;

    this.getSettingsInfoService.notifyGetChangePasswordResponseMessage$.subscribe(data => {
      if (data.message == 'Success')
      {
        location.reload();
      }
    });
  }

  confirm() {
    this.dialogRef.close(true);
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