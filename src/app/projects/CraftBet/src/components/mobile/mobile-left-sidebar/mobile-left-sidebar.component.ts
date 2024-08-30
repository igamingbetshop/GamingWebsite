import {
    Component,
    createNgModule,
    ElementRef,
    Inject,
    Injector,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {AppCommonHeaderComponent} from "../../common/app-common-header/app-common-header.component";
import {MenuType} from "@core/enums";
import {faAngleRight, faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import { disableBodyScroll, clearAllBodyScrollLocks, enableBodyScroll } from 'body-scroll-lock';
import {DOCUMENT} from "@angular/common";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
    selector: 'app-mobile-left-sidebar',
    templateUrl: './mobile-left-sidebar.component.html',
    styleUrls: ['./mobile-left-sidebar.component.scss']
})
export class MobileLeftSidebarComponent extends AppCommonHeaderComponent implements OnInit {
    public generalMenuItems: Array<any> = [];
    public sidebarOpenState = false;
    public showLanguageDropdown: boolean = false;
    public position: string = "left";

    @Input() fullScreen: boolean = false;
    @Inject(DOCUMENT) public document: Document;

    public screenSize = window.innerWidth;
    public screenWidth: string;
    public faAngleRight = faAngleRight;
    public faAngleUp = faAngleUp;
    public faAngleDown = faAngleDown;
    public menuHeight:string = 'calc(100% - 100px)';
    public hideLeftSideBar:string = 'block';
    public languages:any[] = [];
    public isSingleLang:boolean;
    public languageMenuItem:any = {itemTitle:'1'};
    public layoutService: LayoutService;

    @ViewChild('menuContainerRef') menuContainerRef:ElementRef;
    @ViewChild('langContainerRef') langContainerRef:ElementRef;
    @ViewChild('asianAccountStatement', { read: ViewContainerRef }) asianAccountStatement;

    public hideLanguageDropdown = false;

    constructor(public injector: Injector) {
        super(injector);
        this.layoutService = injector.get(LayoutService);
        this.languages = this.configService.defaultOptions['Languages'];
        this.isSingleLang = this.languages.length === 1;
        this.document = injector.get(DOCUMENT);
        this.baseControllerService.GetMenu(MenuType.MOBILE_MENU, 'en').then((data: any) => {
            console.log(data);
            const langIndex = data.findIndex(item => item.Type === "languageDpd_dropdown");
            if(langIndex > -1)
            {
                this.languageMenuItem = data[langIndex];
                if(this.languageMenuItem["StyleType"])
                {
                    const parsedStyleTypeItem = JSON.parse(JSON.parse(this.languageMenuItem["StyleType"]));
                    this.languageMenuItem.itemTitle = parsedStyleTypeItem["itemTitle"] || this.languageMenuItem.itemTitle;
                }

                data.splice(langIndex, 0);
            }
            const widthIndex = data.findIndex(item => item.Type === 'full');
            if (widthIndex > -1) {
                this.screenWidth = String(window.innerWidth);
            }

            this.generalMenuItems = data;
            this.generalMenuItems.map((item) => {
                return item.SubMenu.map((itemPic) => { itemPic.Src = itemPic.Icon.includes('.') ? '../../../../../../../assets/images/mobile-menu/' + itemPic.Icon : null; });
            });

            if (this.generalMenuItems[0]?.SubMenu.length <= 1 && this.isSingleLang) {
            let showLeftSideBar = getComputedStyle(document.documentElement).getPropertyValue('--m-hide-language-product');
                if (showLeftSideBar.trim() === '') {
                    showLeftSideBar = 'none';
                }
                this.hideLeftSideBar = showLeftSideBar;
            }
            this.renderLazyLoadComponents();
        });
        this.getMobileHeaderPanel();

        this.sharedService.mobileLeftSidebarOpen.subscribe((state: any) => {
            if (state) {
                disableBodyScroll(this.menuContainerRef.nativeElement);
                disableBodyScroll(this.langContainerRef.nativeElement);
                this.saveData.setScrollLockState(true);
                this.sidebarOpenState = true;
                if (state['fullScreen']) {
                    this.fullScreen = state['fullScreen'];
                }
            } else {
                enableBodyScroll(this.menuContainerRef.nativeElement);
                enableBodyScroll(this.langContainerRef.nativeElement);
                this.saveData.setScrollLockState(false);
                this.sidebarOpenState = false;
            }
        });
        const width = getComputedStyle(document.documentElement).getPropertyValue('--m-left-sidebar-width');
        if (width) {
            this.screenWidth = width;
        }
        this.sharedService.rightToLeftOrientation.subscribe((state: boolean) => this.position = state ? "right" : "left");

        const bottomOffset =  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--m-language-bottom-offset'));
        if(bottomOffset)
            this.menuHeight = 'calc(100% - ' + (100 + bottomOffset) + 'px)';
    }

    getMobileHeaderPanel() {
        this.baseControllerService.GetMenu('MobileHeaderPanel', 'en').then((data: any) => {
            if (!!data) {
                this.hideLanguageDropdown = data.find((item) => item.Type === 'languageDpd_dropdown');
            }
        });
    }

    public openMenuTitle(item)
    {
        if(item.Href && item.Href.startsWith('http'))
        {
            window.open(item.Href, '_blank');
        }
        else
        {
            if ((item.SubMenu.length == 0) && item.Href) {
                this.router.navigate(['/' + item.Href]);
            }
        }
    }

    public openLanguageMenu($event)
    {
        if(this.configService.defaultOptions['Languages'].length === 1)
            return false;

        $event.stopPropagation();
        this.showLanguageDropdown = !this.showLanguageDropdown;
    }

    private async renderLazyLoadComponents()
    {
        if(this.asianAccountStatement)
        {
            const { BaseAsianAccountStatementModule } = await import("../../../../../../@theme/components/common/base-asian-account-statment/base-asian-account-statement.module");
            const moduleRef = createNgModule(BaseAsianAccountStatementModule, this.injector);
            const component = moduleRef.instance.getComponent();
            this.asianAccountStatement.createComponent(component, {ngModuleRef: moduleRef});
        }
    }

    isOpenChange(event)
    {
        this.showLanguageDropdown = false;
        enableBodyScroll(this.menuContainerRef.nativeElement);
        enableBodyScroll(this.langContainerRef.nativeElement);
        this.saveData.setScrollLockState(false);
    }

}
