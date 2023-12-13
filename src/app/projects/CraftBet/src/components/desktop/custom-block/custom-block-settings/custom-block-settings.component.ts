import {Component, Injector} from '@angular/core';
import {CommonSettingsComponent} from "../../../common/common-settings/common-settings.component";
import {MenuType} from "@core/enums";

@Component({
  selector: 'app-custom-block-settings',
  templateUrl: './custom-block-settings.component.html'
})
export class CustomBlockSettingsComponent extends CommonSettingsComponent {
  tabsName = [
    {
      'id': 1,
      'routeName': 'betList',
      'pageName': 'betList',
      'icon': 'icon-top-panel-bet-list'
    },
    {
      'id': 2,
      'routeName': 'betting-statement',
      'pageName': 'statement',
      'icon': 'icon-top-panel-statement'
    },
    {
      'id': 3,
      'routeName': 'settings',
      'pageName': 'settings',
      'icon': 'icon-top-panel-settings'
    },
    {
      'id': 4,
      'routeName': 'announcement',
      'pageName': 'announcement',
      'icon': 'icon-top-panel-announcements'
    }
  ];


  public tabList: Array<any> = [];
  public showActiveTab: any;

  constructor(public injector: Injector) {
    super(injector);
  }

  public changeTab(type) {
    this.showActiveTab = type;
  }

  ngOnInit() {
    super.ngOnInit();

    this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
      let filterdata = data.filter((item) => item.Title == 'Profile_Settings');
      this.tabList = filterdata[0].SubMenu;
      this.showActiveTab = this.tabList[0].Title;
    });
  }

}
