import {Component, inject, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BaseErrorMessageModule} from "../../messages/base-error-message/base-error-message.module";
import {BaseSuccessMessageModule} from "../../messages/base-success-message/base-success-message.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ConfirmModel {
    title: string;
    message: any;
    type: any;
}

@Component({
    selector: 'app-base-info-modal',
    templateUrl: './base-info-modal.component.html',
    styleUrls: ['./base-info-modal.component.scss']
})
export class BaseInfoModalComponent  {

    data:any = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<BaseInfoModalComponent>);
    close()
    {
        this.dialogRef.close();
    }

}
@NgModule({
    declarations:[BaseInfoModalComponent],
    imports:[
        CommonModule,
        BaseErrorMessageModule,
        BaseSuccessMessageModule,
        TranslateModule,
    ]
})

export class BaseInfoModalModule
{

}