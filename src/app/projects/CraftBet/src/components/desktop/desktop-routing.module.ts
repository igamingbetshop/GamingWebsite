import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppMainComponent} from './app-main/app-main.component';
import {AppCasinoComponent} from './app-casino/app-casino.component';
import {AppForgotPasswordComponent} from './app-forgot-password/app-forgot-password.component';
import {AppFilterGameComponent} from './app-filter-game/app-filter-game.component';
import {AppForgotPasswordRecoveryComponent} from './app-forgot-password-recovery/app-forgot-password-recovery.component';
import {ProductsResolve} from '../../../../../@core/services/resolves/products.service';
import {FaqComponent} from './faq/faq.component';
import {TermsConditionsComponent} from './terms-conditions/terms-conditions.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ParentCasinoComponent} from './parent-casino/parent-casino.component';
import {BannerTypes, FragmentPositions, MenuType} from "../../../../../@core/enums";
import {CharacterHierarchyComponent} from "./app-casino/character-hierarchy/character-hierarchy.component";
import {AllNewsComponent} from "./news/all-news/all-news.component";
import {CurrentNewsComponent} from "./news/current-news/current-news.component";
import {EmailVerifyComponent} from "./email-verify/email-verify.component";
import {ErrorPageComponent} from './error-page/error-page.component';
import {DefaultSportComponent} from './default-sport/default-sport.component';
import {CommonWindowComponent} from "./common-window/common-window.component";
import {InformationComponent} from './information/information.component';
import {AccountPagesLoadGuard} from "../../../../../@core/services/helpers/account-pages-load-guard";
import {CustomPathGuard} from "../../../../../@core/services/helpers/custom-path-guard";
import { ProductsListComponent } from './products-list/products-list.component';
import {NavigationService} from "../../../../../@core/services/app/navigation.service";
import {RegisterNavigateComponent} from "./register-navigate/register-navigate.component";
import {ConfigService} from "../../../../../@core/services";
import {AffiliateComponent} from "./affiliate/affiliate.component";
import {OpenGameGuard} from "../../../../../@core/services/helpers/open-game-guard";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {PaymentErrorComponent} from "./payment-error/payment-error.component";

