import {Component, Input, OnInit} from "@angular/core";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {SaveData} from "@core/services";
import {getParsedUrl} from "@core/utils";
import {Router} from "@angular/router";

@Component({
    selector: 'mobile-navigation-bar',
    templateUrl: './mobile-navigation-bar.component.html'
})

export class MobileNavigationBarComponent implements OnInit {
    @Input() menuItems: any[] = [];
    public selectedOrder: any;

    constructor(private baseControllerService: BaseControllerService,
                private saveData: SaveData,
                private router: Router) {
        this.selectedOrder = this.router.url;
    }

    ngOnInit(): void
    {
    }

    public clickInRoute(routeEvent)
    {

        this.selectedOrder = routeEvent.Href;
        let href = typeof (routeEvent) == "string" ? routeEvent : routeEvent.Href;

        if(href.startsWith('http'))
        {
            window.open(href, '_blank');
        }
        else
        {
            let result = getParsedUrl(href);
            this.router.navigate(['/' + href.split('?')[0]], {queryParams: result ? result : null});
            this.saveData.isGameOpenFromInternal.next(true);
            this.saveData.changeUrlName.next(href);
        }
    }

}
