import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {BaseApiService} from "../../../../../../../@core/services/api/base-api.service";
import {FragmentData, ProductIno} from "../../../../../../../@core/models";
import {Methods} from "../../../../../../../@core/enums";
import {take} from "rxjs/operators";
import {ConfigService, LocalStorageService, SaveData} from "../../../../../../../@core/services";
import {FavoritesService} from "../../../../../../../@core/services/api/favorites.service";

@Component({
    selector: 'casino-game',
    templateUrl: './casino-game.component.html',
    styleUrls: ['./casino-game.component.scss'],
})
export class CasinoGameComponent implements OnInit
{
    @Input() game: any;
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    @Input() classes = '';
    @Input() loadingType:string = 'lazy';
    showInfobox = false;
    productInfo:ProductIno;
    currencySymbol:string;
    tags:string;

    @Output('onOpen') onOpen:EventEmitter<any> = new EventEmitter<any>();

    private user;

    constructor(
        protected injector:Injector,
        private localStorageService: LocalStorageService,
        private saveData:SaveData,
        private baseApiService: BaseApiService,
        private favoriteService: FavoritesService,
        public configService: ConfigService) {
    }

    ngOnInit()
    {
        this.user = this.localStorageService.get('user');
        this.currencySymbol = this.user ? this.user.CurrencySymbol : '';
        this.productInfo = new ProductIno();
    }

    toggleFavorite(game: any)
    {
        this.game = game;
        if(this.user)
        {
            this.favoriteService.toggleFavorite(this.game);
        }
        else
        {
            this.saveData.openPopup.next('1');
        }

    }


    toggleInfo(productId?:number): void {
        this.showInfobox = !this.showInfobox;
        if (this.showInfobox && productId)
            this.getPartnerProductInfo(productId);
    }

    private getPartnerProductInfo(productId:number)
    {
        this.baseApiService.apiRequest({ProductId:productId}, '', Methods.GET_PARTNER_PRODUCT_INFO, false)
            .pipe(take(1))
            .subscribe(data => {
                if(data.ResponseCode === 0)
                {
                    this.productInfo = data.ResponseObject;
                    this.tags = data.ResponseObject.Tags.split(",", 2);
                }
            });
    }

    public openGame(game, type)
    {
        this.onOpen.emit({game:game, type:type});
    }
}
