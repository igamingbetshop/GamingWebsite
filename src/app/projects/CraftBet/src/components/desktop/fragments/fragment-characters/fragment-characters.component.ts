import {Component, inject, Input} from '@angular/core';
import {AppConfirmComponent} from "../../app-confirm/app-confirm.component";
import {FragmentData} from "../../../../../../../@core/models";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'fragment-characters',
    templateUrl: './fragment-characters.component.html',
    styleUrls: ['./fragment-characters.component.scss']
})
export class FragmentCharactersComponent{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    dialog = inject(MatDialog);

    onLoginOpen() {
        this.showConfirm('open_login');
    }

    onRegisterOpen() {
        this.showConfirm('');
    }

    private showConfirm(titleName = '')
    {
        this.dialog.open(AppConfirmComponent, {data:{title: titleName == '' ? 'Confirm title' : titleName,
                message: true}});
    }
}

