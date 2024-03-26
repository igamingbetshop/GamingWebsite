import {Directive, ElementRef, Inject, Injector, ViewChild} from '@angular/core';
import {BaseControllerService} from "@core/services/app/baseController.service";
import {AppConfirmComponent} from "../../desktop/app-confirm/app-confirm.component";
import {BaseGamesComponent} from "../../../../../../@theme/components/common/base-games/base-games.component";
import {DOCUMENT} from "@angular/common";
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

@Directive()
export class AppCommonFilterProductsComponent extends BaseGamesComponent {

    public baseControllerService: BaseControllerService;
    @ViewChild('providerPopRef') providerPopRef:ElementRef;

    public showRoutesList: boolean = false;
    public showFilterList: boolean = false;
    public allGamesList: Array<any> = [];
    @Inject(DOCUMENT) public document: Document;

    constructor(public injector: Injector) {

        super(injector);
        this.document = injector.get(DOCUMENT);
        this.baseControllerService = injector.get(BaseControllerService);

        this.subscriptions.push(this.favoriteService.isFavoritesFetchedAndMapped.subscribe(data => {
            // if (data && this.routeName == "my-favorites")
                // this.filterGamesList = this.setGamesWithType(this.allProducts, this.routeName);
        }));
    }

    toggleFavorite(item) {
        if (this.isLogined)
            this.favoriteService.toggleFavorite(item);
        else {
            this.dialog.open(AppConfirmComponent, {data:{title: 'open_login',
                    message: true}});
        }
    }

    ngOnInit() {
        super.ngOnInit();
    }

    public openRoutesList() {
        this.showRoutesList = !this.showRoutesList;
    }

    public openFilterList()
    {
        this.showFilterList = !this.showFilterList;
        if(this.showFilterList)
        {
            if(this.providerPopRef)
            {
                disableBodyScroll(this.providerPopRef.nativeElement);
            }
        }
        else enableBodyScroll(this.providerPopRef.nativeElement);
    }

}
