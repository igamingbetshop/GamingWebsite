import {Component, Injector, NgModule, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {SaveData} from "@core/services";
import {CommonModule} from "@angular/common";
import {GlobalChangePasswordModule} from "../../global-change-password/global-change-password.module";
import {GlobalChangeLoginUsernameModule} from "../../global-change-login-username/global-change-login-username.module";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";

export interface ConfirmModel {
    className: string;
    info: Array<any>;
}

@Component({
    selector: 'app-base-first-login-tab',
    templateUrl: './base-first-login-tab.component.html',
    styleUrls: ['./base-first-login-tab.component.scss']
})
export class BaseFirstLoginTabComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

    public className: string;
    public info: Array<any> = [];
    public step = 1;
    public showInfoBlock: boolean = false;

    public saveData: SaveData;

    constructor(public injector: Injector) {
        super();
        this.saveData = injector.get(SaveData);
    }

    ngOnInit() {

        this.saveData.changeNickName.subscribe((data) => {
            if (data === '1') {
                setTimeout(() => {
                    this.close();
                }, 2000);
            }
        });
    }


    changePasswordMessage(event) {
        if (event.className == 'success_message') {
            setTimeout(() => {
                if (this.info.length > 1) {
                    this.step = 2;
                } else {
                    this.close();
                }
            }, 2000);
        }
    }

    confirm() {
        this.close();
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