const routes: Routes = [
    {
        path: '403-error',
        component: ErrorPageComponent
    },
    {
        path: '',
        component: AppMainComponent,
        children: [
            {
                path: 'home',
               /* component: AppHomepageComponent,
                data: {
                    isActiveFooter: false,
                    slideKey: BannerTypes.HOME,
                },*/
                loadChildren: () => import('../desktop/home/home.module').then(m => m.HomeModule),
                data: {
                    position:FragmentPositions.Home,
                    menuType:MenuType.LIVE_CASINO
                }
            },
            {
                path: 'forgot-password',
                component: AppForgotPasswordComponent
            },
            {
                path: 'sport/:sportType',
                component: DefaultSportComponent,
                data: {isActiveFooter: true, productId: 6, sportType: 1}
            },
            {
                path: 'lottery/:sportType',
                component: DefaultSportComponent,
                data: {isActiveFooter: true, productId: 1009}
            },
            {
                path: 'esport',
                component: DefaultSportComponent,
                data: {isActiveFooter: true, position: 'esports', productId: 6, sportType: 1}
            },
            {
                path: 'asianweb',
                component: DefaultSportComponent,
                data: {isActiveFooter: true, position: 'asianweb', productId: 6}
            },
            {
                path: 'asianweb/:type/:type',
                component: DefaultSportComponent,
                data: {isActiveFooter: true, position: 'asianweb', productId: 6}
            },
            {
                path: 'comparison',
                component: DefaultSportComponent,
                data: {isActiveFooter: true, position: 'comparison', productId: 1100}
            },
            {
                path: 'info/:name',
                component: InformationComponent
            },
            {
                path: 'livecasino',
                component: ParentCasinoComponent,
                data: {isActiveFooter: false, position:FragmentPositions.LiveCasino},
                children: [
                    {
                        path: '',
                        redirectTo: 'all-games',
                        pathMatch: 'full'
                    },
                    {
                        path: ':category/:productId/:type/:openType',
                        component: CommonWindowComponent,
                        data: {isActiveFooter: false, position: FragmentPositions.LiveCasino,}
                    },
                    {
                        path: ':typeId',
                        component: AppCasinoComponent,
                        data: {
                            isActiveFooter: false,
                            position:FragmentPositions.LiveCasino,
                            menuType:MenuType.LIVE_CASINO
                        }
                    }
                ]
            },
            {
                path: 'affiliate',
                component: AffiliateComponent
            },
            {
                path: 'casino',
                component: ParentCasinoComponent,
                data: {isActiveFooter: false, slideKey: BannerTypes.CASINO},
                children: [
                    {
                        path: '',
                        redirectTo: 'all-games',
                        pathMatch: 'full'
                    },
                    {
                        path: '0',
                        redirectTo: 'my-favorites',
                        pathMatch: 'full'
                    },
                    /*{
                        path: 'all-games',
                        component: AppCasinoComponent,
                        data: {
                            isActiveFooter: false,
                            slideKey: BannerTypes.CASINO,
                            position:FragmentPositions.Casino,
                            menuType:MenuType.CASINO_MENU
                        }
                    },*/
                    {
                        path: ':category/:productId/:type/:openType',
                        canActivate:[OpenGameGuard],
                        component: CommonWindowComponent,
                        data: {isActiveFooter: false, position: FragmentPositions.Casino}
                    },
                    {
                        path: ':typeId',
                        component: AppCasinoComponent,
                        data: {
                            isActiveFooter: false,
                            slideKey: BannerTypes.CASINO,
                            position:FragmentPositions.Casino,
                            menuType:MenuType.CASINO_MENU
                        }
                    },
                    {
                        path: 'my-favorites',
                        component: AppCasinoComponent,
                        data: {
                            isActiveFooter: false,
                            productName: 'my-favorites',
                            slideKey: BannerTypes.CASINO
                        }
                    }
                ]
            },
            {
                path: 'character-hierarchy',
                component: CharacterHierarchyComponent,
            },
            {
                path: 'games',
                component: ParentCasinoComponent,
                data: {isActiveFooter: false, slideKey: BannerTypes.CASINO},
                children: [
                    {
                        path: '',
                        redirectTo: 'all-games',
                        pathMatch: 'full'
                    },
                    {
                        path: '0',
                        redirectTo: 'my-favorites',
                        pathMatch: 'full'
                    },
                    {
                        path: 'all-games',
                        component: AppCasinoComponent,
                        data: {
                            isActiveFooter: false,
                            slideKey: BannerTypes.CASINO
                        }
                    },
                    {
                        path: ':category/:productId/:type/:openType',
                        component: CommonWindowComponent,
                        data: {isActiveFooter: false, backUrl: "/games/all-games"}
                    },
                    {
                        path: ':typeId',
                        component: AppCasinoComponent,
                        data: {
                            isActiveFooter: false,
                            slideKey: BannerTypes.CASINO
                        }
                    },
                    {
                        path: 'my-favorites',
                        component: AppCasinoComponent,
                        data: {
                            isActiveFooter: false,
                            productName: 'my-favorites',
                            slideKey: BannerTypes.CASINO
                        }
                    }
                ]
            },
            {
                path: 'category/:categoryId',
                component: AppFilterGameComponent,
                data: {
                    isActiveFooter: false,
                    slideKey: BannerTypes.CASINO
                }
            },
            {
                path: 'category/:id/:productId/:type/:openType',
                component: CommonWindowComponent,
                data: {
                    isActiveFooter: false,
                    slideKey: BannerTypes.CASINO
                }
            },
            {
                path: 'product/:productId/:type',
                canActivate:[OpenGameGuard],
                component: CommonWindowComponent,
                data: {isActiveFooter: false}
            },
            {
                path: 'product/:productId/:type/:openType',
                canActivate:[OpenGameGuard],
                component: CommonWindowComponent,
                data: {isActiveFooter: false}
            },
            {
              path: 'products/:id',
              component: ProductsListComponent
            },
            {
                path: 'products/:id/:productId/:type/:openType',
                component: CommonWindowComponent,
                canActivate:[OpenGameGuard],
                data: {isActiveFooter: false, backUrl: "/games/all-games"}
            },
            {
                path: 'products/:id/:productId/:type',
                canActivate:[OpenGameGuard],
                component: CommonWindowComponent,
            },
           /* {
                path: ':category/:productId/:type/:openType',
                component: CommonWindowComponent,
                data: {isActiveFooter: false, backUrl: "/games/all-games"}
            },*/
            {
                path: 'slots',
                component: AppFilterGameComponent,
                data: {isActiveFooter: false, productName: 'classic-slots', url_data: 'classic-slots'},
                resolve: {
                    items: ProductsResolve
                }
            },
            {
                path: 'change-password',
                component: AppForgotPasswordRecoveryComponent
            },
            {
                path: 'verify',
                component: EmailVerifyComponent
            },
            {
                path: 'promotions',
                loadComponent: () =>import('../desktop/promotion-fragments/promotion-fragments.component').then(c => c.PromotionFragmentsComponent)
            },
           /* {
                path: 'promotions/:id',
                component: PromotionComponent,
            },*/
            {
                path: 'news',
                component: AllNewsComponent,
            },
            {
                path: 'news/:id',
                component: CurrentNewsComponent,
            },
            {
                path: 'terms',
                component: TermsConditionsComponent,
                data: {pageKey: 'Terms_conditions'}
            },
            {
                path: 'faq',
                component: FaqComponent,
                data: {pageKey: 'Faq'}
            },
            {
                path: 'privacy',
                component: PrivacyPolicyComponent,
                data: {pageKey: 'Privacy_policy'}
            },
            {
                path: 'contacts',
                component: ContactUsComponent
            },
            {
                path: 'payment-error',
                component: PaymentErrorComponent
            },
            {
                path: 'about-us',
                component: AboutUsComponent
            },
            {
                path: 'user/1',
                data: {'roles': '1'},
                canLoad: [AccountPagesLoadGuard],
                loadChildren: () => import('../desktop/account-pages-module-type1/account-pages-module-type1.module').then(m => m.AccountPagesModuleType1Module),
            },
            {
                path: 'user/2',
                data: {'roles': '2'},
                canLoad: [AccountPagesLoadGuard],
                loadChildren: () => import('../desktop/account-pages-module-type2/account-pages-module-type2.module').then(m => m.AccountPagesModuleType2Module)
            },
            {
                path: 'signup',
                component:RegisterNavigateComponent
            },
            {
                path: 'register',
                component:RegisterPageComponent
            },
        ]
    },
    {
        path: 'custom',
        loadChildren: () => import('../desktop/custom-block/custom-block.module').then(m => m.CustomBlockModule),
        data: {'roles': 'custom'},
        canLoad: [CustomPathGuard]
    },
    {
        path: '**',
        redirectTo: localStorage.getItem('defaultRoute') || '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DesktopRoutingModule
{
    constructor(private navigationService:NavigationService, private configService:ConfigService)
    {

    }
}
