import {Component, Injector, Input, OnInit} from '@angular/core';
import {MenuType} from "@core/enums";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {Router} from "@angular/router";
import {ConfigService, LocalStorageService} from '../../../@core/services';
import {SaveData} from "../../../@core/services";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {SimpleModalService} from "ngx-simple-modal";
import {StateService} from "@core/services/app/state.service";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-global-account-pages-dpd',
    templateUrl: './global-account-pages-dpd.component.html',
    styleUrls: ['./global-account-pages-dpd.component.scss']
})
export class GlobalAccountPagesDpdComponent implements OnInit {

    public accoutList: Array<any> = [];

    @Input() itemClassname: string;
    @Input() ignoreExternalConfig: boolean;
    @Input() isMainMenu: boolean = false;
    @Input() showUserId: boolean = false;
    @Input() unreadMessagesCount;
    @Input() menuItem;
    @Input() openModal;

    public userData: any;
    public menuList: Array<any> = [];
    public currentItem;
    public savedDateService: SaveData;
    private stateService:StateService;
    public simpleModalService: SimpleModalService;
    public faCaretDown = faCaretDown;
    public selectedItem;

    constructor(private baseControllerService: BaseControllerService, private router: Router, public localStorageService: LocalStorageService, public configService: ConfigService, public injector: Injector,
                public getSettingsInfoService: GetSettingsInfoService) {
        this.savedDateService = injector.get(SaveData);
        this.userData = localStorageService.get('user');
        this.getSettingsInfoService = injector.get(GetSettingsInfoService);
        this.stateService = injector.get(StateService);
    }

    ngOnInit() {
        this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST, 'en').then((data: any) => {

            const source = JSON.parse(JSON.stringify(data));
            this.mergeSubMenus(source);

            if(this.isMainMenu)
            {
              this.accoutList = source.filter(el => el.Type === "1" || el.Type === "4");
            }
            else
            {
                source.map((item) => {
                    item.SubMenu.map((subItem) => {
                        if (subItem.Type === "1" || subItem.Type === "4") { /* Type == 1 (elements in user dropdown, Type == 5 elements in user dropdown and only ticket) */
                            this.accoutList.push(subItem);
                            this.accoutList.map((itemPic) => { itemPic.Src = itemPic.Icon.includes('.') ? '../../../../../../../assets/images/' + itemPic.Icon : null; });
                        }
                    });
                });
            }
            this.accoutList.sort((a,b) => a.Order - b.Order);

        });
    }

    private mergeSubMenus(source)
    {
        for(let i = 0; i < source.length; i++)
        {
            if(source[i].Type && source[i].Type.startsWith('SubMenu'))
            {
                const parentIndex = source.findIndex(menu => menu.Title === source[i].Type.split('_')[1]);
                if(parentIndex > -1)
                {
                    source[i].Type = "1";
                    source[i].Order = 0;
                    source[parentIndex].SubMenu.unshift(source[i]);
                }
                source.splice(i,1);
                i--;
            }
        }
    }


    changePage(pageName, event, index)
    {
        let url;
        if (this.ignoreExternalConfig) {
            url = '/user/' + pageName;
            this.router.navigate([url]);
        } else {
            if (pageName === '') {
                url = '/user/' + (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) + '/' + pageName + '/deposit';
                this.router.navigate([url]);
            }
            else if (this.openModal)
            {
                this.stateService.openModal({label:pageName});
            }
            else {
                url = '/user/' + (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) + '/' + pageName;
                this.router.navigate([url]);
            }

        }
        event.stopPropagation();
        this.selectedItem = index;
        // this.router.navigate([url]);
    }

    headNavigate()
    {
        if(this.menuItem?.Href)
        {
            this.router.navigate([this.menuItem.Href]);
        }
    }

}
