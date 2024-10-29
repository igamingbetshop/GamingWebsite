import { Component, Injector, OnInit } from '@angular/core';
import {CommonSettingsComponent} from "../../../common/common-settings/common-settings.component";
import {Router} from "@angular/router";
import {MenuType} from "@core/enums";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-account-page-type2-verification',
  templateUrl: './account-page-type2-verification.component.html',
})
export class AccountPageType2VerificationComponent extends CommonSettingsComponent {
  public tabList: Array<any> = [];
  public showActiveTab: any;
  public router: Router;
  public faCaretDown = faCaretDown;

  constructor(public injector: Injector) {
    super(injector);
    this.router = injector.get(Router);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
    //   let filterdata = data.filter((item) => item.Title == 'Profile_Settings');
    //   this.tabList = filterdata[0].SubMenu;
    //   if (this.router.url.includes('changePass')) {
    //     this.showActiveTab = this.tabList[1].Title;
    //   }
    //   else if(this.router.url.includes('verif')) {
    //     this.showActiveTab = this.tabList[2].Title;
    //   }
    //   else {
    //     this.showActiveTab = this.tabList[0].Title;
    //   }
    // });
  }

}
