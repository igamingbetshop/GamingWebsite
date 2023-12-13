import {Component, Injector} from '@angular/core';
import {CommonSettingsComponent} from "../../../common/common-settings/common-settings.component";
import {LayoutService} from "@core/services/app/layout.service";
import {MenuType} from "@core/enums";

@Component({
  selector: 'app-mobile-account-page-type2-settings',
  templateUrl: './mobile-account-page-type2-settings.component.html'
})
export class MobileAccountPageType2SettingsComponent extends CommonSettingsComponent {

  public showActiveTab: string = 'personal';
  public mobileTabList: Array<any> = [];

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();

    this.baseControllerService.GetMenu(MenuType.MOBILE_RIGHT_SIDEBAR, 'en').then((data: any) => {
      let filterdata = data.filter((item) => item.Title == 'Profile_Settings');
      this.mobileTabList = filterdata[0].SubMenu;
      this.showActiveTab = this.mobileTabList[0].Title;
    });
  }

  public changeTab(type) {
    this.showActiveTab = type;
  }

}
