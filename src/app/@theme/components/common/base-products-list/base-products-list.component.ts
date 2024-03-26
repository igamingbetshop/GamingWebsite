import {Directive, inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService, SaveData} from "@core/services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Directive()
export class BaseProductsListComponent implements OnInit, OnDestroy {
    protected localStorageService: LocalStorageService;
    protected router: Router;
    protected savedData: SaveData;
    protected baseControllerService: BaseControllerService;
    protected route: ActivatedRoute;
    protected loginService: UserLogined;
    dialog = inject(MatDialog);

    public productList: Array<any> = [];
    protected currentUrl: string;
    private subscription:Subscription;
    protected panelType:string = "HeaderPanel2Menu";
    public providersTitle:string = "";

    constructor(public injector: Injector) {
        this.localStorageService = injector.get(LocalStorageService);
        this.router = injector.get(Router);
        this.savedData = injector.get(SaveData);
        this.baseControllerService = injector.get(BaseControllerService);
        this.route = injector.get(ActivatedRoute);
        this.loginService = injector.get(UserLogined);
    }

    ngOnInit()
    {
        this.getProductList();
        this.subscription = this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd)
            {
                this.getProductList();
            }
        });
    }

    getProductList(finished = false)
    {
        this.baseControllerService.GetProductSubList(this.panelType).then((data: any) => {
            this.currentUrl = this.router.url;
            this.currentUrl = this.currentUrl.substring(this.currentUrl.indexOf("/") + 1);
            const subMenu = data.filter((subItem) => subItem.Href === this.currentUrl);
            if(subMenu && subMenu.length)
            {
                this.providersTitle = subMenu[0].Title + ' ' + 'Providers';
                this.productList = subMenu[0]['SubMenu'];
            }
            else if(!finished)
            {
                this.panelType = 'HeaderPanel1Menu';
                this.getProductList(true);
            }

        });
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

}
