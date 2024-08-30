import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {TournamentTimeFilterComponent} from "./tournament-time-filter.component";

@NgModule({
  declarations:[TournamentTimeFilterComponent],
  exports:[TournamentTimeFilterComponent],
    imports: [
        CommonModule,
        TranslateModule,
    ]
})

export class TournamentTimeFilterModule
{
  getComponent()
  {
    return TournamentTimeFilterComponent;
  }
}
