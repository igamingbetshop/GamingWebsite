import {Component, inject, NgModule, OnInit} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LangService } from '@core/services/app/lang.service';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizerModule } from '../../../pipes/sanitizer/sanitizer.module';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeviceDetectorService} from "ngx-device-detector";
import {HttpClient} from "@angular/common/http";
import {Controllers, Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";

@Component({
  selector: 'app-cms-popup',
  templateUrl: './cms-popup.component.html',
  styleUrls: ['./cms-popup.component.scss']
})
export class CmsPopupComponent implements OnInit {

  data:any = inject(MAT_DIALOG_DATA);
  deviceDetectorService = inject(DeviceDetectorService);
  languageService = inject(LangService);
  dialogRef = inject(MatDialogRef<CmsPopupComponent>);
  http = inject(HttpClient);
  baseApiService = inject(BaseApiService);
  ngOnInit(): void {
    console.log('data in', this.data);
    if (this.data?.cmsPopupData) {
      this.loadPopupData(this.data?.cmsPopupData.Id);
    } else if (this.data?.loginedCmsPopupData) {
      this.loadPopupData(this.data?.loginedCmsPopupData.Id);
    }
  }

  private loadPopupData(popupId: number): void {
    let url: string;
    if (this.deviceDetectorService.isDesktop()) {
      url = '/assets/json/popups/web/' + popupId + '_' + this.languageService.currentLangKey + '.json';
    } else {
      url = '/assets/json/popups/mobile/' + popupId + '_' + this.languageService.currentLangKey + '.json';
    }

    this.http.get<any>(window['debugPath'] + url + '?=' + window['VERSION']).subscribe(data => {
      if (this.data?.cmsPopupData) {
        this.data.cmsPopupData.Content = data?.Content;
       this.data.cmsPopupData.Type = data?.Type;
       this.data.cmsPopupData.Id = data?.Id;
       this.data.cmsPopupData.ImageName = data?.ImageName;
      } else if (this.data?.loginedCmsPopupData) {
        this.data.loginedCmsPopupData.Content = data?.Content;
        this.data.loginedCmsPopupData.Type = data?.Type;
        this.data.loginedCmsPopupData.Id = data?.Id;
        this.data.loginedCmsPopupData.ImageName = data?.ImageName;
      }
    });
  }

  close()
  {
    this.dialogRef.close();
  }

  closeLoginedPopup(data) {
    console.log(data);
    this.baseApiService.apiRequest({ Id: data?.Id }, Controllers.CLIENT, Methods.VIEW_POPUP).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        this.dialogRef.close();
      }
    });
  }

}
@NgModule({
  declarations: [CmsPopupComponent],
  imports: [
    SanitizerModule,
    TranslateModule,
    FontAwesomeModule,
  ]
})

export class CmsPopupModule {

}
