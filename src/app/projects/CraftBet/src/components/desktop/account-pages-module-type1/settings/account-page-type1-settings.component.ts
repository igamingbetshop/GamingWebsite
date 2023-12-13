import {Component, Injector} from '@angular/core';
import {CommonSettingsComponent} from "../../../common/common-settings/common-settings.component";
import {Router} from "@angular/router";
import {MenuType} from "@core/enums";

@Component({
  selector: 'app-account-page-type1-settings',
  templateUrl: './account-page-type1-settings.component.html'
})
export class AccountPageType1SettingsComponent extends CommonSettingsComponent {
  public tabList: Array<any> = [];
  public showActiveTab: any;
  public router: Router;

  constructor(public injector: Injector) {
    super(injector);
    this.router = injector.get(Router);
  }

  public changeTab(type) {
    this.showActiveTab = type;
  }

  ngOnInit() {
    super.ngOnInit();

    this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
      let filterdata = data.filter((item) => item.Title == 'Profile_Settings');
      this.tabList = filterdata[0].SubMenu;
      if (this.router.url.includes('changePass')) {
        this.showActiveTab = this.tabList[1].Title;
      } else if(this.router.url.includes('verif')) {
        this.showActiveTab = this.tabList[2].Title;
      }
      else {
        this.showActiveTab = this.tabList[0].Title;
      }
    });
  }

}
