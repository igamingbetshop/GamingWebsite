import {Component, Injector, OnInit} from '@angular/core';
import {ConfigService} from "@core/services";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";

@Component({
  selector: 'app-account-page-type2-menu',
  templateUrl: './account-page-type2-menu.component.html',
  styleUrls: ['./account-page-type2-menu.component.scss']
})
export class AccountPageType2MenuComponent implements OnInit {
  public defaultOption: any;
  public menuList: Array<any> = [];

  public configService: ConfigService;
  public baseControllerService: BaseControllerService;
  constructor(public injector: Injector) {
    this.configService = injector.get(ConfigService);
    this.baseControllerService = injector.get(BaseControllerService);
  }

  ngOnInit() {
    this.defaultOption = this.configService.defaultOptions;
    this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
      this.menuList = data.filter((item) => item.Type !== 'submenu');
    });
  }

}
