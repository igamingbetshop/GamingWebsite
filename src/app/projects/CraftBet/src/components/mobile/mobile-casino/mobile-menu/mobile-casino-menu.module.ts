import { NgModule } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule } from '@ngx-translate/core';
import { MobileCasinoMenuComponent } from './mobile-casino-menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MobileCasinoMenuComponent],
  exports: [MobileCasinoMenuComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule
  ]
})

export class MobileCasinoMenuModule {

}
