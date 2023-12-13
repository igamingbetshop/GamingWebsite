import {Component, Injector, OnInit} from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ConfirmModel } from '../../../../@core/interfaces';
import { SignalRService } from '../../../../@core/services/soket/signal-r.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-limit-notifications',
  templateUrl: './limit-notifications.component.html',
  styleUrls: ['./limit-notifications.component.scss']
})
export class LimitNotificationsComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  public title: string;
  public message: boolean;
  public data: any;
  public updatedData: any;
  protected signalRService: SignalRService;

  constructor(public injector: Injector, public translate: TranslateService) {
    super();
    this.signalRService = injector.get(SignalRService);
  }

  ngOnInit(): void {
    console.log('1212',this.data);
    // this.translate.get('User.Limit Info details').subscribe((res) => {
    // const currentValue = this.data?.updatedData?.LimitInfo.DailyDepositLimitPercent;
    //   this.data.updatedData.LimitInfo.DailyDepositLimitPercent = res.replace('number', currentValue);
    // });
  }

}
