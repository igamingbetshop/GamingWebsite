import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

import {MobileWithdrawBlockRoutingModule} from "./withdraw-block-routing.module";
import {MobileWithdrawBlockDefaultComponent} from "./withdraw-block-default/mobile-withdraw-block-default.component";

import {MobileWithdrawType1Component} from "./withdraw-payments/withdraw-type1/mobile-withdraw-type1.component";
import {MobileWithdrawType2Component} from "./withdraw-payments/withdraw-type2/mobile-withdraw-type2.component";
import {MobileWithdrawType3Component} from "./withdraw-payments/withdraw-type3/mobile-withdraw-type3.component";
import {MobileWithdrawType4Component} from "./withdraw-payments/withdraw-type4/mobile-withdraw-type4.component";
import {MobileWithdrawType5Component} from "./withdraw-payments/withdraw-type5/mobile-withdraw-type5.component";
import {MobileWithdrawType6Component} from "./withdraw-payments/withdraw-type6/mobile-withdraw-type6.component";
import {MobileWithdrawType7Component} from "./withdraw-payments/withdraw-type7/mobile-withdraw-type7.component";
import {MobileWithdrawType8Component} from "./withdraw-payments/withdraw-type8/mobile-withdraw-type8.component";
import {MobileWithdrawType1DefaultComponent} from "./withdraw-payments/withdraw-type1/withdraw-type1-default/mobile-withdraw-type1-default.component";
import {MobileWithdrawType2DefaultComponent} from "./withdraw-payments/withdraw-type2/withdraw-type2-default/mobile-withdraw-type2-default.component";
import {MobileWithdrawType3DefaultComponent} from "./withdraw-payments/withdraw-type3/withdraw-type3-default/mobile-withdraw-type3-default.component";
import {MobileWithdrawType4DefaultComponent} from "./withdraw-payments/withdraw-type4/withdraw-type4-default/mobile-withdraw-type4-default.component";
import {MobileWithdrawType5DefaultComponent} from "./withdraw-payments/withdraw-type5/withdraw-type5-default/mobile-withdraw-type5-default.component";
import {MobileWithdrawType6DefaultComponent} from "./withdraw-payments/withdraw-type6/withdraw-type6-default/mobile-withdraw-type6-default.component";
import {MobileWithdrawType7DefaultComponent} from "./withdraw-payments/withdraw-type7/withdraw-type7-default/mobile-withdraw-type7-default.component";
import {MobileWithdrawType8DefaultComponent} from "./withdraw-payments/withdraw-type8/withdraw-type8-default/mobile-withdraw-type8-default.component";
import {MobileWithdrawType9Component} from "./withdraw-payments/withdraw-type9/mobile-withdraw-type9.component";
import {MobileWithdrawType9DefaultComponent} from "./withdraw-payments/withdraw-type9/withdraw-type9-default/mobile-withdraw-type9-default.component";
import {MobileWithdrawType10Component} from "./withdraw-payments/withdraw-type10/mobile-withdraw-type10.component";
import {MobileWithdrawType10DefaultComponent} from "./withdraw-payments/withdraw-type10/withdraw-type10-default/mobile-withdraw-type10-default.component";
import {MobileWithdrawType11Component} from "./withdraw-payments/withdraw-type11/mobile-withdraw-type11.component";
import {MobileWithdrawType12Component} from "./withdraw-payments/withdraw-type12/mobile-withdraw-type12.component";
import {MobileWithdrawType13Component} from "./withdraw-payments/withdraw-type13/mobile-withdraw-type13.component";
import {MobileWithdrawType13DefaultComponent} from "./withdraw-payments/withdraw-type13/withdraw-type13-default/mobile-withdraw-type13-default.component";
import {MobileWithdrawType12DefaultComponent} from "./withdraw-payments/withdraw-type12/withdraw-type12-default/mobile-withdraw-type12-default.component";
import {MobileWithdrawType11DefaultComponent} from "./withdraw-payments/withdraw-type11/withdraw-type11-default/mobile-withdraw-type11-default.component";
import {MobileWithdrawType14Component} from "./withdraw-payments/withdraw-type14/mobile-withdraw-type14.component";
import {MobileWithdrawType14DefaultComponent} from "./withdraw-payments/withdraw-type14/withdraw-type14-default/mobile-withdraw-type14-default.component";
import {MobileWithdrawType15Component} from "./withdraw-payments/withdraw-type15/mobile-withdraw-type15.component";
import {MobileWithdrawType15DefaultComponent} from "./withdraw-payments/withdraw-type15/withdraw-type15-default/mobile-withdraw-type15-default.component";
import {MobileWithdrawType16Component} from "./withdraw-payments/withdraw-type16/mobile-withdraw-type16.component";
import {MobileWithdrawType16DefaultComponent} from "./withdraw-payments/withdraw-type16/withdraw-type16-default/mobile-withdraw-type16-default.component";
import {MobileWithdrawType17Component} from "./withdraw-payments/withdraw-type17/mobile-withdraw-type17.component";
import {MobileWithdrawType17DefaultComponent} from "./withdraw-payments/withdraw-type17/withdraw-type17-default/mobile-withdraw-type17-default.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MobileWithdrawType18DefaultComponent} from "./withdraw-payments/withdraw-type18/withdraw-type18-default/mobile-withdraw-type18-default.component";
import {MobileWithdrawType18Component} from "./withdraw-payments/withdraw-type18/mobile-withdraw-type18.component";
import {ThemeModule} from "../../../../../../../@theme/theme.module";
import {DesktopMobileCommonModule} from "../../../common/common.module";
import {CommonPaymentNominalsModule} from "../../../common/app-common-payment-nominals/common-payment-nominals.module";
import {CommonAccountsModule} from "../../../common/common-accounts/common-accounts.module";
import {PaymentsModule} from "../../../../../../../@core/modules/payments.module";
import {CollapseDirectiveModule} from "../../../../../../../@theme/directives/collapse/collapse-directive.module";
import {MobileWithdrawType19Component} from "./withdraw-payments/withdraw-type19/mobile-withdraw-type19.component";
import {MobileWithdrawType19DefaultComponent} from "./withdraw-payments/withdraw-type19/withdraw-type19-default/mobile-withdraw-type19-default.component";
import {MobileWithdrawType20Component} from "./withdraw-payments/withdraw-type20/mobile-withdraw-type20.component";
import {MobileWithdrawType20DefaultComponent} from "./withdraw-payments/withdraw-type20/withdraw-type20-default/mobile-withdraw-type20-default.component";
import {MobileWithdrawType22Component} from "./withdraw-payments/withdraw-type22/mobile-withdraw-type22.component";
import {
    MobileWithdrawType22DefaultComponent
} from "./withdraw-payments/withdraw-type22/withdraw-type22-default/mobile-withdraw-type22-default.component";
import {MobileWithdrawType25Component} from "./withdraw-payments/withdraw-type25/mobile-withdraw-type25.component";
import {
    MobileWithdrawType25DefaultComponent
} from "./withdraw-payments/withdraw-type25/withdraw-type25-default/mobile-withdraw-type25-default.component";
import {MobileWithdrawType24Component} from "./withdraw-payments/withdraw-type24/mobile-withdraw-type24.component";
import {
    MobileWithdrawType24DefaultComponent
} from "./withdraw-payments/withdraw-type24/withdraw-type24-default/mobile-withdraw-type24-default.component";
import {LoaderComponent} from "../../../common/loader/loader.component";


