import {Component, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {ConfirmModel} from "@core/interfaces";



@Component({
    selector: 'app-base-info-block',
    templateUrl: './base-info-block.component.html',
    styleUrls: ['./base-info-block.component.scss']
})
export class BaseInfoBlockComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

    public title: string;
    public message: string;
    public className: string;
    public info: string;

    constructor() {
        super();
    }

    ngOnInit() {}

    confirm() {
        this.close();
    }

}
