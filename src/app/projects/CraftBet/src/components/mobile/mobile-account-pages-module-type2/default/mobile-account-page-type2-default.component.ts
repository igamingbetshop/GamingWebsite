import {Component, HostBinding, OnInit} from '@angular/core';
import {MenuType} from "@core/enums";
import {ConfigService, LocalStorageService, SaveData} from "@core/services";
import {Router} from "@angular/router";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {LayoutService} from "@core/services/app/layout.service";
import {BalanceService} from "@core/services/api/balance.service";

@Component({
  selector: 'app-mobile-account-page-type2-default',
  templateUrl: './mobile-account-page-type2-default.component.html'
})
export class MobileAccountPageType2DefaultComponent implements OnInit {

  @HostBinding('style.min-height') minHeight = this.layoutService.layoutStyle['min-height'];
  @HostBinding('style.margin-top') marginTop = this.layoutService.layoutStyle['margin-top'];

  public menuList: Array<any> = [];
  selectedItem = '';
  selectedItemIcon:any;
  public userData: any;
  public balance: string;
  public currencySymbol: any;
  public currencyId: any;

  constructor(  public savedDateService: SaveData,
                public router: Router,
                public baseControllerService: BaseControllerService,
                public configService: ConfigService,
                public layoutService: LayoutService,
                public balanceService: BalanceService,
                public localStorageService: LocalStorageService) {
    this.userData = this.localStorageService.get('user');
    this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
    this.currencyId = this.userData ? this.userData.CurrencyId : '';
    this.baseControllerService.GetMenu(MenuType.MOBILE_RIGHT_SIDEBAR, 'en').then((data: any) => {
      this.menuList = data.filter((subItem: any) => {
        if ((subItem.Type == 'submenu' || subItem.Type == '2') && (subItem.SubMenu.length > 0)){
          return subItem

        }
      });
      this.selectMenuItem();
    });
  }

  ngOnInit() {
    addEventListener('locationchange', () => this.selectMenuItem());
    this.balanceService.notifyUpdateBalance.subscribe(data => {
      this.balance = Number(data.AvailableBalance).toFixed(2);
    });
  }

  selectMenuItem() {
    const lastUrlSegment = this.router.url.split('?')[0].split('/').pop();

    parent:
    for(let i = 0; i < this.menuList.length; i++)
    {
      if(this.menuList[i].Href == lastUrlSegment)
      {
        this.selectedItem = this.menuList[i].Title;
        this.selectedItemIcon = this.menuList[i].Icon;
        break;
      }
      for(let j = 0; j < this.menuList[i].SubMenu.length; j++)
      {
        if(this.menuList[i].SubMenu[j].Href == lastUrlSegment)
        {
          this.selectedItem = this.menuList[i].Title;
          this.selectedItemIcon = this.menuList[i].Icon;
          break parent;
        }
      }
    }
  }

  changePage(item)
  {
    this.savedDateService.currentSubItem = item;
    this.savedDateService.selectedItem = item;
    this.selectedItem = item.Title;
    const accountTemplateType = this.configService.defaultOptions.AccountTemplateType;
    const path = `/user/${accountTemplateType || '1'}/${item.Href}`;
    this.router.navigate([path]);
  }
}
