import { Component, Injector, NgModule, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ConfirmModel } from '@core/interfaces';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import { LangService } from '@core/services/app/lang.service';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizerModule } from '../../../pipes/sanitizer/sanitizer.module';
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-cms-popup',
  templateUrl: './cms-popup.component.html',
  styleUrls: ['./cms-popup.component.scss']
})
export class CmsPopupComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  public title: string;
  public message: boolean;
  public data: any;
  public cmsPopupData: any;
  public cmsPopupItem: any = {};
  public loginedCmsPopupItem: any = {};
  public deviceDetectorService: DeviceDetectorService;
  private http: HttpClient;
  private languageService: LangService;

  constructor(public injector: Injector) {
    super();
    this.http = injector.get(HttpClient);
    this.languageService = injector.get(LangService);
    this.deviceDetectorService = injector.get(DeviceDetectorService);
  }

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
      url = '/assets/json/popups/' + popupId + '_' + this.languageService.currentLangKey + '.json';
    } else {
      url = '/assets/json/popups/' + popupId + '_' + this.languageService.currentLangKey + '.json'; // to change
    }

    this.http.get<any>(window['debugPath'] + url + '?=' + window['VERSION']).subscribe(data => {
      if (this.data?.cmsPopupData) {
        this.cmsPopupItem.Content = data?.Content;
        this.cmsPopupItem.Type = data?.Type;
        this.cmsPopupItem.Id = data?.Id;
        this.cmsPopupItem.ImageName = data?.ImageName;
      } else if (this.data?.loginedCmsPopupData) {
        this.loginedCmsPopupItem.Content = data?.Content;
        this.loginedCmsPopupItem.Type = data?.Type;
        this.loginedCmsPopupItem.Id = data?.Id;
        this.loginedCmsPopupItem.ImageName = data?.ImageName;
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
