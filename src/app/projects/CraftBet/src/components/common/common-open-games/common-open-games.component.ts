import {Directive, Injector} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../../../../@theme/components/base/base.component";
import {OpenGamesService} from "@core/services/app/openGames.service";
import {AuthService, SaveData} from "@core/services";
import {BalanceService} from "@core/services/api/balance.service";

@Directive()
export class CommonOpenGamesComponent extends BaseComponent {
    public route: ActivatedRoute;
    public router: Router;
    private authService: AuthService;
    public openGamesService: OpenGamesService;

    public iframeUrl: string;
    public showErrorTag: boolean = false;
    public redirectUrl: string;
    public goBackUrl: string;
    public ratingPercent: number;
    private balanceService: BalanceService;

    public rating: number;
    public name: string;
    public backgroundImage: string;
    public fullScreenIframeUrl: string;
    protected savedData:SaveData;

    constructor(public injector: Injector) {
        super(injector);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.openGamesService = injector.get(OpenGamesService);
        this.authService = injector.get(AuthService);
        this.balanceService = injector.get(BalanceService);
        this.savedData = injector.get(SaveData);
    }

    ngOnInit() {
        super.ngOnInit();
        this.route.data.subscribe((data) => {
            this.redirectUrl = data.backUrl;
        });

        this.route.params.subscribe(params => {
            this.openGamesService.getProductUrl(parseInt(params.productId));
            this.openGamesService.getProductInfo(parseInt(params.productId));
        });

        this.openGamesService.notifyGetIframUrl.subscribe((responseData) => {
            if (responseData) {
                this.fullScreenIframeUrl = responseData;
                this.showErrorTag = false;
            }
        });

        this.subscriptions.push(this.openGamesService.notifyGetIframUrlError.subscribe((responceData) => {
            this.onProductUrlError(responceData);
        }));



        this.openGamesService.notifyGetProductInfo.subscribe((responseData) => {
            this.rating = responseData['Rating'];
            this.name = responseData['Name'];
        });

        this.openGamesService.notifyGetProductInfoError.subscribe((responseData) => {
            this.rating = 0;
            this.name = '';
        });

        this.ratingPercent = ((this.rating > 5 ? 5 : this.rating) / 5) * 100;
        const routeParams = this.route.snapshot.params;

    }

    protected onProductUrlError(data)
    {
        this.showErrorTag = true;
    }

    redirectParentPage() {
        let goBackUrl = localStorage.getItem('opened-url');
        this.router.navigate([goBackUrl]);
    }

    ngOnDestroy()
    {
        super.ngOnDestroy();
        this.savedData.keepOrResetScrollPosition();
    }

}
