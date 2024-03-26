import {Component, inject, Injector, OnInit} from '@angular/core';
import {GetBetsHistoryService} from "../../../../../../@core/services/app/getBetsHistory.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {LocalStorageService} from "../../../../../../@core/services";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {BetsService} from "../../../../../../@core/services/app/bets.services";

@Component({
  selector: 'app-mobile-user-info',
  templateUrl: './mobile-user-info.component.html',
  standalone:true,
  imports:[
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    SanitizerModule
  ],
  providers: [GetBetsHistoryService, BetsService],
  styleUrls: ['./mobile-user-info.component.scss']
})
export class MobileUserInfoComponent implements OnInit {

  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<MobileUserInfoComponent>);

  public userInfoList: any = {};
  public faTimes = faTimes;
  public isLoaded:boolean;
  public betStatuses;
  public getBetsHistoryService: GetBetsHistoryService;
  public localStorageService: LocalStorageService;
  public CurrencySymbol: any;

  constructor(public injector: Injector) {
    this.getBetsHistoryService = injector.get(GetBetsHistoryService);
    this.localStorageService = injector.get(LocalStorageService);
    const userData = this.localStorageService.get('user');
    this.CurrencySymbol = userData ? userData.CurrencySymbol : '';
  }

  ngOnInit() {
    this.getBetsHistoryService.getBetsInfo(this.data.info).then((responseData:any) => {
      if (responseData['ResponseCode'] === 0)
      {
        this.userInfoList = responseData['ResponseObject'];
        this.betStatuses = this.getBetsHistoryService.betStatuses;
        this.betStatuses.forEach(betStatus => {
          if(this.userInfoList.Status === betStatus.Value) {
            this.userInfoList.StatusName = betStatus.Name;
          }
        });
      }
      this.isLoaded = true;
    });
  }

  close()
  {
    this.dialogRef.close();
  }
}
