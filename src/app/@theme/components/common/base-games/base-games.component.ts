import {
    AfterViewInit, Directive,
    ElementRef,
    HostListener,
    Injector,
    SecurityContext,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from "../../../../../environments/environment";
import {BaseComponent} from '../../base/base.component';
import {GetJackpotService} from "@core/services/api/getJackpot.service";
import {casinoDataType, ConfigService, SaveData} from "@core/services";
import {DeviceDetectorService} from "ngx-device-detector";
import {MenuType} from "@core/enums";
import {getFakeAmountRangeByCurrency, getRandomInt} from "@core/utils";
import {SignalRService} from "@core/services/soket/signal-r.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {TranslateService} from "@ngx-translate/core";
import {SimpleModalService} from 'ngx-simple-modal';
import {OpenGamesService} from "@core/services/app/openGames.service";
import {FilterPipe} from "ngx-filter-pipe";
import {FavoritesService} from "@core/services/api/favorites.service";
import {debounceTime, take} from "rxjs/operators";
import {Subject} from "rxjs";
import {BalanceService} from "@core/services/api/balance.service";
import {DomSanitizer} from "@angular/platform-browser";

@Directive()
export class BaseGamesComponent extends BaseComponent implements AfterViewInit {

    public commonItems:any[] = [];
    public userInfoData: any;
    public balance: string;
    public router: Router;
    public route: ActivatedRoute;
    public getJackpotService: GetJackpotService;
    public deviceService: DeviceDetectorService;
    public translate: TranslateService;
    public configService: ConfigService;
    protected signalRService: SignalRService;
    public userLogined: UserLogined;
    public simpleModalService: SimpleModalService;
    protected openGamesService: OpenGamesService;
    protected favoriteService: FavoritesService;
    public saveData: SaveData;
    public filter: FilterPipe;

    private searchGame = new Subject();

    public filterGamesList: any;
    public updatedData: any;
    public gameFilter: any = {name: ''};
    public providerFilter: any = {name: ''};
    public selectedProvider: any = {};
    public availableSearchValue: boolean = false;
    public isScrollToTopVisible = false;

    public maxColumnsMobile: number;
    public maxColumnsWeb: number;

    public providers: Array<any> = [
        {
            Id: 0,
            Name: 'All providers',
        }
    ];

    public subMenuItems: Array<any> = [];
    public slides: Array<any> = [];
    public casinoLayouts: string[] = [];

    public selectedProvidersArr: Array<any> = [];

    public casinoPageName: any;

    protected isUpdated: boolean = false;
    public isLogined: boolean;

    public routeName: string;
    public productBgName: string;
    public selectedCasinoLayout: string;
    public currentUrl: string;
    public casinoTypeId: string;
    public parentUrl: string;

    public slideKey: number = -1;
    protected currentSlideIndex: number = 0;

    public page: number = 0;
    public itemsCount: number = 100;
    protected productListRef: ElementRef;

    private isPreviousOpenGame = false;
    private isScrolledProgrammatically = false;
    public TotalGamesCount: number = 0;
    public LeftGamesCount: number =0;
    public isTopMenu: string;
    public isShowProvider = false;

    public balanceService: BalanceService;
    public bonus: string;
    public casinoBackgroundUrl:string = '';


    @ViewChild('productList', { read: ViewContainerRef }) set content(content: ElementRef) {
        if (content) {
            this.productListRef = content;
            if (this.productListRef['element'].nativeElement)
                this.itemsCount = (Math.min(this.maxColumnsWeb, Math.round(this.productListRef['element'].nativeElement.clientWidth / 360)) * this.maxColumnsWeb);
        }
    }

    @ViewChild('searchResult') searchResult:ElementRef;

    @HostListener('window:scroll', ['$event'])
    onScroll(event)
    {
        this.saveData.updateScrollPositionData(false, this.page, this.itemsCount);
        this.isScrollToTopVisible = event.currentTarget.pageYOffset > 674;
    }


    private sanitizer:DomSanitizer;
    constructor(public injector: Injector) {
        super(injector);
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.getJackpotService = injector.get(GetJackpotService);
        this.configService = injector.get(ConfigService);
        this.deviceService = injector.get(DeviceDetectorService);
        this.signalRService = injector.get(SignalRService);
        this.currentUrl = this.router.url;
        this.userLogined = injector.get(UserLogined);
        this.translate = injector.get(TranslateService);
        this.isLogined = this.userLogined.isAuthenticated;
        this.simpleModalService = injector.get(SimpleModalService);
        this.openGamesService = injector.get(OpenGamesService);
        this.saveData = injector.get(SaveData);
        this.favoriteService = injector.get(FavoritesService);
        this.filter = new FilterPipe();
        this.userInfoData = this.userLogined.getUserInfo();
        this.sanitizer = injector.get(DomSanitizer);
        this.balanceService = injector.get(BalanceService);

        this.route.data.subscribe((routeData) => {
            this.routeName = routeData.productName;
            this.productBgName = routeData.productName;
            this.slideKey = routeData.slideKey;
        });
        this.route.params.subscribe((params) =>
        {
            this.slideKey = -1;
            if(params.categoryId)
            {
                setTimeout(() => {this.slideKey = params.categoryId;}, 0);
            }
        });

        this.subMenuItems = JSON.parse(JSON.stringify(this.configService.settings.MenuList.find(elem => elem.Type == MenuType.CASINO_MENU).Items)).map(item => {
            item.Src = item.Icon.includes('.') ? '../../../../../../../assets/images/' + item.Icon : null;
            return item;
        });
        this.casinoBackgroundUrl = this.subMenuItems[0]?.SubMenu[0]?.Icon;

        this.isTopMenu =  this.subMenuItems[0].StyleType;


        this.selectedProvider = this.saveData.selectedProvider || this.providers[0];
        this.parentUrl = window.location.pathname.split('/')[1];

        this.subscriptions.push(this.favoriteService.notifyRemoveFavorites.subscribe(data =>
        {
            if (this.router.url.includes("my-favorites"))
            {
                let index = this.filterGamesList.findIndex(elem => elem['productId'] == data);
                if (index > -1)
                    this.filterGamesList.splice(index, 1);
            }
        }));
    }

    ngOnInit() {
        super.ngOnInit();
        this.casinoLayouts = this.configService.defaultOptions["GameLayouts"];
        // this.maxColumnsMobile = 1;
        let gridLayout = this.casinoLayouts.filter(el => el['Type'] == 'grid')[0];
        if(gridLayout) {
            if(gridLayout['Href']) {
                let href = JSON.parse(gridLayout['Href']);
                if(href.MaxColumnsMobile) {
                    this.maxColumnsMobile = href.MaxColumnsMobile;
                }
                if(href.MaxColumnsWeb) {
                    this.maxColumnsWeb = href.MaxColumnsWeb;
                }
            }
        }
        this.selectedCasinoLayout = this.casinoLayouts[0];

        if(window.innerWidth > 760) {
            this.itemsCount = 100;
        } else {
            if(this.maxColumnsMobile > 1) {
                this.itemsCount = 6 * this.maxColumnsMobile;
            } else if(this.maxColumnsMobile == 1 && this.router.url.includes('casino')){
                this.itemsCount = 6;
            } else {
                this.itemsCount = 100;
            }
        }




        this.signalRService.onUpdateWinWidget$.subscribe(data =>
        {
            this.updatedData = data;
            this.isUpdated = true;
        });

        this.searchGame.pipe(debounceTime(500)).subscribe(() => {
            localStorage.setItem('casinoFilterGame', JSON.stringify({
                'searchValue': this.gameFilter.name,
                'filterValue': this.selectedProvider
            }));
            this.setCurrentPageIndex(0);
            this.filterGamesList = [];
            this.providers = [
                {
                    Id: 0,
                    Name: 'All providers'
                }
            ];

            this.getCasinoGames();
        });

        this.saveData.currentScrollPosition$.pipe(take(1)).subscribe(data =>
        {
            if(data && data.shouldUpdate)
            {
                this.isPreviousOpenGame = true;
                this.setCurrentPageIndex(data.pageSize / this.itemsCount);
                this.getCasinoGames(false, data);
            }
        });


        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.balance = Number(data.AvailableBalance).toFixed(2);
            this.bonus = Number(data.BonusBalance) > 0 ? Number(data.BonusBalance).toFixed(2) : "0.00";

        });
    }

    ngAfterViewInit()
    {
        this.filterGamesList = [];
        let filteredValues = localStorage.getItem('casinoFilterGame') ? JSON.parse(localStorage.getItem('casinoFilterGame')) : null;
        if (filteredValues !== null)
        {
            if (filteredValues['searchValue'] !== '')
            {
                this.gameFilter.name = filteredValues['searchValue'];
            }
            if (filteredValues['filterValue'] && filteredValues['filterValue']['Id'] !== 0)
            {
                this.selectedProvider = filteredValues['filterValue'];
            }
            //localStorage.setItem('casinoFilterGame', null);
        }

        this.route.params.subscribe(routeParams =>
        {
            this.casinoPageName = routeParams.typeId ? this.subMenuItems.filter((item) => item.Href == routeParams.typeId)[0] : this.subMenuItems[0];
            this.casinoTypeId = this.routeName == "my-favorites" ? "0" : routeParams.typeId == "my-favorites" ? "0" : routeParams.typeId;
            this.changeLayout(this.selectedCasinoLayout);
        });

    }

    changeLayout(layoutType)
    {
        if(this.isPreviousOpenGame)
            this.isPreviousOpenGame = false;
        else
        {
            this.setCurrentPageIndex(0);
            this.providers = [{
                Id: 0,
                Name: 'All providers'
            }];
            this.filterGamesList = [];
            this.selectedCasinoLayout = layoutType;
            this.getCasinoGames();
        }
    }

    onScrollDown(ev)
    {
        if(this.isScrolledProgrammatically)
            this.isScrolledProgrammatically = false;
        else
        {
            this.setCurrentPageIndex(this.page + 1);
        }
        this.getCasinoGames(true);
    }

    onUp(ev)
    {

    }

    resetProviderFilter(path:string = '')
    {
        /*TO DO understand route navigation from html and ts files in the same time*/
       /* if(!isNaN(Number(path)))
            this.router.navigate(['/casino/all-games'], {queryParams:{categoryId:path}})
        else this.router.navigateByUrl(path);*/
        localStorage.setItem('casinoFilterGame', null);
    }

    hideProvider() {
        this.isShowProvider = !this.isShowProvider;
    }

    public changeProvider(provider)
    {
        if(this.selectedProvider && this.selectedProvider.Id === provider.Id)
            return;
        this.setCurrentPageIndex(0);
        this.filterGamesList = [];
        localStorage.setItem('casinoFilterGame', JSON.stringify({
            'searchValue': this.gameFilter.name,
            'filterValue': provider
        }));
        this.selectedProvider = provider;
        this.providers = [
            {
                Id: 0,
                Name: 'All providers'
            }
        ];
        this.getCasinoGames();
    }

    getCasinoGames(onlyScroll: boolean = false, scrollPositionData:any = null)
    {
        let filteredCategoryItem = JSON.parse(JSON.stringify(this.configService.settings.MenuList.find(subItem => subItem.Type == MenuType.CASINO_MENU).Items)).filter((subItem: any) => subItem.Href === this.casinoTypeId);

        let providersList = [];
        if (this.selectedProvidersArr.length) {
            providersList = this.selectedProvidersArr.map((item) => {
                return item.Id;
            });
        } else {
            if (this.selectedProvider['Id']) {
                providersList.push(this.selectedProvider['Id']);
            } else {
                providersList = null;
            }
        }

        let input = {
            'PageIndex': scrollPositionData ? scrollPositionData.pageIndex : this.page,
            //'PageSize': scrollPositionData ? scrollPositionData.pageSize : this.itemsCount,
            'PageSize': this.itemsCount,
            'WithWidget': false,
            'CategoryId': this.router.url.includes('category') ? parseInt(this.route.snapshot.params.categoryId) : filteredCategoryItem.length ? parseInt(filteredCategoryItem[0]['Href']) : null,
            'ProviderIds': providersList,
            'IsForMobile': this.deviceService.isMobile(),
            'Name': this.gameFilter.name
        };

        this.getGamesByFilter(input, onlyScroll, scrollPositionData);
    }

    getGamesByFilter(input, onlyScroll: boolean = false, scrollPositionData:any = null)
    {
        this.getJackpotService.getcasinoGames(input).subscribe((data: any) => {
            let casinoGamesData: casinoDataType = {
                games: [],
                providers:[]
            };

            if (data['ResponseCode'] === 0)
            {
                this.TotalGamesCount = data['ResponseObject']['TotalGamesCount'];
                this.LeftGamesCount = data['ResponseObject']['LeftGamesCount'];
                for (let i = 0; i < data['ResponseObject']['Games'].length; i++) {
                    const product = {
                        gameImage: data['ResponseObject']['Games'][i]["i"].startsWith('http') ? this.sanitizer.sanitize(SecurityContext.URL, data['ResponseObject']['Games'][i]["i"]) : this.sanitizer.sanitize(SecurityContext.URL,'https://resources.' + environment.hostName + '/products/' + data['ResponseObject']['Games'][i]["i"]),
                        name: data['ResponseObject']['Games'][i]["n"],
                        hasDemo: data['ResponseObject']['Games'][i]["hd"],
                        nickName: data['ResponseObject']['Games'][i]["nn"],
                        openMode: data['ResponseObject']['Games'][i]["o"],
                        productId: data['ResponseObject']['Games'][i]["p"],
                        providerId: data['ResponseObject']['Games'][i]["s"],
                        providerName: data['ResponseObject']['Games'][i]["sp"],
                        rating: data['ResponseObject']['Games'][i]["r"],
                        jackpotValue: data['ResponseObject']['Games'][i]["jp"] ? Math.max(...JSON.parse(data['ResponseObject']['Games'][i]["jp"])) : null,
                        subproviderId: data['ResponseObject']['Games'][i]["ss"],
                        subproviderName: data['ResponseObject']['Games'][i]["sn"],
                        isFavorite: data['ResponseObject']['Games'][i]["f"]
                    };
                    casinoGamesData.games.push(product);
                }

                this.filterGamesList.push(...casinoGamesData.games);

                if (this.filterGamesList.length > 0) {
                    this.addFakeSlideData(this.filterGamesList);
                }
                if (!onlyScroll)
                {
                    this.providers.push(...data['ResponseObject']['Providers']);
                }

                if(scrollPositionData)
                {
                    const p = setTimeout(() =>
                    {
                        this.isScrolledProgrammatically = true;
                        window.scrollTo(0, scrollPositionData.scrollY);
                        this.saveData.updateScrollPositionData(false, undefined, undefined);
                    });
                }
            }
        });
    }


    searchData() {
        this.searchGame.next(null);
        if (!this.availableSearchValue) {
            this.availableSearchValue = true;
        } else if (this.gameFilter.name == '') {
            this.availableSearchValue = false;
        }
    }

    protected addFakeSlideData(source: Array<any>) {
        for (let i = 0; i < 10; i++)
        {
            const fakeItem = source[getRandomInt(0, source.length - 1)];
            let currencyId = this.configService.defaultOptions["Currencies"][getRandomInt(0, this.configService.defaultOptions["Currencies"].length - 1)];
            let item = {
                GameName: fakeItem["name"],
                ClientName: "U" + getRandomInt(1, 100000),
                CurrencyId: currencyId,
                ImageUrl:fakeItem.gameImage,
                ProductId:fakeItem.productId,
                Amount: getRandomInt(getFakeAmountRangeByCurrency(currencyId), getFakeAmountRangeByCurrency(currencyId) * 100),
            }
            this.slides.push(item);
        }
    }

    afterChangeSlide(event) {
        this.currentSlideIndex = event.currentSlide;

        if (this.isUpdated) {
            this.isUpdated = false;
            const index = this.currentSlideIndex - 1 > 0 ? this.currentSlideIndex - 1 : 9;
            this.slides[index].Amount = this.updatedData.Amount;
            this.slides[index].GameName = this.updatedData.GameName;
            this.slides[index].ClientName = this.updatedData.ClientName;
            this.slides[index].CurrencyId = this.updatedData.CurrencyId;
            this.slides[index].ProductId = this.updatedData.ProductId;
            this.slides[index].ImageUrl = this.updatedData.ImageUrl;
        }
    }

    private setCurrentPageIndex(index)
    {
        this.page = index;
    }

    ngOnDestroy()
    {
        super.ngOnDestroy();
        this.saveData.selectedProvider = this.selectedProvider;
    }

    scrollToTop()
    {
        this.searchResult.nativeElement.scrollIntoView();
    }

}
