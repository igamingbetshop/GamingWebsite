import {Component, inject, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LocalStorageService} from "../../../@core/services";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-base-login-info-modal',
  templateUrl: './base-login-info-modal.component.html',
  styleUrls: ['./base-login-info-modal.component.scss']
})
export class BaseLoginInfoModalComponent {

  data:any = inject(MAT_DIALOG_DATA);
  localStorageService = inject(LocalStorageService);
  dialogRef = inject(MatDialogRef<BaseLoginInfoModalComponent>)

  confirm() {
    this.localStorageService.add("popupShown", true);
    this.dialogRef.close(true);
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