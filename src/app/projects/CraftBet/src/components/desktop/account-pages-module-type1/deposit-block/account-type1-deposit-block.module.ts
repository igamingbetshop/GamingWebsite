import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepositBlockDefaultComponent} from './deposit-block-default/deposit-block-default.component';
import {AccountType1DepositBlockRoutingModule} from "./account-type1-deposit-block-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {SimpleModalModule} from "ngx-simple-modal";
import {HttpClientModule} from "@angular/common/http";
import {FilterPipeModule} from "ngx-filter-pipe";
import {NgxMaskModule} from "ngx-mask";
import {ClickOutsideModule} from "ng-click-outside";
import {NgxPrintModule} from "ngx-print";
import {ThemeModule} from "../../../../../../../@theme/theme.module";
import {DepositType1Component} from "./desposit-payments/deposit-type1/deposit-type1.component";
import {DepositType2Component} from "./desposit-payments/deposit-type2/deposit-type2.component";
import {DepositType3Component} from "./desposit-payments/deposit-type3/deposit-type3.component";
import {DepositType4Component} from "./desposit-payments/deposit-type4/deposit-type4.component";
import {DepositType5Component} from "./desposit-payments/deposit-type5/deposit-type5.component";
import {DepositType6Component} from "./desposit-payments/deposit-type6/deposit-type6.component";
import {DepositType7Component} from "./desposit-payments/deposit-type7/deposit-type7.component";
import {DepositType8Component} from "./desposit-payments/deposit-type8/deposit-type8.component";
import {DepositType9Component} from "./desposit-payments/deposit-type9/deposit-type9.component";
import {DepositType1DefaultComponent} from "./desposit-payments/deposit-type1/deposit-type1-default/deposit-type1-default.component";
import {DepositType2DefaultComponent} from "./desposit-payments/deposit-type2/deposit-type2-default/deposit-type2-default.component";
import {DepositType3DefaultComponent} from "./desposit-payments/deposit-type3/deposit-type3-default/deposit-type3-default.component";
import {DepositType4DefaultComponent} from "./desposit-payments/deposit-type4/deposit-type4-default/deposit-type4-default.component";
import {DepositType5DefaultComponent} from "./desposit-payments/deposit-type5/deposit-type5-default/deposit-type5-default.component";
import {DepositType6DefaultComponent} from "./desposit-payments/deposit-type6/deposit-type6-default/deposit-type6-default.component";
import {DepositType7DefaultComponent} from "./desposit-payments/deposit-type7/deposit-type7-default/deposit-type7-default.component";
import {DepositType8DefaultComponent} from "./desposit-payments/deposit-type8/deposit-type8-default/deposit-type8-default.component";
import {DepositType9DefaultComponent} from "./desposit-payments/deposit-type9/deposit-type9-default/deposit-type9-default.component";
import {DepositType10Component} from "./desposit-payments/deposit-type10/deposit-type10.component";
import {DepositType10DefaultComponent} from "./desposit-payments/deposit-type10/deposit-type10-default/deposit-type10-default.component";
import {DepositType11Component} from "./desposit-payments/deposit-type11/deposit-type11.component";
import {DepositType11DefaultComponent} from "./desposit-payments/deposit-type11/deposit-type11-default/deposit-type11-default.component";
import {DesktopMobileCommonModule} from "../../../common/common.module";
import {DepositType13Component} from "./desposit-payments/deposit-type13/deposit-type13.component";
import {DepositType13DefaultComponent} from "./desposit-payments/deposit-type13/deposit-type13-default/deposit-type13-default.component";
import {DepositType14Component} from "./desposit-payments/deposit-type14/deposit-type14.component";
import {DepositType14DefaultComponent} from "./desposit-payments/deposit-type14/deposit-type14-default/deposit-type14-default.component";
import {LoaderModule} from "../../../common/loader/loader.module";
import {OrderByPipeModule} from "../../../../../../../@theme/pipes/order-by/order-by-pipe.module";
import {CommonBonusesModule} from "../../../common/app-common-bonuses/common-bonuses.module";
import {CommonPaymentNominalsModule} from "../../../common/app-common-payment-nominals/common-payment-nominals.module";
import {DepositType15DefaultComponent} from "./desposit-payments/deposit-type15/deposit-type15-default/deposit-type15-default.component";
import {DepositType15Component} from "./desposit-payments/deposit-type15/deposit-type15.component";
import {DepositType16Component} from "./desposit-payments/deposit-type16/deposit-type16.component";
import {DepositType16DefaultComponent} from "./desposit-payments/deposit-type16/deposit-type16-default/deposit-type16-default.component";
import {DepositType17Component} from "./desposit-payments/deposit-type17/deposit-type17.component";
import {
    DepositType17DefaultComponent
} from "./desposit-payments/deposit-type17/deposit-type17-default/deposit-type17-default.component";
import {QRCodeModule} from "angularx-qrcode";


@NgModule({
    declarations: [
        DepositBlockDefaultComponent,
        DepositType1Component,
        DepositType2Component,
        DepositType3Component,
        DepositType4Component,
        DepositType5Component,
        DepositType6Component,
        DepositType7Component,
        DepositType8Component,
        DepositType9Component,
        DepositType1DefaultComponent,
        DepositType2DefaultComponent,
        DepositType3DefaultComponent,
        DepositType4DefaultComponent,
        DepositType5DefaultComponent,
        DepositType6DefaultComponent,
        DepositType7DefaultComponent,
        DepositType8DefaultComponent,
        DepositType9DefaultComponent,
        DepositType9Component,
        DepositType10Component,
        DepositType10DefaultComponent,
        DepositType11Component,
        DepositType13Component,
        DepositType11DefaultComponent,
        DepositType13DefaultComponent,
        DepositType14Component,
        DepositType14DefaultComponent,
        DepositType15Component,
        DepositType15DefaultComponent,
        DepositType16Component,
        DepositType16DefaultComponent,
        DepositType17Component,
        DepositType17DefaultComponent,

    ],
    imports: [
        CommonModule,
        AccountType1DepositBlockRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SimpleModalModule,
        HttpClientModule,
        FilterPipeModule,
        NgxMaskModule.forRoot(),
        ClickOutsideModule,
        NgxPrintModule,
        ThemeModule,
        DesktopMobileCommonModule,
        LoaderModule,
        OrderByPipeModule,
        CommonBonusesModule,
        CommonPaymentNominalsModule,
        QRCodeModule
    ],
    entryComponents: [
        DepositType1Component,
        DepositType2Component,
        DepositType3Component,
        DepositType4Component,
        DepositType5Component,
        DepositType6Component,
        DepositType7Component,
        DepositType8Component,
        DepositType9Component,
        DepositType1DefaultComponent,
        DepositType2DefaultComponent,
        DepositType3DefaultComponent,
        DepositType4DefaultComponent,
        DepositType5DefaultComponent,
        DepositType6DefaultComponent,
        DepositType7DefaultComponent,
        DepositType8DefaultComponent,
        DepositType9DefaultComponent,
        DepositType9Component,
        DepositType10Component,
        DepositType10DefaultComponent,
        DepositType11Component,
        DepositType11DefaultComponent,
        DepositType13Component,
        DepositType13DefaultComponent,
        DepositType14Component,
        DepositType14DefaultComponent,
        DepositType15Component,
        DepositType15DefaultComponent,
        DepositType16Component,
        DepositType16DefaultComponent,
        DepositType17Component,
        DepositType17DefaultComponent
    ]
})
export class AccountType1DepositBlockModule {
}
