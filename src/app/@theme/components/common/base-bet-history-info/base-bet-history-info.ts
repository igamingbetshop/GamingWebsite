import {OnInit, Injector, Injectable} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {GetBetsHistoryService} from "@core/services/app/getBetsHistory.service";

export interface ConfirmModel {
  title: string;
  message: boolean;
  data: any;
}

@Injectable()

export  class BaseBetHistoryInfo extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  public title: string;
  public message: boolean;
  public data: any;
  public userInfoList: any = {};

  public getBetsHistoryService: GetBetsHistoryService;

  constructor(public injector: Injector) {
    super();
    this.getBetsHistoryService = injector.get(GetBetsHistoryService);
  }

  ngOnInit()
  {
    this.getBetsHistoryService.getBetsInfo(this.data).then((responceData) => {
      if (responceData['ResponseCode'] === 0)
      {
        this.userInfoList = responceData['ResponseObject'];
      }
    });
  }

}
