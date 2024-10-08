import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {ThemeModule} from "../../../../../../@theme/theme.module";


import {DesktopMobileCommonModule} from "../../common/common.module";
import {MobileDepositType1Component} from "./deposit-payments/deposit-type1/mobile-deposit-type1.component";
import {MobileDepositType1DefaultComponent} from "./deposit-payments/deposit-type1/deposit-type1-default/mobile-deposit-type1-default.component";
import {MobileDepositType2Component} from "./deposit-payments/deposit-type2/mobile-deposit-type2.component";
import {MobileDepositType2DefaultComponent} from "./deposit-payments/deposit-type2/deposit-type2-default/mobile-deposit-type2-default.component";
import {MobileDepositType3Component} from "./deposit-payments/deposit-type3/mobile-deposit-type3.component";
import {MobileDepositType4Component} from "./deposit-payments/deposit-type4/mobile-deposit-type4.component";
import {MobileDepositType5Component} from "./deposit-payments/deposit-type5/mobile-deposit-type5.component";
import {MobileDepositType6Component} from "./deposit-payments/deposit-type6/mobile-deposit-type6.component";
import {MobileDepositType7Component} from "./deposit-payments/deposit-type7/mobile-deposit-type7.component";
import {MobileDepositType8Component} from "./deposit-payments/deposit-type8/mobile-deposit-type8.component";
import {MobileDepositType9Component} from "./deposit-payments/deposit-type9/mobile-deposit-type9.component";
import {MobileDepositType3DefaultComponent} from "./deposit-payments/deposit-type3/deposit-type3-default/mobile-deposit-type3-default.component";
import {MobileDepositType4DefaultComponent} from "./deposit-payments/deposit-type4/deposit-type4-default/mobile-deposit-type4-default.component";
import {MobileDepositType5DefaultComponent} from "./deposit-payments/deposit-type5/deposit-type5-default/mobile-deposit-type5-default.component";
import {MobileDepositType6DefaultComponent} from "./deposit-payments/deposit-type6/deposit-type6-default/mobile-deposit-type6-default.component";
import {MobileDepositType7DefaultComponent} from "./deposit-payments/deposit-type7/deposit-type7-default/mobile-deposit-type7-default.component";
import {MobileDepositType8DefaultComponent} from "./deposit-payments/deposit-type8/deposit-type8-default/mobile-deposit-type8-default.component";
import {MobileDepositType9DefaultComponent} from "./deposit-payments/deposit-type9/deposit-type9-default/mobile-deposit-type9-default.component";
import {MobileDepositType10DefaultComponent} from "./deposit-payments/deposit-type10/deposit-type10-default/mobile-deposit-type10-default.component";
import {MobileDepositType10Component} from "./deposit-payments/deposit-type10/mobile-deposit-type10.component";
import {MobileDepositType11Component} from "./deposit-payments/deposit-type11/mobile-deposit-type11.component";
import {MobileDepositType11DefaultComponent} from "./deposit-payments/deposit-type11/deposit-type11-default/mobile-deposit-type11-default.component";
import {MobileDepositBlockRoutingModule} from "./deposit-block-routing.module";
import {MobileDepositBlockDefaultComponent} from "./deposit-block-default/mobile-deposit-block-default.component";
import {MobileDepositType13Component} from "./deposit-payments/deposit-type13/mobile-deposit-type13.component";
import {MobileDepositType13DefaultComponent} from "./deposit-payments/deposit-type13/deposit-type13-default/mobile-deposit-type13-default.component";
import {MobileDepositType14Component} from "./deposit-payments/deposit-type14/mobile-deposit-type14.component";
import {MobileDepositType14DefaultComponent} from "./deposit-payments/deposit-type14/deposit-type14-default/mobile-deposit-type14-default.component";
import {CommonBonusesModule} from "../../common/app-common-bonuses/common-bonuses.module";
import {CommonPaymentNominalsModule} from "../../common/app-common-payment-nominals/common-payment-nominals.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MobileDepositType15Component} from "./deposit-payments/deposit-type15/mobile-deposit-type15.component";
import {MobileDepositType15DefaultComponent} from "./deposit-payments/deposit-type15/deposit-type15-default/mobile-deposit-type15-default.component";
import {MobileDepositType16Component} from "./deposit-payments/deposit-type16/mobile-deposit-type16.component";
import {MobileDepositType16DefaultComponent} from "./deposit-payments/deposit-type16/deposit-type16-default/mobile-deposit-type16-default.component";
import {PaymentsModule} from "../../../../../../@core/modules/payments.module";
import {MobileDepositType17Component} from "./deposit-payments/deposit-type17/mobile-deposit-type17.component";
import {
  MobileDepositType17DefaultComponent
} from "./deposit-payments/deposit-type17/deposit-type17-default/mobile-deposit-type17-default.component";
import {QRCodeModule} from "angularx-qrcode";
import {LoaderComponent} from "../../common/loader/loader.component";
import {MobileDepositType19Component} from "./deposit-payments/deposit-type19/mobile-deposit-type19.component";
import {
    MobileDepositType19DefaultComponent
} from "./deposit-payments/deposit-type19/deposit-type19-default/mobile-deposit-type19-default.component";



@NgModule({
  declarations: [
    MobileDepositBlockDefaultComponent,
    MobileDepositType1Component,
    MobileDepositType1DefaultComponent,
    MobileDepositType2Component,
    MobileDepositType2DefaultComponent,
    MobileDepositType3Component,
    MobileDepositType4Component,
    MobileDepositType5Component,
    MobileDepositType6Component,
    MobileDepositType7Component,
    MobileDepositType8Component,
    MobileDepositType3DefaultComponent,
    MobileDepositType4DefaultComponent,
    MobileDepositType5DefaultComponent,
    MobileDepositType6DefaultComponent,
    MobileDepositType7DefaultComponent,
    MobileDepositType8DefaultComponent,
    MobileDepositType9DefaultComponent,
    MobileDepositType9Component,
    MobileDepositType9DefaultComponent,
    MobileDepositType10DefaultComponent,
    MobileDepositType10Component,
    MobileDepositType11Component,
    MobileDepositType11DefaultComponent,
    MobileDepositType13Component,
    MobileDepositType13DefaultComponent,
    MobileDepositType14Component,
    MobileDepositType14DefaultComponent,
    MobileDepositType15Component,
    MobileDepositType15DefaultComponent,
    MobileDepositType16Component,
    MobileDepositType16DefaultComponent,
    MobileDepositType17Component,
    MobileDepositType17DefaultComponent,
    MobileDepositType19Component,
    MobileDepositType19DefaultComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        ThemeModule,
        MobileDepositBlockRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DesktopMobileCommonModule,
        TranslateModule,
        LoaderComponent,
        CommonBonusesModule,
        PaymentsModule,
        CommonPaymentNominalsModule,
        QRCodeModule
    ]
})
export class MobileDepositBlockModule {
}
