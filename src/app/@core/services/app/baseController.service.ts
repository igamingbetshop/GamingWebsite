import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {LocalStorageService} from './localStorage.service';
import {AuthService} from '../api/auth.service';
import {DeviceDetectorService} from "ngx-device-detector";
import {environment} from "../../../../environments/environment";
import {FavoritesService} from "@core/services/api/favorites.service";
import {UserLogined} from "@core/services/app/userLogined.service";

@Injectable()
export class BaseControllerService {

    public params: any = {
        gamesList: [],
        productsList: [],
        gameOpenTypes: {
            Popup: 1,
            Page: 2
        }
    };


    private totalItems: any[];
    private favoritItems: any[];

    constructor(private configService: ConfigService,
                private userLogined: UserLogined,
                private localStorageService: LocalStorageService,
                private authService: AuthService,
                private deviceService: DeviceDetectorService,
                private favoriteService: FavoritesService)
    {

    }

    public  GetMenuByType(type)
    {
        const menus = this.configService.settings.MenuList;
        const menu = menus.find(menuItem => menuItem.Type === type);
        let result:any = null;
        if(menu)
        {
            try {
                result = JSON.parse(menu.StyleType);
            }
            catch (e)
            {

            }
        }
        return result;
    }

    public async GetMenu(name, lang = 'en') {
        const settings = await this.configService.settings,
            list = settings['MenuList'],
            menuList = list;

        if (typeof (menuList.find(menuItem => menuItem.Type === name)) !== 'undefined')
        {
            return menuList.find(menuItem => menuItem.Type === name).Items.reduce((acc, menuItem) => {
                /**
                 * Here if(menuItem.children) is the check of mobile menu hierarchy, in desktop menu version, the else block is responsible
                 */
                if (menuItem.SubMenu) {

                    const children = menuItem.SubMenu.reduce((childrenAcc, childItem) => {
                        childrenAcc.push({
                            ...childItem,
                            Title: childItem.Title
                        });
                        return childrenAcc;
                    }, []);

                    acc.push({
                        ...menuItem,
                        children,
                        Title: menuItem.Title
                    });
                } else {

                    acc.push({
                        ...menuItem,
                        Title: menuItem.Title
                    })
                }

                return acc;
            }, []);

        }

        // for (let i = 0; i < menuList.length; i++) {
        //   if (menuList[i].Type == name) {
        //     const menu = menuList[i].Items;
        //     for (let j = 0; j < menu.length; j++) {
        //       menu[j].Title = menu[j].Titles[language] || menu[j].Titles['en'];
        //     }
        //     return menu;
        //   }
        // }
    }


    public async GetProductList(name, productType) {
        const settings = await this.configService.settings,
            list = settings['MenuList'],
            menuList = list;
        for (let i = 0; i < menuList.length; i++) {
            if (menuList[i].Type == name) {
                const menu = menuList[i].Items;
                for (let j = 0; j < menu.length; j++) {
                    if (menu[j].Href == productType && menu[j].SubMenu) {
                        return menu[j].SubMenu;
                    }
                }
            }
        }
    }

    public async GetProductSubList(name) {
        const settings = await this.configService.settings,
            menuList = settings['MenuList'];
        for (let i = 0; i < menuList.length; i++) {
            if (menuList[i].Type == name) {
                return  menuList[i].Items;
            }
        }
    }

    public async GetBanners(name) {
        const settings = await this.configService.settings,
            list = settings[name];
        return list['items'];
    }

    public GetProductById(id) {
        return this.params.gamesList[id] ? this.params.gamesList[id] : {};
    }

