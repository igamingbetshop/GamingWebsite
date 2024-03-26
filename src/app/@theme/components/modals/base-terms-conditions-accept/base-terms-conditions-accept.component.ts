import {Component, inject, NgModule} from '@angular/core';
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-base-terms-conditions-accept',
    templateUrl: './base-terms-conditions-accept.component.html',
    styleUrls: ['./base-terms-conditions-accept.component.scss']
})
export class BaseTermsConditionsAcceptComponent  {
    errorMessage: any;
    data:any = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<BaseTermsConditionsAcceptComponent>);
    getSettingsInfoService = inject(GetSettingsInfoService);

    acceptTerms() {
        this.getSettingsInfoService.acceptTermCondition().subscribe(responseData => {
            if (responseData['ResponseCode'] === 0) {
                this.close();
            } else {
                this.errorMessage = responseData['Description'];
            }
        });
    }

    close()
    {
        this.dialogRef.close();
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