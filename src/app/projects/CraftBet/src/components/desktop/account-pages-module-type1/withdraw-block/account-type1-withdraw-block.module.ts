import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountType1WithdrawBlockRoutingModule} from "./account-type1-withdraw-block-routing.module";
import {WithdrawBlockDefaultComponent} from './withdraw-block-default/withdraw-block-default.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {NgxPrintModule} from "ngx-print";
import {ThemeModule} from "../../../../../../../@theme/theme.module";
import {DesktopMobileCommonModule} from "../../../common/common.module";
import {WithdrawType1Component} from "./withdraw-payments/withdraw-type1/withdraw-type1.component";
import {WithdrawType2Component} from "./withdraw-payments/withdraw-type2/withdraw-type2.component";
import {WithdrawType3Component} from "./withdraw-payments/withdraw-type3/withdraw-type3.component";
import {WithdrawType4Component} from "./withdraw-payments/withdraw-type4/withdraw-type4.component";
import {WithdrawType5Component} from "./withdraw-payments/withdraw-type5/withdraw-type5.component";
import {WithdrawType6Component} from "./withdraw-payments/withdraw-type6/withdraw-type6.component";
import {WithdrawType1DefaultComponent} from "./withdraw-payments/withdraw-type1/withdraw-type1-default/withdraw-type1-default.component";
import {WithdrawType2DefaultComponent} from "./withdraw-payments/withdraw-type2/withdraw-type2-default/withdraw-type2-default.component";
import {WithdrawType3DefaultComponent} from "./withdraw-payments/withdraw-type3/withdraw-type3-default/withdraw-type3-default.component";
import {WithdrawType4DefaultComponent} from "./withdraw-payments/withdraw-type4/withdraw-type4-default/withdraw-type4-default.component";
import {WithdrawType5DefaultComponent} from "./withdraw-payments/withdraw-type5/withdraw-type5-default/withdraw-type5-default.component";
import {WithdrawType6DefaultComponent} from "./withdraw-payments/withdraw-type6/withdraw-type6-default/withdraw-type6-default.component";
import {WithdrawType7Component} from "./withdraw-payments/withdraw-type7/withdraw-type7.component";
import {WithdrawType8Component} from "./withdraw-payments/withdraw-type8/withdraw-type8.component";
import {WithdrawType7DefaultComponent} from "./withdraw-payments/withdraw-type7/withdraw-type7-default/withdraw-type7-default.component";
import {WithdrawType8DefaultComponent} from "./withdraw-payments/withdraw-type8/withdraw-type8-default/withdraw-type8-default.component";
import {WithdrawType9Component} from "./withdraw-payments/withdraw-type9/withdraw-type9.component";
import {WithdrawType9DefaultComponent} from "./withdraw-payments/withdraw-type9/withdraw-type9-default/withdraw-type9-default.component";
import {WithdrawType10Component} from "./withdraw-payments/withdraw-type10/withdraw-type10.component";
import {WithdrawType10DefaultComponent} from "./withdraw-payments/withdraw-type10/withdraw-type10-default/withdraw-type10-default.component";
import {WithdrawType11Component} from "./withdraw-payments/withdraw-type11/withdraw-type11.component";
import {WithdrawType11DefaultComponent} from "./withdraw-payments/withdraw-type11/withdraw-type11-default/withdraw-type11-default.component";
import {WithdrawType12Component} from "./withdraw-payments/withdraw-type12/withdraw-type12.component";
import {WithdrawType12DefaultComponent} from "./withdraw-payments/withdraw-type12/withdraw-type12-default/withdraw-type12-default.component";
import {WithdrawType13Component} from "./withdraw-payments/withdraw-type13/withdraw-type13.component";
import {WithdrawType13DefaultComponent} from "./withdraw-payments/withdraw-type13/withdraw-type13-default/withdraw-type13-default.component";
import {WithdrawType14DefaultComponent} from "./withdraw-payments/withdraw-type14/withdraw-type14-default/withdraw-type14-default.component";
import {WithdrawType14Component} from "./withdraw-payments/withdraw-type14/withdraw-type14.component";
import {WithdrawType15DefaultComponent} from "./withdraw-payments/withdraw-type15/withdraw-type15-default/withdraw-type15-default.component";
import {WithdrawType15Component} from "./withdraw-payments/withdraw-type15/withdraw-type15.component";
import {WithdrawType16DefaultComponent} from "./withdraw-payments/withdraw-type16/withdraw-type16-default/withdraw-type16-default.component";
import {WithdrawType16Component} from "./withdraw-payments/withdraw-type16/withdraw-type16.component";
import {WithdrawType17DefaultComponent} from "./withdraw-payments/withdraw-type17/withdraw-type17-default/withdraw-type17-default.component";
import {WithdrawType17Component} from "./withdraw-payments/withdraw-type17/withdraw-type17.component";
import {OrderByPipeModule} from "../../../../../../../@theme/pipes/order-by/order-by-pipe.module";
import {CommonPaymentNominalsModule} from "../../../common/app-common-payment-nominals/common-payment-nominals.module";
import {CommonAccountsModule} from "../../../common/common-accounts/common-accounts.module";
import {WithdrawType18DefaultComponent} from "./withdraw-payments/withdraw-type18/withdraw-type18-default/withdraw-type18-default.component";
import {WithdrawType18Component} from "./withdraw-payments/withdraw-type18/withdraw-type18.component";
import {WithdrawType21DefaultComponent} from "./withdraw-payments/withdraw-type21/withdraw-type21-default/withdraw-type21-default.component";
import {WithdrawType21Component} from "./withdraw-payments/withdraw-type21/withdraw-type21.component";
import {WithdrawType22Component} from "./withdraw-payments/withdraw-type22/withdraw-type22.component";
import {
    WithdrawType22DefaultComponent
} from "./withdraw-payments/withdraw-type22/withdraw-type22-default/withdraw-type22-default.component";
import {DropdownDirectiveModule} from "../../../../../../../@theme/directives/dropdown/dropdown-directive.module";
import {WithdrawType23Component} from "./withdraw-payments/withdraw-type23/withdraw-type23.component";
import {
    WithdrawType23DefaultComponent
} from "./withdraw-payments/withdraw-type23/withdraw-type23-default/withdraw-type23-default.component";
import {
    WithdrawType24DefaultComponent
} from "./withdraw-payments/withdraw-type24/withdraw-type24-default/withdraw-type24-default.component";
import {WithdrawType24Component} from "./withdraw-payments/withdraw-type24/withdraw-type24.component";
import {WithdrawType25Component} from "./withdraw-payments/withdraw-type25/withdraw-type25.component";
import {
    WithdrawType25DefaultComponent
} from "./withdraw-payments/withdraw-type25/withdraw-type25-default/withdraw-type25-default.component";
import {WithdrawType20Component} from "./withdraw-payments/withdraw-type20/withdraw-type20.component";
import {
    WithdrawType20DefaultComponent
} from "./withdraw-payments/withdraw-type20/withdraw-type20-default/withdraw-type20-default.component";
import {NgxMaskDirective} from "ngx-mask";
import {LoaderComponent} from "../../../common/loader/loader.component";


