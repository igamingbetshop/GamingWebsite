import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule } from '@ngx-translate/core';
import { MobileCasinoBannersComponent } from './mobile-casino-banners.component';

@NgModule({
  declarations: [MobileCasinoBannersComponent],
  exports: [MobileCasinoBannersComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule
  ]
})

export class MobileCasinoBannersModule {}
