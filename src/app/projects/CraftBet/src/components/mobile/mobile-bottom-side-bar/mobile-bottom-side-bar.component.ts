import {Component, Injector, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "@core/services";

@Component({
    selector: 'app-mobile-bottom-side-bar',
    templateUrl: './mobile-bottom-side-bar.component.html',
    styleUrls: ['./mobile-bottom-side-bar.component.scss']
})
export class MobileBottomSideBarComponent implements OnInit {

    @Input() menuList: Array<any>;

    public router: Router;
    public sharedService: SharedService;

    constructor(private injector: Injector) {
        this.router = injector.get(Router);
        this.sharedService = injector.get(SharedService);
    }

    ngOnInit() {}

    openTab(item) {
        switch (item.Type) {
            case 'MobileMenu' :
                this.onLeftSidebarOpen();
                break;

            case 'MobileRightSidebar':
                this.onRightSidebarOpen();
                break;

            default:
                this.router.navigate(['/' + item.Href]);
                break;

        }
    }

    onLeftSidebarOpen() {
        this.sharedService.mobileLeftSidebarOpen.next({'toggle': true, 'fullScreen': true})
    }

    onRightSidebarOpen() {
        this.sharedService.mobileRightSidebarOpen.next({'toggle': true, 'fullScreen': true})
    }
}
