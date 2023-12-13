import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MobileImageBarComponent } from './mobile-image-bar.component';
import { SanitizerModule } from '../../../../../../../@theme/pipes/sanitizer/sanitizer.module';

@NgModule({
  declarations: [MobileImageBarComponent],
  exports: [MobileImageBarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SanitizerModule
  ]
})

export class MobileImageBarModule {

}