@NgModule({ declarations: [
        WithdrawBlockDefaultComponent,
        WithdrawType1Component,
        WithdrawType2Component,
        WithdrawType3Component,
        WithdrawType4Component,
        WithdrawType5Component,
        WithdrawType6Component,
        WithdrawType1DefaultComponent,
        WithdrawType2DefaultComponent,
        WithdrawType3DefaultComponent,
        WithdrawType4DefaultComponent,
        WithdrawType5DefaultComponent,
        WithdrawType6DefaultComponent,
        WithdrawType7Component,
        WithdrawType8Component,
        WithdrawType7DefaultComponent,
        WithdrawType8DefaultComponent,
        WithdrawType9Component,
        WithdrawType9DefaultComponent,
        WithdrawType10Component,
        WithdrawType10DefaultComponent,
        WithdrawType11Component,
        WithdrawType11DefaultComponent,
        WithdrawType12Component,
        WithdrawType12DefaultComponent,
        WithdrawType13Component,
        WithdrawType14Component,
        WithdrawType15Component,
        WithdrawType16Component,
        WithdrawType17Component,
        WithdrawType18Component,
        WithdrawType21Component,
        WithdrawType13DefaultComponent,
        WithdrawType14DefaultComponent,
        WithdrawType15DefaultComponent,
        WithdrawType16DefaultComponent,
        WithdrawType17DefaultComponent,
        WithdrawType18DefaultComponent,
        WithdrawType20DefaultComponent,
        WithdrawType20Component,
        WithdrawType21DefaultComponent,
        WithdrawType22Component,
        WithdrawType22DefaultComponent,
        WithdrawType23Component,
        WithdrawType23DefaultComponent,
        WithdrawType24Component,
        WithdrawType24DefaultComponent,
        WithdrawType25Component,
        WithdrawType25DefaultComponent
    ], imports: [CommonModule,
        AccountType1WithdrawBlockRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxMaskDirective,
        NgxPrintModule,
        ThemeModule,
        DesktopMobileCommonModule,
        OrderByPipeModule,
        CommonPaymentNominalsModule,
        CommonAccountsModule,
        DropdownDirectiveModule,
        LoaderComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AccountType1WithdrawBlockModule {
}
