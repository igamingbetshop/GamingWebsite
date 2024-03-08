import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MobilePaymentErrorComponent } from './mobile-payment-error.component';
import { SanitizerModule } from '../../../../../../@theme/pipes/sanitizer/sanitizer.module';

const routes: Routes = [
    {
        path: '',
        component: MobilePaymentErrorComponent
    }
];

@NgModule({
    declarations: [MobilePaymentErrorComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SanitizerModule,
        RouterModule.forChild(routes)
    ]
})

export class MobilePaymentErrorModule {}
