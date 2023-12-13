import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {BannerTypes} from "../../../../../@core/enums";
import {PromotionNewsResolver} from "../../../../../@core/services/resolves/promotion-news-resolver";
import {AccountPagesLoadGuard} from "../../../../../@core/services/helpers/account-pages-load-guard";
import {NavigationService} from "../../../../../@core/services/app/navigation.service";
import {MobileBottomSideBarComponent} from './mobile-bottom-side-bar/mobile-bottom-side-bar.component';
import {DesktopMobileCommonModule} from '../common/common.module';
import {ToNumberPipeModule} from '../../../../../@theme/pipes/to-number/to-number-pipe.module';
import {LoaderModule} from '../common/loader/loader.module';
import {FragmentPositions, MenuType} from '../../../../../@core/enums';
import {OpenGameGuard} from "../../../../../@core/services/helpers/open-game-guard";


export function liveRouteMatcher(url: UrlSegment[]) {
    if (url.length) {
        return (url[0].path === 'live' || url[0].path.startsWith('live/') || url[0].path.startsWith('/live')) ? ({consumed: url}) : null;
    }
    return null;
}

export function prematchRouteMatcher(url: UrlSegment[]) {
    if (url.length) {
        return (url[0].path.startsWith('prematch') || url[0].path.startsWith('/prematch')) ? ({consumed: url}) : null;
    }
    return null;
}

