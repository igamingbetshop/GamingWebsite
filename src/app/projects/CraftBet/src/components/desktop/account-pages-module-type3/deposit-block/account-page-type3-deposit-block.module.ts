import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { QRCodeModule } from 'angularx-qrcode';
import { ThemeModule } from '../../../../../../../@theme/theme.module';
import { DesktopMobileCommonModule } from '../../../common/common.module';
import { OrderByPipeModule } from '../../../../../../../@theme/pipes/order-by/order-by-pipe.module';
import { CommonBonusesModule } from '../../../common/app-common-bonuses/common-bonuses.module';
import { CommonPaymentNominalsModule } from '../../../common/app-common-payment-nominals/common-payment-nominals.module';
import { DepositBlockDefaultComponent } from './deposit-block-default/deposit-block-default.component';
import { DepositType1Component } from './deposit-payments/deposit-type1/deposit-type1.component';
import { DepositType2Component } from './deposit-payments/deposit-type2/deposit-type2.component';
import { DepositType3Component } from './deposit-payments/deposit-type3/deposit-type3.component';
import { DepositType4Component } from './deposit-payments/deposit-type4/deposit-type4.component';
import { DepositType5Component } from './deposit-payments/deposit-type5/deposit-type5.component';
import { DepositType6Component } from './deposit-payments/deposit-type6/deposit-type6.component';
import { DepositType7Component } from './deposit-payments/deposit-type7/deposit-type7.component';
import { DepositType8Component } from './deposit-payments/deposit-type8/deposit-type8.component';
import { DepositType9Component } from './deposit-payments/deposit-type9/deposit-type9.component';
import { DepositType1DefaultComponent } from './deposit-payments/deposit-type1/deposit-type1-default/deposit-type1-default.component';
import { DepositType2DefaultComponent } from './deposit-payments/deposit-type2/deposit-type2-default/deposit-type2-default.component';
import { DepositType3DefaultComponent } from './deposit-payments/deposit-type3/deposit-type3-default/deposit-type3-default.component';
import { DepositType4DefaultComponent } from './deposit-payments/deposit-type4/deposit-type4-default/deposit-type4-default.component';
import { DepositType5DefaultComponent } from './deposit-payments/deposit-type5/deposit-type5-default/deposit-type5-default.component';
import { DepositType6DefaultComponent } from './deposit-payments/deposit-type6/deposit-type6-default/deposit-type6-default.component';
import { DepositType7DefaultComponent } from './deposit-payments/deposit-type7/deposit-type7-default/deposit-type7-default.component';
import { DepositType8DefaultComponent } from './deposit-payments/deposit-type8/deposit-type8-default/deposit-type8-default.component';
import { DepositType9DefaultComponent } from './deposit-payments/deposit-type9/deposit-type9-default/deposit-type9-default.component';
import { DepositType10Component } from './deposit-payments/deposit-type10/deposit-type10.component';
import { DepositType10DefaultComponent } from './deposit-payments/deposit-type10/deposit-type10-default/deposit-type10-default.component';
import { DepositType11Component } from './deposit-payments/deposit-type11/deposit-type11.component';
import { DepositType11DefaultComponent } from './deposit-payments/deposit-type11/deposit-type11-default/deposit-type11-default.component';
import { DepositType13Component } from './deposit-payments/deposit-type13/deposit-type13.component';
import { DepositType13DefaultComponent } from './deposit-payments/deposit-type13/deposit-type13-default/deposit-type13-default.component';
import { DepositType14Component } from './deposit-payments/deposit-type14/deposit-type14.component';
import { DepositType14DefaultComponent } from './deposit-payments/deposit-type14/deposit-type14-default/deposit-type14-default.component';
import { DepositType15DefaultComponent } from './deposit-payments/deposit-type15/deposit-type15-default/deposit-type15-default.component';
import { DepositType15Component } from './deposit-payments/deposit-type15/deposit-type15.component';
import { DepositType16Component } from './deposit-payments/deposit-type16/deposit-type16.component';
import { DepositType16DefaultComponent } from './deposit-payments/deposit-type16/deposit-type16-default/deposit-type16-default.component';
import {DepositType18Component} from "./deposit-payments/deposit-type18/deposit-type18.component";
import {
    DepositType18DefaultComponent
} from "./deposit-payments/deposit-type18/deposit-type18-default/deposit-type18-default.component";
import {FilterByKeyPipeModule} from "../../../../../../../@theme/pipes/filter-by-key/filter-by-key-pipe.module";
import { DepositType17DefaultComponent } from './deposit-payments/deposit-type17/deposit-type17-default/deposit-type17-default.component';
import {DepositType17Component} from "./deposit-payments/deposit-type17/deposit-type17.component";
import {DropdownDirectiveModule} from "../../../../../../../@theme/directives/dropdown/dropdown-directive.module";
import {NgxMaskDirective} from "ngx-mask";
import {LoaderComponent} from "../../../common/loader/loader.component";


@NgModule({ declarations: [
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
        DepositType10Component,
        DepositType11Component,
        DepositType13Component,
        DepositType14Component,
        DepositType15Component,
        DepositType16Component,
        DepositType1DefaultComponent,
        DepositType2DefaultComponent,
        DepositType3DefaultComponent,
        DepositType4DefaultComponent,
        DepositType5DefaultComponent,
        DepositType6DefaultComponent,
        DepositType7DefaultComponent,
        DepositType8DefaultComponent,
        DepositType9DefaultComponent,
        DepositType10DefaultComponent,
        DepositType11DefaultComponent,
        DepositType13DefaultComponent,
        DepositType14DefaultComponent,
        DepositType15DefaultComponent,
        DepositType16DefaultComponent,
        DepositType17Component,
        DepositType17DefaultComponent,
        DepositType18Component,
        DepositType18DefaultComponent,
    ],
    exports: [
        DepositBlockDefaultComponent
    ], imports: [CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxMaskDirective,
        NgxPrintModule,
        ThemeModule,
        DesktopMobileCommonModule,
        OrderByPipeModule,
        CommonBonusesModule,
        CommonPaymentNominalsModule,
        ClipboardModule,
        FilterByKeyPipeModule,
        QRCodeModule,
        DropdownDirectiveModule,
        LoaderComponent], providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })

export class AccountPageType3DepositBlockModule {
    getComponent() {
        return DepositBlockDefaultComponent;
    }
}
