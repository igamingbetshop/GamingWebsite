import {Component, inject, NgModule, OnInit} from '@angular/core';
import {SaveData} from "@core/services";
import {CommonModule} from "@angular/common";
import {GlobalChangePasswordModule} from "../../global-change-password/global-change-password.module";
import {GlobalChangeLoginUsernameModule} from "../../global-change-login-username/global-change-login-username.module";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
    selector: 'app-base-first-login-tab',
    templateUrl: './base-first-login-tab.component.html',
    styleUrls: ['./base-first-login-tab.component.scss']
})
export class BaseFirstLoginTabComponent implements OnInit {

    public step = 1;
    public showInfoBlock: boolean = false;

    saveData = inject(SaveData);
    data:any = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<BaseFirstLoginTabComponent>)

    ngOnInit() {

        this.saveData.changeNickName.subscribe((data) => {
            if (data === '1') {
                setTimeout(() => {
                    this.dialogRef.close();
                }, 2000);
            }
        });
    }


    changePasswordMessage(event) {
        if (event.className == 'success_message') {
            setTimeout(() => {
                if (this.data.info.length > 1) {
                    this.step = 2;
                } else {
                    this.dialogRef.close();
                }
            }, 2000);
        }
    }

    confirm() {
        this.dialogRef.close();
    }

    openInfoBlock() {
        this.showInfoBlock = !this.showInfoBlock;
    }

    goBack() {
        this.step = this.step == 1 ? 2 : 1;
    }

}
@NgModule({
    declarations:[BaseFirstLoginTabComponent],
    imports:[
        CommonModule,
        GlobalChangePasswordModule,
        GlobalChangeLoginUsernameModule,
        SanitizerModule,
        FontAwesomeModule,
        TranslateModule,
    ]
})

export class BaseFirstLoginTabModule
{

}