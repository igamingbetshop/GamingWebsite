import {Component, OnInit, Input} from '@angular/core';
import {BaseService} from "@core/services/app/base.service";

@Component({
    selector: 'app-global-logout',
    templateUrl: './global-logout.component.html',
    styleUrls: ['./global-logout.component.scss']
})
export class GlobalLogoutComponent implements OnInit {

    @Input() itemClassname: string;
    @Input() itemIconName: string;
    @Input() onlyImg: boolean = false;

    constructor(private baseService: BaseService) {
    }

    ngOnInit() {
    }

    logout() {
        this.baseService.logOut().then(() => {
        });
    }

}
