import {NgModule} from '@angular/core';
import {DesktopMobileCommonModule} from '../common/common.module';
import {MobileRoutingModule} from './mobile-routing.module';

import {LayoutService} from "../../../../../@core/services/app/layout.service";
import {MobileMainComponent} from "./mobile-main/mobile-main.component";
import {MobileLeftSidebarComponent} from "./mobile-left-sidebar/mobile-left-sidebar.component";
import {MobileRightSidebarComponent} from "./mobile-right-sidebar/mobile-right-sidebar.component";
import {MobileHeaderComponent} from "./mobile-header/mobile-header.component";
import {CustomSidebarComponent} from "../../../../../@theme/components";
import {ToNumberPipeModule} from "../../../../../@theme/pipes/to-number/to-number-pipe.module";
import { CollapseDirectiveModule } from '../../../../../@theme/directives/collapse/collapse-directive.module';

import {loadExternalStyles} from "../../../../../@core/utils";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownDirectiveModule} from "../../../../../@theme/directives/dropdown/dropdown-directive.module";
import {MobileAccountPageType2BalanceModule} from "./mobile-account-pages-module-type2/balance/mobile-account-page-type2-balance.module";
import {PaymentControllerService} from "../../../../../@core/services/app/paymentController.services";
import {BonusesService} from "../../../../../@core/services/api/bonuses.service";
import {FunctionalBtnModule} from "../../../../../@theme/components/functional-btn/functional-btn.module";
import {LanguageModule} from "../../../../../@theme/components/global-language/language.module";
import {MobileFooterComponent} from "./mobile-footer/mobile-footer.component";
import {SpinWheelOpenerComponent} from "../desktop/fragments/spin-wheel-opener/spin-wheel-opener.component";


@NgModule({
    imports: [
        DesktopMobileCommonModule,
        MobileRoutingModule,
        ToNumberPipeModule,
        CollapseDirectiveModule,
        /*TO DO REMOVE AFTER RESOLVE OPEN TICKETS*/
        ReactiveFormsModule,
        FunctionalBtnModule,
        DropdownDirectiveModule,
        MobileAccountPageType2BalanceModule,
        LanguageModule,
        MobileFooterComponent,
        SpinWheelOpenerComponent
    ],

    providers: [
        LayoutService,
        PaymentControllerService,
        BonusesService
    ],
    declarations: [
        MobileMainComponent,
        MobileLeftSidebarComponent,
        MobileRightSidebarComponent,
        MobileHeaderComponent,
        CustomSidebarComponent
    ]
})
export class MobileModule
{
    constructor()
    {
        loadExternalStyles('mobile.css' + '?=' + window['VERSION']).then(data => {

        });
    }
}
