import {Component, HostBinding, Injector} from '@angular/core';
import {MenuType} from "@core/enums";
import {BaseFooterComponent} from '../../../../../../@theme/components/common/base-footer/base-footer.component';
import {ConfigService} from "@core/services";

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss']
})
export class MobileFooterComponent extends BaseFooterComponent {

  @HostBinding('style.display') display = 'block';
  public customStyleName = 'styleType';
  public configService: ConfigService;
  public defaultOptions: any;

  constructor(public injector: Injector) {
    super(injector);

  }

  public socialChange(item) {
    if (item.Type === "device") {
      let changeDeviceType = JSON.parse(localStorage.getItem('deviceType'));
      localStorage.setItem('deviceType', JSON.stringify('1'));
      window.location.reload();
    } else {
      if (item.Href !== "") {
        if (item.OpenInRouting) {
          window.open(item.Href);
        } else {
          window.open(item.Href, '_blank');
        }
      }
    }
  }

  public navigateInDepositPage(item) {
    if (this.isLogin) {
      sessionStorage.setItem('openWithFooter', JSON.stringify(true));
      this.router.navigate([item.Href]);
    } else {
      this.router.navigate(['login']);
    }

  }

  ngOnInit() {
    super.ngOnInit();

    this.baseControllerService.GetMenu(MenuType.Mobile_FOOTER_MENU, 'en').then((menuData) =>
    {
      const menu = {Order:0, Menu:[], Type:'m-ft-menu-item'};
      menuData.forEach((item) =>
      {

        if(item.Type == 'm-ft-menu-item')
        {
          menu.Menu.push(item);
        }
        else
        {
          if(item['StyleType'])
          {
            const style = JSON.parse(JSON.parse(item['StyleType']))['style'];
            item['className'] = item.Type + '-' +  style;
          }
          this.commonItems.push(item);
        }
      });

      if(menu.Menu.length)
      {
        menu.Order =  menu.Menu[0].Order;
        this.commonItems.push(menu);
        this.customStyleName = this.customStyleName + '-' + menu.Menu[0].Type;
      }
      this.commonItems.sort((a, b) => (a.Order > b.Order) ? 1 : ((b.Order > a.Order) ? -1 : 0));
    });

    this.defaultOptions = this.configService.defaultOptions;
   /* this.baseControllerService.GetMenu(MenuType.Mobile_FOOTER_MENU, 'en').then((menuData) => {
      menuData.forEach((item) => {
        if (item.Type !== '2') {
          if (item.Type === "") {
            item['BackgroundType'] = 'text';
          } else {
            item['BackgroundType'] = item.Type;
          }
          this.footerMenuList.push(item);
        } else {
          this.footerLogoList = item.SubMenu;
        }
      });

      const itemCount = 100 / this.footerMenuList.length;
      this.columsCount = `${itemCount}%`;
    });*/
  }

  public goDepositPage(item)
  {
   if (item.Href) {
     if(item.Href.startsWith('http'))
     {
       window.open(item.Href, '_blank');
     }
     else
     {
       if ((item.Type == 1) && !this.isLogin)
       {

       } else {
         sessionStorage.setItem('openWithFooter', JSON.stringify(true));
         this.router.navigate([item.Href]);
         window.scroll(0,0);
       }
     }
   }
  }

  redirectInToPag(item)
  {
    if(item['Href'] != '')
    {
      if(item.Href.startsWith('http'))
      {
        window.open(item.Href, '_blank');
      }
      else
      {
        this.router.navigate(['/' + item.Href]);
      }
    }
  }
}
