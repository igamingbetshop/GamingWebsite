import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule } from '@ngx-translate/core';
import { MobileCasinoBannersComponent } from './mobile-casino-banners.component';
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations: [MobileCasinoBannersComponent],
  exports: [MobileCasinoBannersComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule,
    SanitizerModule
  ]
})

export class MobileCasinoBannersModule {}
