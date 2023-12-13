import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { MobileUssdPinComponent } from './mobile-ussd-pin.component';
import { OnlyNumberDirective } from '../../../../../../../@theme/directives/only-number/only-number.directive';
import { RegExpInputDirectiveModule } from '../../../../../../../@theme/directives/reg-exp-input/reg-exp-input-directive.module';
import { OnlyNumberDirectiveModule } from '../../../../../../../@theme/directives/only-number/only-number.directive.module';

const routes: Routes = [
    {
        path: '',
        component: MobileUssdPinComponent
    }
];

@NgModule({
    declarations: [MobileUssdPinComponent],
    exports: [MobileUssdPinComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ToNumberPipeModule,
        RouterModule.forChild(routes),
        FontAwesomeModule,
        ReactiveFormsModule,
        RegExpInputDirectiveModule,
        OnlyNumberDirectiveModule
    ],
})

export class MobileUssdPinModule {

}
