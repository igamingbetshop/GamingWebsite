import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {DesktopMobileCommonModule} from '../common/common.module';
import {DesktopRoutingModule} from './desktop-routing.module';
import {ThemeModule} from '../../../../../@theme/theme.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {AppMainComponent} from './app-main/app-main.component';
import {AppCasinoComponent} from './app-casino/app-casino.component';
import {AppLoginComponent} from './app-login/app-login.component';
import {AppRegistrationComponent} from './app-registration/app-registration.component';
import {AppHeaderComponent} from './app-header/app-header.component';
import {AppFooterComponent} from './app-footer/app-footer.component';
import {AppForgotPasswordComponent} from './app-forgot-password/app-forgot-password.component';
import {AppConfirmComponent} from './app-confirm/app-confirm.component';
import {AppFilterGameComponent} from './app-filter-game/app-filter-game.component';
import {AppForgotPasswordRecoveryComponent} from './app-forgot-password-recovery/app-forgot-password-recovery.component';
import {AppOpenGamesComponent} from './app-open-games/app-open-games.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {AppLiveCasinoComponent} from './app-live-casino/app-live-casino.component';
import {AppOpenTicketComponent} from './app-open-ticket/app-open-ticket.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {FaqComponent} from './faq/faq.component';
import {TermsConditionsComponent} from './terms-conditions/terms-conditions.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ParentCasinoComponent} from './parent-casino/parent-casino.component';
import {AllNewsComponent} from "./news/all-news/all-news.component";
import {CurrentNewsComponent} from "./news/current-news/current-news.component";
import {EmailVerifyComponent} from "./email-verify/email-verify.component";


import {ErrorPageComponent} from './error-page/error-page.component';
import {DefaultSportComponent} from './default-sport/default-sport.component';
import {FullWindowComponent} from './full-window/full-window.component';
import {AppHomepageComponent} from './app-homepage/app-homepage.component';
import {CommonWindowComponent} from "./common-window/common-window.component";
import {InformationComponent} from './information/information.component';
import {NgxPrintModule} from 'ngx-print';
import {AddBankAccountComponent} from "./add-bank-account/add-bank-account.component";
import {PaymentsListComponent} from './payments-list/payments-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginButtonModule} from "../../../../../@theme/components/global-login-btn/login-button.module";
import {GlobalSignUpBtnModule} from "../../../../../@theme/components/global-sign-up-btn/global-sign-up-btn.module";
import {TicketsModule} from "../../../../../@theme/components/global-tickets/tickets.module";
import {GlobalAccountPagesDpdModule} from "../../../../../@theme/components/global-account-pages-dpd/global-account-pages-dpd.module";
import {GlobalLogoutModule} from "../../../../../@theme/components/global-logout/global-logout.module";
import {LanguageModule} from "../../../../../@theme/components/global-language/language.module";
import {BannersModule} from "../common/common-banner/banners.module";
import {FilterByTypePipeModule} from "../../../../../@theme/pipes/filter-by-type/filter-by-type-pipe.module";
import {OrderByPipeModule} from "../../../../../@theme/pipes/order-by/order-by-pipe.module";
import {ToNumberPipeModule} from "../../../../../@theme/pipes/to-number/to-number-pipe.module";
import { DropdownDirectiveModule } from '../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { CollapseDirectiveModule } from '../../../../../@theme/directives/collapse/collapse-directive.module';
import {SanitizerModule} from "../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {FunctionalBtnModule} from "../../../../../@theme/components/functional-btn/functional-btn.module";
import {CasinoBannersModule} from "./app-casino/banners/casino-banners.module";
import {WinnersWidgetModule} from "./fragments/winners-widget/winners-widget.module";
import {CasinoMenuModule} from "./app-casino/menu/casino-menu.module";
import {CasinoProvidersModule} from "./app-casino/providers/casino-providers.module";
import {CasinoCategoryModule} from "./app-casino/category/casino-category.module";
import {CasinoSearchModule} from "./app-casino/search/casino-search.module";
import {SecurityQuestionsModule} from "./app-registration/security-questions/security-questions.module";
import {FileTypeModule} from "./app-registration/file/file-type.module";
import {VerifyCodeModule} from "./app-registration/verify-code/verify-code..module";
import {RegExpInputDirectiveModule} from "../../../../../@theme/directives/reg-exp-input/reg-exp-input-directive.module";
import { AffiliateComponent } from './affiliate/affiliate.component';
import {
    FilterMobileCodePipeModule
} from "../../../../../@theme/pipes/filter-by-mobile-code/filter-mobile-code-pipe.module";
import {PaymentControllerService} from "../../../../../@core/services/app/paymentController.services";
import {BonusesService} from "../../../../../@core/services/api/bonuses.service";
import {GetPaymentsService} from "../../../../../@core/services/app/getPayments.service";
import {BetsService} from "../../../../../@core/services/app/bets.services";
import {AccountPageType2BalanceModule} from "./account-pages-module-type2/balance/account-page-type2-balance.module";
import {ZoomBtnModule} from "../../../../../@theme/components/zoom-btn/zoom-btn.module";
import {SessionTimerModule} from "../../../../../@theme/components/session-timer/session-timer.module";
import {MarqueeAnimationDirectiveModule} from "../../../../../@theme/directives/marquee-animation/marquee-animation-directive.module";
import {ChatOpenerComponent} from "./chat-opener/chat-opener.component";
import {ProgressBarModule} from "./app-casino/progress-bar/progress-bar.module";
import {TimeComponent} from "./time/time.component";
import {CharacterHierarchyComponent} from "./app-casino/character-hierarchy/character-hierarchy.component";
import { BalanceComponent } from './balance/balance.component';
import {RegisterPageComponent} from "./register-page/register-page.component";
import { PaymentErrorComponent } from './payment-error/payment-error.component';
import {LoaderComponent} from "../common/loader/loader.component";
import {NgxMaskDirective} from "ngx-mask";
import {DefaultImageFallBackDirective} from "../../../../../@theme/directives/default-image-fall-back.directive";
import {PointerOnLinkDirective} from "../../../../../@theme/directives/pointer-on-link/pointer-on-link.directive";
import {SlotTournamentComponent} from "./app-casino/slot-tournament/slot-tournament.component";
import {ClientsComponent} from "../../../../../@theme/components/clients/clients.component";
import {SpinWheelOpenerComponent} from "./fragments/spin-wheel-opener/spin-wheel-opener.component";
import {SearchOpenerComponent} from "./search-opener/search-opener.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AccountStatementComponent} from "./account-statement/account-statement.component";
import {
    ProfileImageIconComponent
} from "../../../../../@theme/components/profile/profile-image-icon/profile-image-icon.component";
import {DarkLightComponent} from "../../../../../@theme/components/dark-light/dark-light.component";
import {JackpotModule} from "./fragments/jackpot/jackpot.module";


