import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomBlockRoutingModule} from "./custom-block-routing.module";
import { CustomBlockDefaultComponent } from './custom-block-default/custom-block-default.component';
import { CustomBlockSettingsComponent } from './custom-block-settings/custom-block-settings.component';
import { CustomBlockBetListComponent } from './custom-block-bet-list/custom-block-bet-list.component';
import { CustomBlockAnnouncementComponent } from './custom-block-announcement/custom-block-announcement.component';
import { CustomBlockBettingStatementComponent } from './custom-block-betting-statement/custom-block-betting-statement.component';
import { CustomBlockBettingStatementItemComponent } from './custom-block-betting-statement-item/custom-block-betting-statement-item.component';
import { CustomBlockBettingStatementSportItemComponent } from './custom-block-betting-statement-sport-item/custom-block-betting-statement-sport-item.component';
import {TranslateModule} from "@ngx-translate/core";
import {ThemeModule} from "../../../../../../@theme/theme.module";
import {DesktopMobileCommonModule} from "../../common/common.module";
import { CustomBlockMenuComponent } from './custom-block-menu/custom-block-menu.component';
import {NgxPaginationModule} from "ngx-pagination";
import {NgxPrintModule} from 'ngx-print';
import {ReactiveFormsModule} from "@angular/forms";
import {ExportDataService} from "../../../../../../@core/services";
import {LoaderComponent} from "../../common/loader/loader.component";


@NgModule({
  declarations: [
    CustomBlockDefaultComponent,
    CustomBlockSettingsComponent,
    CustomBlockBetListComponent,
    CustomBlockAnnouncementComponent,
    CustomBlockBettingStatementComponent,
    CustomBlockBettingStatementItemComponent,
    CustomBlockBettingStatementSportItemComponent,
    CustomBlockMenuComponent
  ],
  imports: [
    CommonModule,
    CustomBlockRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ThemeModule,
    DesktopMobileCommonModule,
    NgxPrintModule,
    NgxPaginationModule,
    LoaderComponent
  ],
  providers:[
    ExportDataService
  ]
})
export class CustomBlockModule {
}
