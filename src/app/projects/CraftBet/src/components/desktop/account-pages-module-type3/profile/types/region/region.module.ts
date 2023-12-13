import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RegionComponent } from './region.component';
import { DropdownDirectiveModule } from '../../../../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { FilterByKeyPipeModule } from '../../../../../../../../../@theme/pipes/filter-by-key/filter-by-key-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FilterByKeyPipeModule,
        FormsModule,
        DropdownDirectiveModule
    ],
    exports: [
        RegionComponent
    ],
    declarations: [
        RegionComponent
    ]
})
export class RegionModule {
    getComponent() {
        return RegionComponent;
    }
}