@NgModule({ exports: [PaymentsListComponent, AddBankAccountComponent, UserInfoComponent, BalanceComponent],
    declarations: [
        AppMainComponent,
        AppCasinoComponent,
        AppLoginComponent,
        AppRegistrationComponent,
        AppHeaderComponent,
        AppFooterComponent,
        AppForgotPasswordComponent,
        AppConfirmComponent,
        AppFilterGameComponent,
        AppForgotPasswordRecoveryComponent,
        AppOpenGamesComponent,
        AppLiveCasinoComponent,
        AppOpenTicketComponent,
        UserInfoComponent,
        AddBankAccountComponent,
        FaqComponent,
        TermsConditionsComponent,
        AboutUsComponent,
        ContactUsComponent,
        PrivacyPolicyComponent,
        ParentCasinoComponent,
        AllNewsComponent,
        CurrentNewsComponent,
        EmailVerifyComponent,
        ErrorPageComponent,
        DefaultSportComponent,
        FullWindowComponent,
        AppHomepageComponent,
        CommonWindowComponent,
        InformationComponent,
        PaymentsListComponent,
        ProductsListComponent,
        AffiliateComponent,
        ChatOpenerComponent,
        BalanceComponent,
        RegisterPageComponent,
        PaymentErrorComponent,
        LoginPageComponent
    ],
    imports: [DesktopMobileCommonModule,
        PointerOnLinkDirective,
        DesktopRoutingModule,
        ThemeModule,
        TranslateModule.forChild(),
        FontAwesomeModule,
        NgxPaginationModule,
        SlickCarouselModule,
        NgxPrintModule,
        ReactiveFormsModule,
        FormsModule,
        LoginButtonModule,
        GlobalSignUpBtnModule,
        TicketsModule,
        GlobalAccountPagesDpdModule,
        GlobalLogoutModule,
        LanguageModule,
        BannersModule,
        FilterByTypePipeModule,
        OrderByPipeModule,
        ToNumberPipeModule,
        DropdownDirectiveModule,
        FunctionalBtnModule,
        ZoomBtnModule,
        CollapseDirectiveModule,
        SanitizerModule,
        CasinoBannersModule,
        WinnersWidgetModule,
        CasinoMenuModule,
        CasinoProvidersModule,
        CasinoCategoryModule,
        CasinoSearchModule,
        SecurityQuestionsModule,
        FileTypeModule,
        VerifyCodeModule,
        RegExpInputDirectiveModule,
        FilterMobileCodePipeModule,
        MarqueeAnimationDirectiveModule,
        AccountPageType2BalanceModule,
        SessionTimerModule,
        ProgressBarModule,
        TimeComponent,
        CharacterHierarchyComponent,
        LoaderComponent,
        NgxMaskDirective,
        DefaultImageFallBackDirective,
        SlotTournamentComponent,
        ClientsComponent,
        SpinWheelOpenerComponent,
        SearchOpenerComponent,
        AccountStatementComponent,
        ProfileImageIconComponent,
        DarkLightComponent, JackpotModule], providers: [PaymentControllerService, BonusesService, GetPaymentsService, BetsService, provideHttpClient(withInterceptorsFromDi())] })
export class DesktopModule
{
}
