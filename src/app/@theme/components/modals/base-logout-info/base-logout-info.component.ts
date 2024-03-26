import {Component, inject, NgModule} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-base-logout-info',
  templateUrl: './base-logout-info.component.html',
  styleUrls: ['./base-logout-info.component.scss']
})
export class BaseLogoutInfoComponent  {

  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<BaseLogoutInfoComponent>);

  close() {
    this.dialogRef.close();
  }
}
@NgModule({
  declarations:[BaseLogoutInfoComponent],
  imports:[
    TranslateModule,
  ]
})

export class BaseLogoutInfoModule
{

}