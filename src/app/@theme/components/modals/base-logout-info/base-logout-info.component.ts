import {Component, NgModule, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {TranslateModule} from "@ngx-translate/core";

export interface ConfirmModel {
  title: string;
  key: any;
}

@Component({
  selector: 'app-base-logout-info',
  templateUrl: './base-logout-info.component.html',
  styleUrls: ['./base-logout-info.component.scss']
})
export class BaseLogoutInfoComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  public title: string;
  public key: any;

  constructor() {
    super();
  }

  ngOnInit() {}

  confirm() {
    this.close();
  }
}
@NgModule({
  declarations:[BaseLogoutInfoComponent],
  imports:[
    TranslateModule,
  ]
})

export class BaseLogoutInfoModule
{

}