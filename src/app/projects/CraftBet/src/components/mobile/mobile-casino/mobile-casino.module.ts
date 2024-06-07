import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannersModule } from '../../common/common-banner/banners.module';
import { FormsModule } from '@angular/forms';
import { ToNumberPipeModule } from '../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import { OrderByPipeModule } from '../../../../../../@theme/pipes/order-by/order-by-pipe.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MobileCasinoComponent } from './mobile-casino.component';
import { MobileCasinoBannersModule } from './mobile-banners/mobile-casino-banners.module';
import { MobileCasinoProvidersModule } from './mobile-providers/mobile-casino-providers.module';
import { MobileCasinoSearchModule } from './mobile-search/mobile-casino-search.module';
import { MobileCasinoMenuModule } from './mobile-menu/mobile-casino-menu.module';
import { MobileCasinoCategoryModule} from './mobile-category/mobile-casino-category.module';
import {MobileProgressBarModule} from "./mobile-progress-bar/mobile-progress-bar.module";
import {MobileCharacterHierarchyComponent} from "./mobile-character-hierarchy/mobile-character-hierarchy.component";
import {WinnersWidgetModule} from "../../desktop/fragments/winners-widget/winners-widget.module";

const routes: Routes = [
  {
    path: '',
    component: MobileCasinoComponent,
  }
];
@NgModule({
  declarations: [MobileCasinoComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        FormsModule,
        ToNumberPipeModule,
        BannersModule,
        OrderByPipeModule,
        RouterModule.forChild(routes),
        SlickCarouselModule,
        MobileCasinoBannersModule,
        MobileCasinoProvidersModule,
        MobileCasinoSearchModule,
        MobileCasinoMenuModule,
        MobileCasinoCategoryModule,
        MobileProgressBarModule,
        MobileCharacterHierarchyComponent,
        WinnersWidgetModule,
    ]
})

export class MobileCasinoModule {

}
