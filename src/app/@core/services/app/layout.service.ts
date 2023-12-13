
import {Injectable} from "@angular/core";
import {ConfigService} from "@core/services";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {BehaviorSubject} from "rxjs";
import {MenuType} from "@core/enums";
import {NavigationStart, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class LayoutService {
    public layoutStyle: any;
    public layoutHeight: number;
    public headerHeight: number;
    public bottomSideBarHeight: number;
    public headerSecondLineHeight: number;

    public centralMenuLength: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(private configService: ConfigService, public baseControllerService: BaseControllerService, public router: Router) {

        this.headerSecondLineHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--m-header-double-line-height')) || 0;
        this.bottomSideBarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bottom-sideBar-height')) || 0;
        this.headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--m-header-height')) || 64;
        this.layoutHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mobile-nav-bar-height')) || 50;

        this.getMobileCentralMenu();

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.getMobileCentralMenu();
            }
        });
    }


    getMobileCentralMenu() {
        let centralMenuItems: any[] = [];
        this.baseControllerService.GetMenu(MenuType.MOBILE_CENTRAL_MENU, 'en').then((data: any) => {
            if (data)
                centralMenuItems = data.filter(item => {
                    if (item['StyleType'] != '') {
                        let settingStyles = JSON.parse(item['StyleType']);
                        let paths = this.router.url.substr(this.router.url.indexOf('/') + 1);

                        if (typeof settingStyles['visibleForPages'] !== 'undefined') {
                            if (settingStyles['visibleForPages'].find(x => x == paths)) {
                                return item;
                            }
                        }

                        if (typeof settingStyles['invisibleForPages'] !== 'undefined') {
                            if (!settingStyles['invisibleForPages'].find(x => paths.includes(x))) {
                                return item;
                            }
                        }
                    }
                });
            if (centralMenuItems.length == 0) {
                this.layoutHeight = 0
            }
        });

        if (this.configService.defaultOptions["ShowMobileNavPanel"] === "1") {
            this.layoutStyle = {
                'height': `calc(100% - ${this.headerHeight + this.layoutHeight + this.headerSecondLineHeight + this.bottomSideBarHeight}px)`,
                "margin-top": `${this.headerHeight + this.layoutHeight + this.headerSecondLineHeight}px`
            }
        } else {
            this.layoutStyle = {
                'height': `calc(100% - ${this.headerHeight + this.headerSecondLineHeight + this.bottomSideBarHeight}px)`,
                "margin-top": `${this.headerHeight + this.headerSecondLineHeight}px`
            }
        }
    }
}


