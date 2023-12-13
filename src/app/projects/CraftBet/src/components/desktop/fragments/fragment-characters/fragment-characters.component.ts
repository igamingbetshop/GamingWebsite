import {Component, Injector, Input, OnInit} from '@angular/core';
import {AppConfirmComponent} from "../../app-confirm/app-confirm.component";
import {SimpleModalService} from "ngx-simple-modal";
import {FragmentData} from "../../../../../../../@core/models";

@Component({
    selector: 'fragment-characters',
    templateUrl: './fragment-characters.component.html',
    styleUrls: ['./fragment-characters.component.scss']
})
export class FragmentCharactersComponent implements OnInit{
    @Input('fragmentConfig') fragmentConfig:FragmentData;

    constructor(protected injector: Injector, private simpleModalService: SimpleModalService) {

    }

    ngOnInit() {
    }

    onLoginOpen() {
        this.showConfirm('open_login');
    }

    onRegisterOpen() {
        this.showConfirm('');
    }

    private showConfirm(titleName = '') {
        this.simpleModalService.addModal(AppConfirmComponent, {
            title: titleName == '' ? 'Confirm title' : titleName,
            message: true
        }).subscribe((isConfirmed) => {
        });
    }
}