export function asianRouteMatcher(url: UrlSegment[]) {
    let isAsian = false;
    if (url.length && url[0].path.startsWith('asianweb')) {
        for (let i = 1; i < url.length; i++) {
            if (url[i].path.startsWith('asianweb')) {
                url.splice(i, 1);
                i--;
            }
        }
        isAsian = true;
    }
    return isAsian ? ({consumed: url}) : null;
}

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./mobile-homepage/mobile-home.module').then(m => m.MobileHomeModule),
        data: {productName: 'top-games', slideKey: BannerTypes.MOBILE_HOME, position: FragmentPositions.Home, menuType: MenuType.LIVE_CASINO},
    },
    {
        path: 'sport/:sportType',
        loadChildren: () => import('./mobile-default-sport/mobile-default-sport.module').then(m => m.MobileDefaultSportModule),
        data: {productId: 6, sportType: 1},
    },
    {
        matcher: prematchRouteMatcher,
        redirectTo: 'sport/prematch'
    },
    {
        matcher: liveRouteMatcher,
        redirectTo: 'sport/live'
    },
    {
        path: 'lottery/:sportType',
        data: {isActiveFooter: true, productId: 1009},
        loadChildren: () => import('./lottery-block/lottery-block.module').then(m => m.LotteryBlockModule),
    },
    /*{
        matcher: liveRouteMatcher,
        component: MobileDefaultSportComponent,
        data: {position: 'live', productId: 6},
    },*/
    {
        path: 'esport',
        loadChildren: () => import('./mobile-default-sport/mobile-default-sport.module').then(m => m.MobileDefaultSportModule),
        data: {position: 'esports', productId: 4001},
    },
    {
        path: 'asianweb',
        loadChildren: () => import('./mobile-default-sport/mobile-default-sport.module').then(m => m.MobileDefaultSportModule),
        data: {position: 'asianweb', productId: 6},
    },
    {
        matcher: asianRouteMatcher,
        loadChildren: () => import('./mobile-default-sport/mobile-default-sport.module').then(m => m.MobileDefaultSportModule),
        data: {position: 'asianweb', productId: 6},
    },
    {
        path: 'livecasino',
        loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
        data: {
            productName: 'all-games',
            slideKey: BannerTypes.LIVE_CASINO,
            position: FragmentPositions.LiveCasino,
            menuType: MenuType.LIVE_CASINO
        },
        children: [
            {
                path: '',
                redirectTo: 'all-games',
                pathMatch: 'full'
            },
            {
                path: ':typeId',
                loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
                data: {
                    isActiveFooter: false,
                    position:FragmentPositions.LiveCasino,
                    menuType:MenuType.LIVE_CASINO
                }
            }
        ]
    },
    {
        path: 'livecasino/:category/:productId/:type/:openType',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'casino/all-games',
        loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
        data: {
            productName: 'all-games',
            slideKey: BannerTypes.MOBILE_CASINO,
            position: FragmentPositions.Casino,
            menuType: MenuType.CASINO_MENU
        }
    },
    {
        path: '0',
        loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
        data: {
            productName: 'my-favorites',
            slideKey: BannerTypes.MOBILE_CASINO,
            position: FragmentPositions.Casino,
            menuType: MenuType.CASINO_MENU
        }
    },
    {
        path: 'casino/:typeId',
        loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
        data: {slideKey: BannerTypes.MOBILE_CASINO, position: FragmentPositions.Casino, menuType: MenuType.CASINO_MENU}
    },
    {
        path: 'casino/:category/:productId/:type/:openType',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'games/0',
        redirectTo: '/games/my-favorites',
        pathMatch: 'full'
    },
    {
        path: 'games',
        redirectTo: 'games/all-games',
        pathMatch: 'full'
    },
    {
        path: 'games/all-games',
        loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
        data: {productName: 'all-games', slideKey: BannerTypes.MOBILE_CASINO}
    },
    {
        path: 'games/my-favorites',
        loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
        data: {productName: 'my-favorites', slideKey: BannerTypes.MOBILE_CASINO}
    },
    {
        path: 'games/:typeId',
        loadChildren: () => import('./mobile-casino/mobile-casino.module').then(m => m.MobileCasinoModule),
        data: {slideKey: BannerTypes.MOBILE_CASINO}
    },
    {
        path: 'games/:category/:productId/:type/:openType',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'games/:category/:productId/:type',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'products/:id',
        loadChildren: () => import('./mobile-products/mobile-products.module').then(m => m.MobileProductsModule),
    },
    {
        path: 'products/:id/:productId/:type',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'products/:id/:productId/:type/:openType',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'category/:categoryId',
        data: {
            isActiveFooter: false,
            slideKey: BannerTypes.CASINO
        },
        loadChildren: () => import('./mobile-filter-game/mobile-filter-game.module').then(m => m.MobileFilterGameModule),
    },
    {
        path: 'category/:id/:productId/:type',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'category/:id/:productId/:type/:openType',
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'product/:productId/:type',
        canActivate:[OpenGameGuard],
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'product/:productId/:type/:openType',
        canActivate:[OpenGameGuard],
        loadChildren: () => import('./mobile-open-games/mobile-open-games.module').then(m => m.MobileOpenGamesModule),
        data: {backUrl: '/'}
    },
    {
        path: 'promotions',
        loadComponent: () =>import('../mobile/mobile-promotion-fragments/mobile-promotion-fragments.component').then(c => c.MobilePromotionFragmentsComponent)
    },
   /* {
        path: 'promotions/:id',
        loadChildren: () => import('./mobile-promotion/mobile-promotion.module').then(m => m.MobilePromotionModule),
    },*/
    {
        path: 'news',
        loadChildren: () => import('./mobile-news/mobile-all-news/mobile-all-news.module').then(m => m.MobileAllNewsModule),
        resolve: {data: PromotionNewsResolver},
    },
    {
        path: 'news/:id',
        loadChildren: () => import('./mobile-news/mobile-current-news/mobile-current-news.module').then(m => m.MobileCurrentNewsModule),
        resolve: {data: PromotionNewsResolver},
    },
    {
        path: 'user/1',
        data: {'roles': '1'},
        canLoad: [AccountPagesLoadGuard],
        loadChildren: () => import('../mobile/mobile-account-pages-module-type1/mobile-account-pages-module-type1.module').then(m => m.MobileAccountPagesModuleType1Module),
    },
    {
        path: 'user/2',
        data: {'roles': '2'},
        canLoad: [AccountPagesLoadGuard],
        loadChildren: () => import('../mobile/mobile-account-pages-module-type2/mobile-account-pages-module-type2.module').then(m => m.MobileAccountPagesModuleType2Module),
    },
    {
        path: 'character-hierarchy',
        loadComponent: () => import('./mobile-casino/mobile-character-hierarchy/mobile-character-hierarchy.component').then(m => m.MobileCharacterHierarchyComponent),
    },
    {
        path: 'contactus',
        loadChildren: () => import('./mobile-contact-us/mobile-contact-us.module').then(m => m.MobileContactUsModule),
    },
    {
        path: 'about-us',
        loadChildren: () => import('./mobile-about-us/mobile-about-us.module').then(m => m.MobileAboutUsModule),
    },
    {
        path: 'faq',
        data: {pageKey: 'Faq'},
        loadChildren: () => import('./mobile-faq/mobile-faq.module').then(m => m.MobileFaqModule),
    },
    {
        path: 'privacy',
        data: {pageKey: 'Privacy_policy'},
        loadChildren: () => import('./mobile-privacy/mobile-privacy.module').then(m => m.MobilePrivacyModule),
    },
    {
        path: 'terms',
        data: {pageKey: 'Terms_conditions'},
        loadChildren: () => import('./mobile-terms/mobile-terms.module').then(m => m.MobileTermsModule),
    },
    {
        path: 'login',
        loadChildren: () => import('./mobile-login/mobile-login.module').then(m => m.MobileLoginModule),
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./mobile-forgot-password/mobile-forgot-password.module').then(m => m.MobileForgotPasswordModule),
    },
    {
        path: 'info/:productId',
        loadChildren: () => import('./mobile-information/mobile-information.mobile').then(m => m.MobileInformationMobile),
    },
    {
        path: 'change-password',
        loadChildren: () => import('./mobile-forgot-password-recovery/mobile-forgot-password-recovery.module').then(m => m.MobileForgotPasswordRecoveryModule),
    },
    {
        path: 'verify',
        loadChildren: () => import('./email-verify/mobile-email-verify.module').then(m => m.MobileEmailVerifyModule),
    },
   {
        path: 'signup',
        loadChildren: () => import('./mobile-signup/mobile-signup.module').then(m => m.MobileSignupModule),
    },
    {
        path: 'affiliate',
        loadChildren:() => import('./mobile-affiliate/mobile-affiliate.module').then(m => m.MobileAffiliateModule),
    }
];

@NgModule({
    declarations: [
        MobileBottomSideBarComponent,
    ],
    imports: [
        DesktopMobileCommonModule,
        ToNumberPipeModule,
        LoaderModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MobileMainModule {
    constructor(private navigationService: NavigationService) {

    }
}
