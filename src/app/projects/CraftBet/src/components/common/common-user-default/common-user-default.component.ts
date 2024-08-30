import {Injectable, Injector} from '@angular/core';
import {ConfigService, LocalStorageService} from "@core/services";
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";
import {Router} from "@angular/router";
import { SaveData } from "@core/services";
import {ProfileService} from "../../../../../../@theme/components/profile/service/profile.service";

@Injectable()
export class CommonUserDefaultComponent extends BaseComponent {
  public defaultOption: any;
  public menuList: Array<any> = [];

  public configService: ConfigService;
  public baseControllerService: BaseControllerService;
  public router: Router;
  public savedDateService: SaveData;
  public tabType:string = 'top';
  public profileService: ProfileService;
  public localStorageService: LocalStorageService;
  public userData: any;
  public status: any;
  currentOpenMenu: any = null;
  currentOpenSubMenu: any = null;
  constructor(public injector: Injector) {
    super(injector);
    this.configService = injector.get(ConfigService);
    this.savedDateService = injector.get(SaveData);
    this.baseControllerService = injector.get(BaseControllerService);
    this.localStorageService = injector.get(LocalStorageService);
    this.router = injector.get(Router);
    this.profileService = injector.get(ProfileService);
    this.userData = this.localStorageService.get('user');
  }

  ngOnInit() {
    this.profileService.getClientInfo();
    this.profileService.profileData$.subscribe((data) => {
      if (data?.PersonalDataVerifiedState === 3 && data?.AddressVerifiedState === 3) {
        this.status = 'verified';
      } else if (data?.PersonalDataVerifiedState === 1 || data?.AddressVerifiedState === 1) {
        this.status = 'not verified';
      } else {
        this.status = 'pending';
      }
    });
    this.defaultOption = this.configService.defaultOptions;
    this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {
      const source = JSON.parse(JSON.stringify(data));
      this.menuList = [];
      this.menuList = source.filter((item) => item.Type !== 'submenu');
      for(let i = 0; i < this.menuList.length; i++)
      {
        if(this.menuList[i].Type && this.menuList[i].Type.startsWith('SubMenu'))
        {
          const parentIndex = this.menuList.findIndex(menu => menu.Title === this.menuList[i].Type.split('_')[1]);
          if(parentIndex > -1)
          {
            this.menuList[i].Type = 1;
            this.menuList[parentIndex].SubMenu.unshift(this.menuList[i]);
          }
          this.menuList.splice(i,1);
          i--;
        }
      }
      this.menuList.forEach(el => {
        el.SubMenu.forEach(subMenuItem => {
          if(this.router.url.includes(subMenuItem.Href)) {
            if(subMenuItem.Href !== '') {
              this.savedDateService.selectedItem = el;
              this.savedDateService.currentSubItem = el.SubMenu[0];
              this.currentOpenSubMenu = el.SubMenu[0];
            }
          }
        });
        const agentsReportIndex = el.SubMenu.findIndex(item => item.Href === 'agents-report');
        if (agentsReportIndex !== -1) {
          const agentsReport = el.SubMenu[agentsReportIndex];
          if (!agentsReport.StyleType) {
            el.SubMenu.splice(agentsReportIndex, 1);
          } else {
            const styleTypeItem = JSON.parse(agentsReport.StyleType);
            if (!styleTypeItem || !(styleTypeItem.IsAgent && this.userData.IsAgent === true)) { // todo true
              el.SubMenu.splice(agentsReportIndex, 1);
            }
          }
        }
      });
      const direction = this.baseControllerService.GetMenuByType(MenuType.ACCOUNT_TAB_LIST)?.direction;
      if(direction)
      {
        this.tabType = direction;
      }
    });
  }

  toggleMenu(item: any, event) {
    event.stopPropagation();
    if (this.currentOpenMenu === item) {
      this.currentOpenMenu = null;
      this.currentOpenSubMenu = null;
    } else {
      this.currentOpenMenu = item;
      this.currentOpenSubMenu = this.savedDateService.currentSubItem;
    }
  }

}
