import {Component, Injector, Input} from '@angular/core';
import {ConfigService, DefaultService, LocalStorageService} from "@core/services";
import {LayoutService} from "@core/services/app/layout.service";
import {Controllers, Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";
import {UserLogined} from "@core/services/app/userLogined.service";

@Component({
    selector: 'app-base-asian-account-statment',
    templateUrl: './base-asian-account-statment.component.html',
    styleUrls: ['./base-asian-account-statment.component.scss']
})
export class BaseAsianAccountStatmentComponent {

    @Input() className: string;

    public accountData: any;
    public userInfo: any;
    public userData: any;

    constructor(public injector: Injector,
                public defaultService: DefaultService,
                public layoutService: LayoutService,
                public localStorageService: LocalStorageService,
                public userLogined: UserLogined,
                public configService: ConfigService,
                public baseApiService: BaseApiService) {
        this.userData = this.localStorageService.get('user');
    }

    ngOnInit() {
        this.userInfo = this.userLogined.getUserInfo();
        this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_SESSIONINFO).subscribe((data: any) => {
            if (data['ResponseCode'] === 0) {
                this.accountData = data.ResponseObject;
            }
        });
    }

}
