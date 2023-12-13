import {Component, NgModule, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {TranslateModule} from "@ngx-translate/core";

export interface ConfirmModel {
    title: string;
}

@Component({
    selector: 'app-base-terms-conditions-accept',
    templateUrl: './base-terms-conditions-accept.component.html',
    styleUrls: ['./base-terms-conditions-accept.component.scss']
})
export class BaseTermsConditionsAcceptComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
    public title: string;
    public errorMessage: any;

    constructor(public getSettingsInfoService: GetSettingsInfoService) {
        super();
    }

    ngOnInit() {
    }

    acceptTerms() {
        this.getSettingsInfoService.acceptTermCondition().subscribe(responseData => {
            if (responseData['ResponseCode'] === 0) {
                this.close();
            } else {
                this.errorMessage = responseData['Description'];
            }
        });
    }

    confirm() {
        this.close();
    }

}
@NgModule({
    declarations:[BaseTermsConditionsAcceptComponent],
    imports:[
        SanitizerModule,
        TranslateModule,
    ]
})

export class BaseTermsConditionsAcceptModule
{

}