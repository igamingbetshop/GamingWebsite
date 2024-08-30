import {Component, Injector, signal, WritableSignal} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";
import {BaseSlotTournament} from "../../../../../../../@theme/fragments/casino/slot-tournament/base-slot-tournament";
import {TimeCountDownComponent} from "./clock-count-down/time-count-down.component";
import {TournamentLeaderboardComponent} from "./tournament-leaderboard/tournament-leaderboard.component";

@Component({
    selector: 'slot-tournament',
    templateUrl: './slot-tournament.component.html',
    styleUrls: ['./slot-tournament.component.scss'],
    standalone:true,
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FontAwesomeIcons,
        RouterModule,
        TimeCountDownComponent,
        TournamentLeaderboardComponent
    ]
})
export class SlotTournamentComponent extends BaseSlotTournament {






}
