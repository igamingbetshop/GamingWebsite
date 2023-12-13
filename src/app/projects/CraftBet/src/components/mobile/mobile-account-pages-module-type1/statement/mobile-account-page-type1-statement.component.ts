import {Component, Injector, OnInit} from '@angular/core';
import {UserAccountStatmentComponent} from "../../../../../../../@theme/components";
import {DefaultService} from "@core/services";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
    selector: 'app-mobile-account-page-type1-statement',
    templateUrl: './mobile-account-page-type1-statement.component.html'
})
export class MobileAccountPageType1StatementComponent extends UserAccountStatmentComponent {

    public accountData: Array<any> = [];

    constructor(public injector: Injector,
                public defaultService: DefaultService,
                public layoutService: LayoutService) {
        super(injector);
    }

    async ngOnInit() {
        super.ngOnInit();
        let input = {
            'Controller': 'Client',
            'Method': 'GetClientAccounts',
            'Token': this.userInfo.Token,
            'ClientId': this.userInfo.Id,
            'PartnerId': this.configService.defaultOptions.PartnerId,
            'RequestData': JSON.stringify({
                'ClientId': this.userInfo.Id
            })
        };

        let responseData = await this.defaultService.defaultRequest(input);
        this.accountData = responseData.ResponseObject.Accounts;
    }

}
