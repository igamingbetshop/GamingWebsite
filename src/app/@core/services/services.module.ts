import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
    LoaderService,
    DataService,
    AuthService,
    UserDataService,
    DefaultService,
    SharedService,
    ConfigService,
    MenuService,
    ProductsResolve,
    LiveGamesResolve,
    LocalStorageService,
    SaveData,
    PaymentsService
} from './index';

import {TicketsService} from "@core/services/api/tickets.service";
import {BalanceService} from "@core/services/api/balance.service";
import {BannersService} from "@core/services/api/banners.service";
import {VerificationService} from "@core/services/api/verification.service";
import {TranslationService} from "@core/services/api/translation.service";
import {BaseApiService} from "@core/services/api/base-api.service";
import {FavoritesService} from "@core/services/api/favorites.service";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {VirtualGamesResolve} from "@core/services/resolves/virtual_games.service";
import {OpenGamesService} from "@core/services/app/openGames.service";
import {CheckGameTypeService} from "@core/services/app/checkGameType.service";
import {PromotionNewsResolver} from "@core/services/resolves/promotion-news-resolver";
import {GetSettingsInfoService} from '@core/services/app/getSettingsInfo.service';
import {SignalRService} from "@core/services/soket/signal-r.service";
import {PopupsService} from '@core/services/app/popups.service';
import {AccountPagesLoadGuard} from "@core/services/helpers/account-pages-load-guard";
import {CustomPathGuard} from "@core/services/helpers/custom-path-guard";
import {BaseService} from "@core/services/app/base.service";
import {LogoutHelper} from "@core/services/helpers/logout.helper";
import {GetJackpotService} from "@core/services/api/getJackpot.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {UserRegisterService} from "@core/services/app/userRegister.service";
import {GamesUrlService} from "@core/services/app/gamesUrl.service";
import {UtilityService} from "@core/services/app/utility.service";
import {NavigationService} from "@core/services/app/navigation.service";
import {LangService} from "@core/services/app/lang.service";
import {AuthGuard} from "@core/services/helpers/auth-guard";
import {CasinoFilterService} from "@core/services/app/casino-filter.service";
import {StateService} from "@core/services/app/state.service";
import {OpenGameGuard} from "@core/services/helpers/open-game-guard";

const SERVICES = [
    LoaderService,
    DataService,
    AuthService,
    UserDataService,
    LangService,
    DefaultService,
    SharedService,
    UtilityService,
    ConfigService,
    BaseControllerService,/*check*/
    MenuService,
    BaseService,
    ProductsResolve,
    LiveGamesResolve,
    VirtualGamesResolve,
    PromotionNewsResolver,
    LocalStorageService,
    LogoutHelper,
    UserLogined,
    UserRegisterService,
    SaveData,
    PaymentsService,
    OpenGamesService,
    TicketsService,
    BalanceService,
    BannersService,
    VerificationService,
    GetJackpotService,
    GamesUrlService,
    CasinoFilterService,
    CheckGameTypeService,
    TranslationService,
    BaseApiService,
    FavoritesService,
    GetSettingsInfoService,
    SignalRService,
    PopupsService,
    AccountPagesLoadGuard,
    CustomPathGuard,
    NavigationService,
    AuthGuard,
    StateService,
    OpenGameGuard
];

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ...SERVICES,
    ],
})
export class ServicesModule {
    static forRoot(): ModuleWithProviders<ServicesModule> {
        return {
            ngModule: ServicesModule,
            providers: [
                ...SERVICES
            ],
        };
    }
}
