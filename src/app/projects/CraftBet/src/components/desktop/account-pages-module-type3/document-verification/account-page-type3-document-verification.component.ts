import { Component, Injector } from '@angular/core';
import { CommonSettingsComponent } from '../../../common/common-settings/common-settings.component';

@Component({
    selector: 'app-account-page-type3-account-verification',
    templateUrl: './account-page-type3-document-verification.component.html',
    styleUrls: ['./account-page-type3-document-verification.component.scss']
})
export class AccountPageType3DocumentVerificationComponent extends CommonSettingsComponent {
    public selectedFileValue;
    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    selectedDocumentValue(item: any)
    {
        this.selectedFileValue = item.Name;
        this.uploadDocumentForm.get('documentItem').setValue(item.Id);
    }

    public uploadDocument()
    {
        this.isSending = true;
        this.getSettingsInfoService.uploadDocument(this.uploadDocumentForm.get('documentItem').value);
        this.fileData['Name'] = '';
        this.selectedFileValue = '';
    }

}
