import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Injector} from "@angular/core";
import {Router} from "@angular/router";
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {ConfigService, MenuService, SharedService} from "../../../@core/services";
import {UserLogined} from "../../../@core/services/app/userLogined.service";
import {MenuType} from "../../../@core/enums";

@Component({
  selector: 'app-mobile-more-menu',
  templateUrl: './mobile-more-menu.component.html',
  styleUrls: ['./mobile-more-menu.component.scss']
})
export class MobileMoreMenuComponent implements OnInit, OnDestroy {
  public configService: ConfigService;
  private router:Router;
  private sharedService:SharedService;
  public menuItems;
  public moreMenu;
  public moreMenuItems;
  private loggedService:UserLogined;
  public menuService: MenuService;
  @Input('selectedItem') selectedItem;
  constructor(public injector: Injector) {
    this.configService = injector.get(ConfigService);
    this.router = injector.get(Router);
    this.sharedService = injector.get(SharedService);
    this.loggedService = injector.get(UserLogined);
    this.menuService = injector.get(MenuService);

    this.menuItems = JSON.parse(JSON.stringify(this.configService.settings.MenuList.find(elem => elem.Type == MenuType.MOBILE_BOTTOM_MENU).Items)).map(item => {
      return item;
    });
    // this.moreMenu= this.menuItems.find(el => el.Title == 'More');
    // this.moreMenuItems = this.moreMenu.SubMenu;
  }


  ngOnInit(): void
  {
    disableBodyScroll(document.body);
    this.moreMenuItems = this.selectedItem.SubMenu;
    this.moreMenuItems = this.moreMenuItems.map((elem) => {
      if(elem.StyleType)
      {
        elem.Config = JSON.parse(elem.StyleType);
      }
      return elem;
    });
    console.log(this.moreMenuItems);
  }

  onMenu(item)
  {
    this.menuService.close('more-menu');
    if(item.Href.startsWith('sport') && this.configService.defaultOptions.SportOpenMode === 'migrated')
    {
      this.sharedService.notifyMigratedSportRouteChange(item.Href);
    } else if (!this.loggedService.isAuthenticated && (item.Href.includes('responsiblegaming') || item.Href.includes('settings'))) {
      this.router.navigate(['/login']);
    } else if (item.Href.startsWith('http'))
    {
      window.location.href = item.Href;
    } else {
      this.router.navigate([item.Href]);
    }
  }

  ngOnDestroy()
  {
    enableBodyScroll(document.body);
  }

}
