import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileAffiliateComponent } from './mobile-affiliate.component';
import { SanitizerModule } from '../../../../../../@theme/pipes/sanitizer/sanitizer.module';

const routes: Routes = [
    {
        path: '',
        component: MobileAffiliateComponent,
    }
];

@NgModule({
    declarations: [MobileAffiliateComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        SanitizerModule
    ]
})
export class MobileAffiliateModule {
}
