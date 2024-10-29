import {
    Component, inject,
    OnInit,
} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {DropdownDirectiveModule} from "../../../directives/dropdown/dropdown-directive.module";
import {TooltipDirective} from "../../../directives/tooltip";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TimeCountDownComponent} from "./clock-count-down/time-count-down.component";

@Component({
    selector: 'race-leaderboard',
    templateUrl: './race-leaderboard.component.html',
    styleUrls: ['./race-leaderboard.component.scss'],
    standalone:true,
    imports: [CommonModule, RouterModule, TranslateModule, DropdownDirectiveModule, TooltipDirective, NgOptimizedImage, TimeCountDownComponent],
})
export class RaceLeaderboardComponent  implements OnInit
{
    data:any = inject(MAT_DIALOG_DATA);
    #dialogRef = inject(MatDialogRef<RaceLeaderboardComponent>);

    ngOnInit() {

        console.log('currentTournament',this.data.tournaments);
   }

    close()
    {
        this.#dialogRef.close();
    }
}
