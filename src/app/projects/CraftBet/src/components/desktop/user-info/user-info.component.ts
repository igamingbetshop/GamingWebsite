import { Component, OnInit, Injector, Input, inject } from '@angular/core';
import { Controllers, Methods, Products } from '@core/enums';
import { LocalStorageService, SharedService } from '@core/services';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseApiService } from '@core/services/api/base-api.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {
  @Input() info: any;
  public rightToLeftOrientation = false;
  public userInfoList: any = {};
  public faTimes = faTimes;
  public isLoaded: boolean;
  data: any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<UserInfoComponent>);

  public showBonus: boolean;

  public localStorageService: LocalStorageService;
  public baseApiService: BaseApiService;
  public translateService: TranslateService;
  public betStatuses;
  public CurrencySymbol: any;

  constructor(public injector: Injector, public sharedService: SharedService) {
    this.localStorageService = injector.get(LocalStorageService);
    this.baseApiService = injector.get(BaseApiService);
    this.translateService = injector.get(TranslateService);
    const userData = this.localStorageService.get('user');
    this.CurrencySymbol = userData ? userData.CurrencySymbol : '';
  }

  ngOnInit() {
    this.info = this.data.info || this.info;
    this.showBonus = this.info.ProductId == Products.SPORTSBOOK && this.info.BetTypeId == 2;
    this.baseApiService.apiPost('', { RequestData: JSON.stringify(this.info.BetDocumentId), Controller: Controllers.DOCUMENT, Method:Methods.GET_BET_INFO }, null , true).subscribe((responseData) => {
      if (responseData['ResponseCode'] === 0) {
        this.userInfoList = responseData['ResponseObject'];
        if (this.userInfoList.BonusAmount) {
          this.userInfoList.BonusAmount = this.userInfoList.PossibleWin == 0 ? 0 : (this.userInfoList.PossibleWin - this.userInfoList.Amount * this.userInfoList.Coefficient).toString().match(/^-?\d+(?:\.\d{0,4})?/)?.[0];
        }
        if (this.userInfoList.PossibleWin) {
          this.userInfoList.PossibleWin = this.userInfoList.PossibleWin.toString().match(/^-?\d+(?:\.\d{0,2})?/)?.[0];
        }
        this.baseApiService.apiRequest({}, Controllers.DOCUMENT, Methods.GET_BET_STATES).subscribe((data) => {
          let responseObject = data['ResponseObject'];
          responseObject.unshift({'Value': 0, 'Name': this.translateService.instant("Info.All")});
          this.betStatuses = responseObject.forEach(betStatus => {
            if (this.userInfoList.Status === betStatus.Value) {
              this.userInfoList.StatusName = betStatus.Name;
            }
          });
        });
      }
      this.isLoaded = true;
    });

    this.sharedService.rightToLeftOrientation.subscribe((responseData) => {
      this.rightToLeftOrientation = responseData;
    });
  }

}
