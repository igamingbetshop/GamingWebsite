import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MobileHomepageComponent } from './mobile-homepage.component';
import { BannersModule } from '../../common/common-banner/banners.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizerModule } from '../../../../../../@theme/pipes/sanitizer/sanitizer.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeBannersModule } from './mobile-banners/home-banners.module';
import { MobileImageBarModule} from './mobile-image-bar/mobile-image-bar.module';
import { MobileCharactersModule} from './mobile-characters/mobile-characters.module';
import {FragmentCharactersModule} from "./mobile-fragment-characters/mobile-fragment-characters.module";

const routes: Routes = [
    {
        path: '',
        component: MobileHomepageComponent,
    }
];
@NgModule({
    declarations: [
        MobileHomepageComponent
    ],
    imports: [
        CommonModule,
        BannersModule,
        FontAwesomeModule,
        TranslateModule,
        SanitizerModule,
        RouterModule.forChild(routes),
        SlickCarouselModule,
        HomeBannersModule,
        MobileImageBarModule,
        MobileCharactersModule,
        FragmentCharactersModule
    ]
})
export class MobileHomeModule {

}
