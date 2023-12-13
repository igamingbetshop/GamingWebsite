import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UssdPinComponent } from './ussd-pin.component';
import { ToNumberPipeModule } from '../../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RegExpInputDirectiveModule } from '../../../../../../../@theme/directives/reg-exp-input/reg-exp-input-directive.module';
import { OnlyNumberDirectiveModule } from '../../../../../../../@theme/directives/only-number/only-number.directive.module';

const routes: Routes = [
    {
        path: '',
        component: UssdPinComponent
    }
];

@NgModule({
    declarations: [UssdPinComponent],
    exports: [UssdPinComponent],
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
export class UssdPinModule {

}