    public async ReadProductList(routeData) {
        let data = {};
        // if (this.params.productsList.length === 0) {
        const list = routeData;
        const items = list['items'];
        this.totalItems = items;
        this.params.gamesList = {};

        for (let i = 0; i < items.length; i++) {
            this.params.gamesList[items[i].productId] = items[i];
        }

        const categories = [];

        const productCategories = await this.configService.settings;

        const categoriesItem = productCategories['ProductCategories'];
        const itemId = items.map((item) => item.productId);

        for (let j = 0; j < categoriesItem.length; j++) {
            const category = categoriesItem[j];
            let item = {};
            item['Key'] = category.Type;
            item['Value'] = [];
            const result = category.Products.filter((category) => itemId.indexOf(category) !== -1);
            for (let k = 0; k < result.length; k++) {
                const game = this.GetProductById(result[k]);
                //if the game value is null that means that the game is not for desktop, so we should not add empty object in category games list
                if (game) {
                    let imageUrl = '';
                    if (game['gameImage']) {
                        if (game['gameImage'].indexOf('virtual-games') !== -1) {
                            // imageUrl = './Data/' + siteOptions.Domain + '/images/products/' + game.gameImage;
                        } else {
                            imageUrl = game['gameImage'].indexOf('http') !== 0 ? './app/projects/' + environment.projectPath + '/assets/images/products/' + game['gameImage'] : game['gameImage'];

                        }
                    }
                    game['ImageUrl'] = imageUrl;
                    game['openType'] = category.Products[k].openType;
                    game['url'] = category.Products[k].url;
                    game['mobileUrl'] = category.Products[k].mobileUrl;
                    game['type'] = category.Products[k].type;
                    item['Value'].push(game);
                }
            }
            categories.push(item);
        }

        this.params.productsList = categories;
        data = this.params.productsList;
        if (this.userLogined.isAuthenticated) {
            this.favoriteService.getFavorites();
            this.favoriteService.notifyGetFavorites.subscribe(data => {
                this.favoritItems = data;
                for (let k = 0, count = this.totalItems.length; k < count; k++) {
                    for (let m = 0; m < this.favoritItems.length; m++) {
                        if (this.totalItems[k]['productId'] == this.favoritItems[m]['ProductId']) {
                            this.totalItems[k]['isFavorite'] = true;
                            this.favoritItems.splice(m, 1);
                            break;
                        }
                        if (this.favoritItems.length == 0)
                            break;
                    }
                }

                this.favoriteService.isFavoritesFetchedAndMapped.next(true);
            });
        }

        return data;
    }

    public GetCategoryGames(category): any {
        let response = [];
        this.params.productsList.forEach((item) => {
            if (item.Key == category) {
                response = item.Value;
                return false;
            }
        });
        return response;
    }


    // returns games' providers array with their products
    public GetGamesProviders(games): any {
        let providers = [];
        let providerIndex = 0;
        games.forEach((game) => {
            if (providers.filter(provider => (provider.providerId === game.providerId)).length == 0) {
                providers.push({
                    "providerName": game.providerName,
                    "providerId": game.providerId,
                    "imgUrl": '/assets/images/providers/' + game.providerId + '.png',
                    "products": []
                });
                providerIndex = providers.length - 1;
            } else {
                providerIndex = providers.findIndex(provider => provider.providerId === game.providerId);
            }
            providers[providerIndex].products.push(game);
        });

        return providers;
    }


    public GetOpenType(game, playType) {
        const id = game['providerId'];
        if (id == 10 || id == 11 || id == 12) {
            return 'server';
        }
    }

    public async drawGame(game, token, playType) {
        const g = await this.generateGameUrl(game, token, playType),
            siteOptions = this.configService.defaultOptions,
            userData = this.localStorageService.get('user'),
            currentLang = localStorage.getItem('lang');
        if (typeof g === 'string') {

        } else {
            const input = {
                'ClientId': this.userLogined.isAuthenticated ? userData.Id : 0,
                'PartnerId': siteOptions.PartnerId,
                'Token': token,
                'LanguageId': currentLang,
                'IsForDemo': playType === 'real' ? false : true,
                'IsForMobile': (this.deviceService.isMobile() || this.deviceService.isTablet()),
                'TimeZone': this.GetTimeZone(),
                'ProductId': g.gameId,
                'Position': game.name,
                'DeviceType': 1
            };

            let responseData = await this.authService.getProductUrl(input);
            let ratingObj = await this.authService.getProductInfo(input);
            responseData.Rating = ratingObj.ResponseObject.Rating;
            return responseData;
        }
    }

    public GetTimeZone() {
        const d = new Date();
        return -1 * d.getTimezoneOffset() / 60;
    }

    public async generateGameUrl(game, token, playType) {

        const defaultObject = this.configService.defaultOptions;
        return {'gameId': game.productId};
    }

}
