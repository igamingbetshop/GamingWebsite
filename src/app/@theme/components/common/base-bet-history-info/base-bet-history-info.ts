import {OnInit, Injector, inject, Directive} from '@angular/core';
import {GetBetsHistoryService} from "@core/services/app/getBetsHistory.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Directive()

export  class BaseBetHistoryInfo implements OnInit {

  public userInfoList: any = {};
  public getBetsHistoryService: GetBetsHistoryService;
  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<BaseBetHistoryInfo>);
  constructor(public injector: Injector) {
    this.getBetsHistoryService = injector.get(GetBetsHistoryService);
  }

  ngOnInit()
  {
    this.getBetsHistoryService.getBetsInfo(this.data).then((responseData:any) => {
      if (responseData['ResponseCode'] === 0)
      {
        this.userInfoList = responseData['ResponseObject'];
      }
    });
  }

}
