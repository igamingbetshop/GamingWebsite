import {AfterViewChecked, AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {BaseFullWindowComponent} from "../../../../../../@theme/components/common/base-full-window/base-full-window.component";
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import {SimpleModalService} from "ngx-simple-modal";
import {closeFullscreen, openFullscreen} from '../../../../../../@core/utils';
import {FavoritesService} from "../../../../../../@core/services/api/favorites.service";
import {Controllers, Methods} from "../../../../../../@core/enums";
import {BaseApiService} from "../../../../../../@core/services/api/base-api.service";
import {StateService} from "../../../../../../@core/services/app/state.service";

@Component({
    selector: 'app-full-window',
    templateUrl: './full-window.component.html',
    styleUrls: ['./full-window.component.scss']
})
export class FullWindowComponent extends BaseFullWindowComponent implements AfterViewChecked {
    game = {
        isFavorite: false,
        productId: null
    };

    isFullscreen:boolean = false;

    constructor(
        public injector: Injector,
        private simpleModalService: SimpleModalService,
        private favoriteService: FavoritesService,
        private baseApiService: BaseApiService,
        private stateService:StateService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getFavorites();
        super.ngOnInit();
        if(/real|demo/.test(this.router.url) && !this.router.url.includes('product'))
        {
            document.getElementById('footerSection').style.display = 'none';
        }
    }

    ngAfterViewChecked()
    {
        this.toogleHeaderBottomPAnel(true);
    }


    toogleHeaderBottomPAnel(isActive: boolean) {
        const headerBottomPanel = (document.getElementById('header-bottom') as HTMLInputElement);
        if (!!headerBottomPanel && !!this.isGamePage) {
            headerBottomPanel.style.display = isActive ? 'none' : 'block';
        }
    }

    ngOnDestroy() {
        this.toogleHeaderBottomPAnel(false);
        super.ngOnDestroy();
        document.getElementById('footerSection').style.display = 'block';
    }

    goBack()
    {
        this.router.navigateByUrl(this.stateService.getProductBackUrl);
    }

    public openGameInFullScreen()
    {
        openFullscreen(document.getElementById('full-window-game-container'));
    }

    onFullScreenChange(event)
    {
        this.isFullscreen = !!document.fullscreenElement;
    }

    exitFullscreen()
    {
        closeFullscreen();
    }

    public toggleFavorite() {
        this.favoriteService.toggleFavorite(this.game);
    }

    protected onProductUrlError(data) {
        super.onProductUrlError(data);
        /*If game hasn't demo mode*/
        if (data.ResponseCode == 174) {
            localStorage.setItem('product-url', this.router.url);
            this.simpleModalService.addModal(AppConfirmComponent, {
                title: 'open_login',
                message: true
            }).subscribe((isConfirmed) => {
                if (!isConfirmed)
                    localStorage.removeItem('product-url');
            });
        }
    }

    private getFavorites(): void {
        this.baseApiService.apiRequest(null, Controllers.PRODUCT, Methods.GET_CLIENT_FAVORITE_PRODUCTS).subscribe(data => {
            if (data.ResponseCode === 0) {
                this.game.productId = this.productId;
                this.game.isFavorite = data.ResponseObject.some(favorite => favorite.ProductId === this.game.productId);
            }
        });
    }

}