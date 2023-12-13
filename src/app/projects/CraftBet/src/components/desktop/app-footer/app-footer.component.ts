import {Component, Injector, ViewEncapsulation} from '@angular/core';
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import {BaseFooterComponent} from '../../../../../../@theme/components/common/base-footer/base-footer.component';
import {MenuType} from "@core/enums";
import {ConfigService} from "@core/services";
import {SimpleModalService} from "ngx-simple-modal";


@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss'],
    encapsulation:ViewEncapsulation.None
})
export class AppFooterComponent extends BaseFooterComponent {

    public customStyleName = 'styleType';
    public configService: ConfigService;
    public defaultOptions: any;


    constructor(public injector: Injector, private simpleModalService:SimpleModalService)
    {
        super(injector);
        this.configService = injector.get(ConfigService);
    }

    ngOnInit() {
        super.ngOnInit();

        /*this.baseControllerService.GetMenu(MenuType.FOOTER_MENU, 'en').then((menuData) =>
        {
            menuData.forEach((item) =>
            {
                if(item.Type == '4')
                {
                    this.contactUsItems.push(item);
                }

                else if (item.Type !== '2')
                {
                    if (item.Type === "")
                    {
                        item['BackgroundType'] = 'text';
                    }
                    else
                    {
                        item['BackgroundType'] = item.Type;
                    }
                    this.footerMenuList.push(item);
                }
                else
                {
                    this.footerLogoList = item.SubMenu;
                }

            });

            if (this.footerMenuList[0].Type !== '')
            {
                this.customStyleName = this.customStyleName + '-' + this.footerMenuList[0].Type;
            }
            else
            {
                const itemCount = 100 / this.footerMenuList.length;
                this.columsCount = `${itemCount}%`;
            }

        });*/
        this.baseControllerService.GetMenu(MenuType.FOOTER_MENU, 'en').then((menuData) =>
        {
            const menu = {Order:0, Menu:[], Type:'ft-menu-item'};
            menuData.forEach((item) =>
            {

                if(item.Type == 'ft-menu-item')
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
    }


    public socialChange(item) {
        if (item.Type === "device") {
            let changeDeviceType = JSON.parse(localStorage.getItem('deviceType'));
            localStorage.setItem('deviceType', JSON.stringify('1'));
            window.location.reload();
        } else {
            if (item.Href !== "")
            {
                if (item.OpenInRouting)
                {
                    window.open(item.Href);
                } else {
                    window.open(item.Href, '_blank');
                }
            }
        }
    }

    public goDepositPage(item)
    {
        if(item.Href)
        {
            if(item.Href.startsWith('http'))
            {
                window.open(item.Href, '_blank');
            }
            else
            {
                if ((item.Type == 1) && !this.isLogin)
                {
                    localStorage.setItem('payment-url', item.Href);
                    this.simpleModalService.addModal(AppConfirmComponent, {
                        title: 'open_login',
                        message: true,
                    }, {animationDuration: 500}).subscribe((isConfirmed) => {
                        if (!isConfirmed)
                            localStorage.removeItem('payment-url');
                    });
                } else {
                    sessionStorage.setItem('openWithFooter', JSON.stringify(true));
                    this.router.navigate([item.Href]);
                    setTimeout(() => {
                        window.scroll(0,0);
                    }, 100)
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

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
