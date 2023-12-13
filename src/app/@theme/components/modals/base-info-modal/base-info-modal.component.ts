import {Component, NgModule, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {CommonModule} from "@angular/common";
import {BaseErrorMessageModule} from "../../messages/base-error-message/base-error-message.module";
import {BaseSuccessMessageModule} from "../../messages/base-success-message/base-success-message.module";
import {TranslateModule} from "@ngx-translate/core";

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
export class BaseInfoModalComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
    public title: string;
    public message: any;
    public type: any;

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