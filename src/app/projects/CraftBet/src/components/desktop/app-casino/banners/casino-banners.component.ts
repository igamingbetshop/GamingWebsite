import {Component, Injector} from '@angular/core';
import {BaseBanners} from "../../../../../../../@theme/fragments/banners/base-banners";
import {AppConfirmComponent} from "../../app-confirm/app-confirm.component";
import {SimpleModalService} from "ngx-simple-modal";

@Component({
    selector: 'casino-banners',
    templateUrl: './casino-banners.component.html',
    styleUrls: ['./casino-banners.component.scss']
})
export class CasinoBannersComponent extends BaseBanners
{

    constructor(protected injector:Injector, private simpleModalService:SimpleModalService)
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
        this.simpleModalService.addModal(AppConfirmComponent, {
            title: titleName == '' ? 'Confirm title' : titleName,
            message: true
        }).subscribe((isConfirmed) => {
        });
    }


}
