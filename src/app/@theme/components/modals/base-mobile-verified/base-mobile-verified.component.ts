import {Component, inject, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-base-mobile-verified',
  templateUrl: './base-mobile-verified.component.html',
  styleUrls: ['./base-mobile-verified.component.scss']
})
export class BaseMobileVerifiedComponent {

  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<BaseMobileVerifiedComponent>);

  close()
  {
    this.dialogRef.close();
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