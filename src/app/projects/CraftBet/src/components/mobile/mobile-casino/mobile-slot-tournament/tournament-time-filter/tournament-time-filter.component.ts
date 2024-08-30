import {
  ChangeDetectionStrategy,
  Component, DestroyRef, Inject, inject, signal,
  ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'tournament-time-filter',
  templateUrl: './tournament-time-filter.component.html',
  styleUrls: ['./tournament-time-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentTimeFilterComponent {


  selectedTournamentId = signal(0);
  @Inject(MAT_DIALOG_DATA) data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<TournamentTimeFilterComponent>);

  close(tournamentId?:number)
  {
    this.dialogRef.close(tournamentId);
  }

  selectTournament(tournamentId:number) {
    this.selectedTournamentId.set(tournamentId);
    this.close(tournamentId);
  }
}

