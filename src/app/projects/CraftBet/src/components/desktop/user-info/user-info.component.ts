import {Component, OnInit, Injector} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {GetBetsHistoryService} from '../../../../../../@core/services/app/getBetsHistory.service';
import {Products} from "@core/enums";
import {LocalStorageService, SharedService} from "@core/services";
import {ConfirmModel} from "@core/interfaces";
import {faTimes} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  public rightToLeftOrientation: boolean = false;
  public title: string;
  public message: boolean;
  public data: any;
  public userInfoList: any = {};
  public faTimes = faTimes;
  public isLoaded:boolean;


  public showBonus: boolean;

  public getBetsHistoryService: GetBetsHistoryService;
  public localStorageService: LocalStorageService;
  public betStatuses;
  public CurrencySymbol: any;

  constructor(public injector: Injector, public sharedService: SharedService) {
    super();
    this.getBetsHistoryService = injector.get(GetBetsHistoryService);
    this.localStorageService = injector.get(LocalStorageService);
    const userData = this.localStorageService.get('user');
    this.CurrencySymbol = userData ? userData.CurrencySymbol : '';
  }

  ngOnInit() {
    this.showBonus = this.data.ProductId == Products.SPORTSBOOK && this.data.BetTypeId == 2;
    this.getBetsHistoryService.getBetsInfo(this.data).then((responseData) => {
      if (responseData['ResponseCode'] === 0)
      {
        this.userInfoList = responseData['ResponseObject'];
        this.userInfoList.BonusAmount = this.userInfoList.PossibleWin == 0 ? 0 : (this.userInfoList.PossibleWin - this.userInfoList.Amount * this.userInfoList.Coefficient).toString().match(/^-?\d+(?:\.\d{0,4})?/)?.[0];
        this.userInfoList.PossibleWin = this.userInfoList.PossibleWin.toString().match(/^-?\d+(?:\.\d{0,2})?/)?.[0];
        this.betStatuses = this.getBetsHistoryService.betStatuses;
        this.betStatuses.forEach(betStatus => {
          if(this.userInfoList.Status === betStatus.Value) {
            this.userInfoList.StatusName = betStatus.Name;
          }
        });
      }
      this.isLoaded = true;
    });

    this.sharedService.rightToLeftOrientation.subscribe((responseData) => {
      this.rightToLeftOrientation = responseData;
    });
  }

}
