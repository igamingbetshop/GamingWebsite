import { Component, Injector } from '@angular/core';
import { CommonSettingsComponent } from '../../../common/common-settings/common-settings.component';

@Component({
  selector: 'app-mobile-account-page-type3-document-verification',
  templateUrl: './mobile-account-page-type3-document-verification.component.html',
  styleUrls: ['./mobile-account-page-type3-document-verification.component.scss']
})
export class MobileAccountPageType3DocumentVerificationComponent extends CommonSettingsComponent {
  public selectedFileValue;
  constructor(public injector: Injector) {
    super(injector);
    window.scroll(0,0);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  selectedDocumentValue(item: any) {
    this.selectedFileValue = item.Name;
    this.uploadDocumentForm.get('documentItem').setValue(item.Id);
  }

}
