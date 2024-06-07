import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    NgModule,
    OnInit,
    ViewChild
} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LangService} from '@core/services/app/lang.service';
import {TranslateModule} from '@ngx-translate/core';
import {SanitizerModule} from '../../../pipes/sanitizer/sanitizer.module';
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
    loadedData = false;
    data: any = inject(MAT_DIALOG_DATA);
    deviceDetectorService = inject(DeviceDetectorService);
    languageService = inject(LangService);
    dialogRef = inject(MatDialogRef<CmsPopupComponent>);
    changeDetectorRef = inject(ChangeDetectorRef);

    http = inject(HttpClient);
    baseApiService = inject(BaseApiService);

    ngOnInit(): void {
        console.log('data in', this.data);
        if (this.data?.cmsPopupData) {
            this.loadPopupData(this.data?.cmsPopupData.Id);
            this.closePopup(this.data?.cmsPopupData, 1);
        } else if (this.data?.loginedCmsPopupData) {
            this.loadPopupData(this.data?.loginedCmsPopupData.Id);
            this.closePopup(this.data?.loginedCmsPopupData, 1);
        }
    }

    private loadPopupData(popupId: number): void {
        let url: string;
        let imageUrl: string;
        if (this.deviceDetectorService.isDesktop()) {
            url = '/assets/json/popups/web/' + popupId + '_' + this.languageService.currentLangKey + '.json';
            imageUrl = window['debugPath'] + '/assets/images/popup/web/';
        } else {
            url = '/assets/json/popups/mobile/' + popupId + '_' + this.languageService.currentLangKey + '.json';
            imageUrl = window['debugPath'] + '/assets/images/popup/mobile/';
        }

        this.http.get<any>(window['debugPath'] + url + '?=' + window['VERSION']).subscribe(data => {
            if (this.data?.cmsPopupData) {
                this.data.cmsPopupData.Content = data?.Content;
                this.data.cmsPopupData.Type = data?.Type;
                this.data.cmsPopupData.Id = data?.Id;
                this.data.cmsPopupData.ImageName = imageUrl + data?.ImageName;
            } else if (this.data?.loginedCmsPopupData) {
                this.data.loginedCmsPopupData.Content = data?.Content;
                this.data.loginedCmsPopupData.Type = data?.Type;
                this.data.loginedCmsPopupData.Id = data?.Id;
                this.data.loginedCmsPopupData.ImageName = imageUrl + data?.ImageName;
            }
            this.loadedData = true;
        });
    }

    closePopup(data, event?) {
        this.baseApiService.apiRequest({
            Id: data?.Id,
            ViewTypeId: event
        }, Controllers.CLIENT, Methods.VIEW_POPUP).subscribe((data) => {
            if (data['ResponseCode'] == 0) {
                if (event !== 1) {
                    this.dialogRef.close();
                }
            }
        });
    }

    public addClickListener(container: any, event): void {
        if (container) {
            const target = event.target as HTMLElement;
            if (target.tagName === 'A' && target.hasAttribute('href')) {
                if (this.data.cmsPopupData) {
                    this.closePopup(this.data.cmsPopupData, 4);
                } else if (this.data.loginedCmsPopupData) {
                    this.closePopup(this.data.loginedCmsPopupData, 4);
                }
            }
        }
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
