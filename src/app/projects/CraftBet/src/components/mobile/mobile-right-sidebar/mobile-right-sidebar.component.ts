import {
    AfterViewInit,
    Component,
    createNgModule,
    inject,
    Injector,
    Input,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AppCommonHeaderComponent} from "../../common/app-common-header/app-common-header.component";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {SaveData} from "@core/services";
import {StateService} from "@core/services/app/state.service";

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
    public selectedAccount;
    public selectedAccountBalance;
    public accountBalances = [];
    public useAccountType;
    @Input() fullScreen: boolean = false;
    @ViewChild('ticketsRef', { read: ViewContainerRef }) ticketsRef;
    public savedDateService: SaveData;

    public screenSize = window.innerWidth;
    #stateService = inject(StateService);

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
                const agentsReportIndex = this.menuList[i].SubMenu.findIndex(item => item.Href === 'agents-report');
                if (agentsReportIndex !== -1) {
                    const agentsReport = this.menuList[i].SubMenu[agentsReportIndex];
                    if (!agentsReport.StyleType) {
                        this.menuList[i].SubMenu.splice(agentsReportIndex, 1);
                    } else {
                        const styleTypeItem = JSON.parse(agentsReport.StyleType);
                        if (!styleTypeItem || !(styleTypeItem.IsAgent && this.userData?.IsAgent === true)) {
                            this.menuList[i].SubMenu.splice(agentsReportIndex, 1);
                        }
                    }
                }
            }
        });
        this.useAccountType = this.baseControllerService.GetMenuByType(MenuType.MOBILE_RIGHT_SIDEBAR)?.useAccountType;
        if (this.useAccountType != undefined) {
            this.useAccountType = this.useAccountType === '1' ? true : false;
        }
        this.sharedService.rightToLeftOrientation.subscribe((state: boolean) => this.position = state ? "left" : "right");
        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.accountBalances = this.groupBalances(data?.Balances);
            this.balance = Number(data.AvailableBalance).toFixed(2);
            this.unusedBalance = Number(data.UnusedBalance).toFixed(2);
            this.bonus = Number(data.BonusBalance) > 0 ? Number(data.BonusBalance).toFixed(2) : "0.00";
        });
    }

    changePage(subItem, item)
    {
        const st = subItem.StyleType && JSON.parse(subItem.StyleType);
        if(st && st.action)
        {
            if(st.action === "openChat")
            {
                this.#stateService.toggleChat();
            }
        }
        else
        {
            if (item.Type === "device") {
                let changeDeviceType = JSON.parse(localStorage.getItem('deviceType'));
                localStorage.setItem('deviceType', JSON.stringify('2'));
                window.location.reload();
            }
            window.scroll(0,0);
            this.savedDateService.currentSubItem = subItem;
            this.savedDateService.selectedItem = subItem;
            const accountTemplateType = this.configService.defaultOptions.AccountTemplateType;
            const path = `/user/${accountTemplateType || '1'}/${subItem.Href}`;
            this.router.navigate([path]);
        }
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
        const moduleRef = createNgModule(TicketsModule, this.injector);
        const component = moduleRef.instance.getComponents();
        const ticketsComponent = this.ticketsRef.createComponent(component, {ngModuleRef: moduleRef});
        ticketsComponent.instance.unreadMessagesCount = this.unreadMessagesCount;
        ticketsComponent.instance.output.subscribe((results) => {
            this.sidebarOpenState = results;
        });
    }

    onSelectedAccountChange(event)
    {
        this.selectedAccount = event.Ids;
        for (let i = 0; i < this.accountBalances.length; i++)
        {
            if(this.accountBalances[i].Ids.find(b => this.selectedAccount.includes(b)))
            {
                this.selectedAccountBalance = this.accountBalances[i].Balance;
            }
        }
    }

    private groupBalances(balances):any[]
    {
        let groupedBalances = [];

        for(let i = 0; i < balances?.length; i++)
        {
            let balance = {...balances[i]};

            if(!Array.isArray(balance.Ids))
                balance.Ids = [];

            if(balance.TypeId !== 3)
            {
                if(balance.BetShopId === null && balance.PaymentSystemId === null)
                {
                    if (balance.TypeId === 1 || balance.TypeId === 2)
                    {
                        let b = groupedBalances.find(b => !b.BlockForGroup && (b.TypeId === 1 || b.TypeId === 2));
                        if(b)
                        {
                            b.Balance += balance.Balance;
                            b.Ids.push(balance.Id);
                        }
                        else
                        {
                            balance.Ids.push(balance.Id);
                            groupedBalances.push(balance);
                        }
                    }
                    else
                    {
                        balance.Ids.push(balance.Id);
                        groupedBalances.push(balance);
                    }
                } else
                {
                    balance.BlockForGroup = true;
                    balance.Ids.push(balance.Id);
                    groupedBalances.push(balance);
                }
            }
        }
        return groupedBalances;
    }

    toggleMenu(item, event) {
        event.stopPropagation();
        item.isOpen = !item.isOpen;
    }

}
