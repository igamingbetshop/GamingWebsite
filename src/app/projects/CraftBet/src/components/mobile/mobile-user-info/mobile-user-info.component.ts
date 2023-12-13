import {Component, Injector, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {GetBetsHistoryService} from "@core/services/app/getBetsHistory.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ConfirmModel} from "@core/interfaces";
import {LocalStorageService} from "@core/services";

@Component({
  selector: 'app-mobile-user-info',
  templateUrl: './mobile-user-info.component.html',
  styleUrls: ['./mobile-user-info.component.scss']
})
export class MobileUserInfoComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  public title: string;
  public message: boolean;
  public data: any;
  public userInfoList: any = {};
  public faTimes = faTimes;
  public isLoaded:boolean;
  public betStatuses;
  public getBetsHistoryService: GetBetsHistoryService;
  public localStorageService: LocalStorageService;
  public CurrencySymbol: any;

  constructor(public injector: Injector) {
    super();
    this.getBetsHistoryService = injector.get(GetBetsHistoryService);
    this.localStorageService = injector.get(LocalStorageService);
    const userData = this.localStorageService.get('user');
    this.CurrencySymbol = userData ? userData.CurrencySymbol : '';
  }

  ngOnInit() {
    this.getBetsHistoryService.getBetsInfo(this.data).then((responseData) => {
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

}