@NgModule({
  declarations: [
    MobileWithdrawBlockDefaultComponent,
    MobileWithdrawType1Component,
    MobileWithdrawType2Component,
    MobileWithdrawType3Component,
    MobileWithdrawType4Component,
    MobileWithdrawType5Component,
    MobileWithdrawType6Component,
    MobileWithdrawType7Component,
    MobileWithdrawType8Component,
    MobileWithdrawType1DefaultComponent,
    MobileWithdrawType2DefaultComponent,
    MobileWithdrawType3DefaultComponent,
    MobileWithdrawType4DefaultComponent,
    MobileWithdrawType5DefaultComponent,
    MobileWithdrawType6DefaultComponent,
    MobileWithdrawType7DefaultComponent,
    MobileWithdrawType8DefaultComponent,
    MobileWithdrawType9Component,
    MobileWithdrawType9DefaultComponent,
    MobileWithdrawType10Component,
    MobileWithdrawType10DefaultComponent,
    MobileWithdrawType11Component,
    MobileWithdrawType11DefaultComponent,
    MobileWithdrawType12Component,
    MobileWithdrawType12DefaultComponent,
    MobileWithdrawType13Component,
    MobileWithdrawType13DefaultComponent,
    MobileWithdrawType14Component,
    MobileWithdrawType14DefaultComponent,
    MobileWithdrawType15Component,
    MobileWithdrawType15DefaultComponent,
    MobileWithdrawType16Component,
    MobileWithdrawType16DefaultComponent,
    MobileWithdrawType17Component,
    MobileWithdrawType18Component,
    MobileWithdrawType17DefaultComponent,
    MobileWithdrawType18DefaultComponent,
    MobileWithdrawType19Component,
    MobileWithdrawType19DefaultComponent,
    MobileWithdrawType20Component,
    MobileWithdrawType20DefaultComponent,
    MobileWithdrawType22Component,
    MobileWithdrawType22DefaultComponent,
    MobileWithdrawType24Component,
    MobileWithdrawType24DefaultComponent,
    MobileWithdrawType25Component,
    MobileWithdrawType25DefaultComponent
  ],
    imports: [
        CommonModule,
        MobileWithdrawBlockRoutingModule,
        ReactiveFormsModule,
        LoaderComponent,
        FormsModule,
        TranslateModule,
        ThemeModule,
        DesktopMobileCommonModule,
        CommonPaymentNominalsModule,
        CommonAccountsModule,
        PaymentsModule,
        CollapseDirectiveModule
    ],
})
export class MobileWithdrawBlockModule {
}
