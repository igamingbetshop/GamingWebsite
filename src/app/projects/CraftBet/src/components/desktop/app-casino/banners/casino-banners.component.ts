import {Component, Injector} from '@angular/core';
import {BaseBanners} from "../../../../../../../@theme/fragments/banners/base-banners";
import {AppConfirmComponent} from "../../app-confirm/app-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'casino-banners',
    templateUrl: './casino-banners.component.html',
    styleUrls: ['./casino-banners.component.scss']
})
export class CasinoBannersComponent extends BaseBanners
{

    constructor(protected injector:Injector, private dialog:MatDialog)
    {
        super(injector);
    }

    onLoginOpen()
    {
        this.showConfirm('open_login');
    }

    onRegisterOpen()
    {
        this.showConfirm('');
    }

    private showConfirm(titleName = '')
    {
        this.dialog.open(AppConfirmComponent, {data:{ title: titleName == '' ? 'Confirm title' : titleName,
                message: true}});
    }


}

