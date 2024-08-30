import {Component, createNgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {BaseSlotTournament} from "../../../../../../../@theme/fragments/casino/slot-tournament/base-slot-tournament";
import {TimeCountDownComponent} from "./clock-count-down/time-count-down.component";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {TournamentLeaderboardComponent} from "./tournament-leaderboard/tournament-leaderboard.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'mobile-slot-tournament',
    templateUrl: './mobile-slot-tournament.component.html',
    styleUrls: ['./mobile-slot-tournament.component.scss'],
    standalone:true,
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        TimeCountDownComponent,
        TournamentLeaderboardComponent,
        FaIconComponent,
    ]
})
export class MobileSlotTournamentComponent extends BaseSlotTournament {

    protected readonly faBars = faBars;
    currentTournamentIndex = 0;

    async loadComponent():Promise<any>
    {
        const {TournamentTimeFilterModule} = await import('../mobile-slot-tournament/tournament-time-filter/tournament-time-filter.module');
        const moduleRef = createNgModule(TournamentTimeFilterModule, this.injector);
        const component = moduleRef.instance.getComponent();
        return component;
    }

    openFilterPopup()
    {

        this.loadComponent().then(component => {
            const dialogRef = this.dialog.open(component, {data:{
                    tournaments:this.slotTournaments(),
                }, hasBackdrop:true});
            dialogRef.afterClosed().subscribe(result => {
                if(result)
                {
                    this.updateCurrentTournament(this.slotTournaments().find(el  => el.Id === result));
                }
            });
        });
    }

    prevTournament() {
        this.currentTournamentIndex = (this.currentTournamentIndex - 1 + this.slotTournaments().length) % this.slotTournaments().length;
        const tournament = this.slotTournaments()[this.currentTournamentIndex];
        this.updateCurrentTournament(tournament);
    }

    nextTournament() {
        this.currentTournamentIndex = (this.currentTournamentIndex + 1) % this.slotTournaments().length;
        const tournament = this.slotTournaments()[this.currentTournamentIndex];
        this.updateCurrentTournament(tournament);
    }
}
