import {AfterViewInit, Component, createNgModuleRef, Injector, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {AppCommonHeaderComponent} from "../../common/app-common-header/app-common-header.component";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {SaveData} from "@core/services";

@Component({
    selector: 'app-mobile-right-sidebar',
    templateUrl: './mobile-right-sidebar.component.html',
    styleUrls: ['./mobile-right-sidebar.component.scss']
})
export class MobileRightSidebarComponent extends AppCommonHeaderComponent implements AfterViewInit {

    public sidebarOpenState = false;
    public menuList: Array<any> = [];
    public isSignInButton: any;
    public isSignUpButton: any;
    public position: string = "right";
    public faUser = faUser;
    @Input() fullScreen: boolean = false;
    @ViewChild('ticketsRef', { read: ViewContainerRef }) ticketsRef;
    public savedDateService: SaveData;

    public screenSize = window.innerWidth;

    constructor(public injector: Injector,
                public baseControllerService: BaseControllerService,
                ) {
        super(injector);
        this.savedDateService = injector.get(SaveData);
        this.sharedService.mobileRightSidebarOpen.subscribe((state: any) => {
            if (state) {
                this.sidebarOpenState = true;
                if (state['fullScreen']) {
                    this.fullScreen = state['fullScreen'];
                }
            }
        });

        this.baseControllerService.GetMenu(MenuType.MOBILE_RIGHT_SIDEBAR, 'en').then((data: any) => {
            const source = JSON.parse(JSON.stringify(data));
            this.menuList = data.filter((subItem: any) => {
                if ((subItem.Type != 'loginBtn_button') && (subItem.SubMenu.length > 0)) {
                    return subItem
                }
            });
            this.menuList.map((item) => {
                return item.SubMenu.map((itemPic) => { itemPic.Src = itemPic.Icon.includes('.') ? '../../../../../../../assets/images/mobile-right-sidebar/' + itemPic.Icon : null; });
            });

            this.isSignInButton = data.filter(item => item.Type === "loginBtn_button")[0];
            this.isSignUpButton = data.filter(item => item.Type === "signupBtn_button")[0];
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
        });
        this.sharedService.rightToLeftOrientation.subscribe((state: boolean) => this.position = state ? "left" : "right");
    }

    changePage(item, submenu) {
        if (item.Type === "device") {
            let changeDeviceType = JSON.parse(localStorage.getItem('deviceType'));
            localStorage.setItem('deviceType', JSON.stringify('2'));
            window.location.reload();
        }
        this.savedDateService.currentSubItem = submenu;
        this.savedDateService.selectedItem = submenu;
    }
    ngAfterViewInit()
    {
        if(this.isLogin)
        {
            this.renderTickets();
        }
    }

    async renderTickets()
    {
        const { TicketsModule } = await import("../../../../../../@theme/components/global-tickets/tickets.module");
        const moduleRef = createNgModuleRef(TicketsModule, this.injector);
        const component = moduleRef.instance.getComponents();
        const ticketsComponent = this.ticketsRef.createComponent(component, {ngModuleRef: moduleRef});
        ticketsComponent.instance.unreadMessagesCount = this.unreadMessagesCount;
        ticketsComponent.instance.output.subscribe((results) => {
            this.sidebarOpenState = results;
        });
    }

}