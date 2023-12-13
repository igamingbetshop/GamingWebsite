import {AfterViewChecked, Injectable, Injector, OnDestroy, OnInit, Sanitizer} from '@angular/core';
import {LocalStorageService, SaveData} from "@core/services";
import {UserLogined} from "@core/services/app/userLogined.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {OpenGamesService} from "@core/services/app/openGames.service";
import {UtilityService} from "@core/services/app/utility.service";
import {SafeResourceUrl} from "@angular/platform-browser";
import {take} from "rxjs";

@Injectable()
export class BaseMobileOpenGameComponent implements OnInit, AfterViewChecked, OnDestroy {
    protected openType: number;
    protected iframeUrl: SafeResourceUrl;
    protected saveData: SaveData;
    protected userLogined: UserLogined;
    protected localStorageService: LocalStorageService;
    protected router: Router;
    protected route: ActivatedRoute;
    protected utilityService: UtilityService;
    protected openGamesService: OpenGamesService;

    protected isLogin: boolean;
    protected redirectUrl: string;
    protected showErrorTag: boolean = false;

    constructor(public injector: Injector
    ) {
        this.saveData = injector.get(SaveData);
        this.userLogined = injector.get(UserLogined);
        this.localStorageService = injector.get(LocalStorageService);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.utilityService = injector.get(UtilityService);
        this.openGamesService = injector.get(OpenGamesService);
    }

    ngOnInit() {
        this.openType = this.getMobileOpenType();
        this.initOpenGame();
    }

    getMobileOpenType() {
        const openMode = this.route.snapshot.params.openType ? this.route.snapshot.params.openType : 1;
        const MobileOpenMode = parseInt(String(openMode / 10), 10);

        if(MobileOpenMode == 0) {
            return 1;
        }

        return parseInt(String(openMode % 10), 10);
    }

    ngAfterViewChecked() {
        this.toggleFooter(true);
    }

    toggleFooter(isActive: boolean) {
        const headerBottomPanel = (<HTMLInputElement>document.getElementById('mobileFooterSection'));
        if (!!headerBottomPanel) {
            headerBottomPanel.style.display = isActive ? 'none' : 'block';
        }
    }

    initOpenGame() {
        if (!this.allowToRedirect) {
            return;
        }

        if(!this.isAuthenticated) {
            return;
        }

        this.openGamesService.getProductUrl(parseInt(this.route.snapshot.params.productId), this.route.snapshot.queryParams.position);
        this.openGamesService.notifyGetIframUrl.pipe(take(1)).subscribe((responseData) => {
            if (responseData) {
                this.showGame(responseData);
            }
        });
        this.openGamesService.notifyGetIframUrlError.subscribe((responseData) => {
            this.showErrorTag = true;
        });
    }

    get isAuthenticated(): boolean {
        this.isLogin = this.userLogined.isAuthenticated;
        if (!this.isLogin && this.route.snapshot.params.type == 'real') {
            if (this.openType == 1) {
                history.replaceState(null, null, this.router.url.split('?')[0]);
            }
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    get allowToRedirect(): boolean {
        if (this.openType != 1) {
            return true;
        }

        const backUrl = localStorage.getItem("opened-url") || "/";
        if (this.route.snapshot.queryParams.redirect) {
            return true;
        }

        this.router.navigateByUrl(backUrl);
        return false;
    }

    showGame(responseData) {
        if(this.openType == 2) {
            window.scrollTo({top: 0, behavior: 'smooth'});
            this.showErrorTag = false;
            this.iframeUrl = responseData;
        } else {
            localStorage.removeItem('product-url');
            this.router.navigate([this.router.url.split('?')[0]]);
            this.redirectUrl = this.route.snapshot.data["backUrl"];
            this.showErrorTag = false;
            window.location.href = responseData;
        }
    }

    ngOnDestroy() {
        this.toggleFooter(false);
    }
}
