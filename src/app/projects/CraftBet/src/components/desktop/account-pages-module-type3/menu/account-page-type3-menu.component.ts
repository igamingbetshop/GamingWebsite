import {Component, Injector, OnInit} from '@angular/core';
import {ConfigService, SaveData} from "@core/services";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";

@Component({
  selector: 'app-account-page-type3-menu',
  templateUrl: './account-page-type3-menu.component.html',
  styleUrls: ['./account-page-type3-menu.component.scss']
})
export class AccountPageType3MenuComponent implements OnInit {
  public defaultOption: any;
  public menuList: Array<any> = [];
  public tabType:string = 'top';
  public openModal: boolean;

  public configService: ConfigService;
  public baseControllerService: BaseControllerService;
  public savedDateService: SaveData;

  constructor(public injector: Injector) {
    this.configService = injector.get(ConfigService);
    this.baseControllerService = injector.get(BaseControllerService);
    this.savedDateService = injector.get(SaveData);
  }

  ngOnInit() {
    this.defaultOption = this.configService.defaultOptions;
    const direction = this.baseControllerService.GetMenuByType(MenuType.ACCOUNT_TAB_LIST)?.direction;
    const openModal = this.baseControllerService.GetMenuByType(MenuType.ACCOUNT_TAB_LIST)?.openModal;
    if(direction)
    {
      this.tabType = direction;
    }
    if (openModal) {
      this.openModal = openModal;
      console.log(this.openModal);
    }
    this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
      this.menuList = data.filter((item) => item.Type !== 'submenu');
      console.log(this.menuList);
    });
  }

}
