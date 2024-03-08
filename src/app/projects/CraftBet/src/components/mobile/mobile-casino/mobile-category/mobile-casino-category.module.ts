import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MobileCasinoCategoryComponent } from './mobile-casino-category.component';
import { RouterModule } from '@angular/router';
import { MobileCasinoGameModule} from '../mobile-game/mobile-casino-game.module';
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
  declarations: [MobileCasinoCategoryComponent],
  exports: [MobileCasinoCategoryComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        MobileCasinoGameModule,
        SanitizerModule
    ]
})

export class MobileCasinoCategoryModule {

}
