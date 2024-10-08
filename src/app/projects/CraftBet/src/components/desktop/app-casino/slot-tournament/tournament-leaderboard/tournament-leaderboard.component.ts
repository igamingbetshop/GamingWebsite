import {
  ChangeDetectionStrategy,
  Component, DestroyRef, ElementRef, inject, Input, input, OnInit, QueryList, signal,  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Methods} from "@core/enums";
import {timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ConfigService} from "@core/services";

@Component({
  selector: 'tournament-leaderboard',
  templateUrl: './tournament-leaderboard.component.html',
  styleUrls: ['./tournament-leaderboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ]
})
export class TournamentLeaderboardComponent implements OnInit{

  @ViewChildren('tournament') items: QueryList<ElementRef>;
  OFFSET_Y = 54;
  sorter = 'Points';
  order = 0;
  currencyId = '';
  #baseApiService = inject(BaseApiService);
  #destroyRef = inject(DestroyRef);
  #config = inject(ConfigService);
  tournamentLeaderboard  = signal([]);
  tournamentId = input(0, {transform: (tournamentId:number) => {
      timer(0, 60000).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(tick => {
        this.getSlotTournamentLeaderboard(tournamentId);
      });
      return tournamentId;
    }})
  @Input() bonus;


  tournaments = signal<any[]>( [
    { id: 1, Name: 'John', Points: '6.900', segment: '2025-06-15T13:45:30'},
    { id: 2, Name: 'Jane', Points: '1.800', segment: '2027-02-15T13:05:12' },
    { id: 3, Name: 'Jon',  Points: '2.700', segment: '2025-06-15T13:45:30' },
    { id: 4, Name: 'Alice', Points: '8.100', segment: '2025-06-15T13:45:30' },
    { id: 5, Name: 'Sally', Points: '3.500', segment: '2025-06-15T13:45:30' },
    { id: 6, Name: 'Ray', Points: '1.400', segment: '2025-06-15T13:45:30' },
    { id: 7, Name: 'Arthur C.', Points: '4.300',  segment: '2025-06-15T13:45:30' },
    { id: 8, Name: 'Good King', Points: '1.200', segment: '2025-06-15T13:45:30' },
    { id: 9, Name: 'Booker T.', Points: '6.900', segment: '2025-06-15T13:45:30' },
    { id: 10, Name: 'Miles', Points: '2.000', segment: '2025-06-15T13:45:30' },
    { id: 11, Name: 'Daniel', Points: '2.900', segment: '2025-06-15T13:45:30' }
  ]);

  ngOnInit() {
    this.setSorter();
    this.currencyId = this.#config.defaultOptions.CurrencySymbol;
  }

  getSlotTournamentLeaderboard(tournamentId: number){
    this.#baseApiService.apiGet(Methods.GET_TOURNAMENT_LEADERBOARD, {RequestData:tournamentId,Loader:'false'}).subscribe(data => {
      if(this.tournamentLeaderboard().length == 0){
        this.tournamentLeaderboard.set(data['ResponseObject'])
      }  else {
        const newItems = data['ResponseObject'];

      /*  const newItems = [
          { Order: 5, Name: 'Has', Points:  Math.floor(Math.random() * (400 - 10 + 1)) + 10},
          { Order: 11, Name: 'New Player', Points: Math.floor(Math.random() * (400 - 10 + 1)) + 10},
          { Order: 3, Name: 'Another New Player', Points: Math.floor(Math.random() * (400 - 10 + 1)) + 10},
        ]*/
        console.log('newItems',newItems);
        const leaderboard = this.tournamentLeaderboard();
        const maxLeaderboardLength = 20;
        let minPoints = leaderboard[leaderboard.length - 1].Points;
        let newPoints = [];
        for (let i = 0; i < newItems.length; i++)
        {
          if (newItems[i].Points >= minPoints)
          {
            const index = leaderboard.findIndex(el => el.Name === newItems[i].Name);
            if(index > -1)
            {
              leaderboard[index] = newItems[i];
            }
            else
            {
              if (leaderboard.length + newPoints.length >= maxLeaderboardLength)
              {
                leaderboard.pop();
                minPoints = leaderboard[leaderboard.length - 1].Points;
              }
              newPoints.push(newItems[i]);
            }
          }
        }
        leaderboard.push(...newPoints);

        this.tournamentLeaderboard.update(leaderboard => [...leaderboard]); // Update the leaderboard
        this.setSorter();

      }

      let minLength = Math.min(this.tournamentLeaderboard()?.length, this.bonus?.length);

      for (let i = 0; i < minLength; i++) {
        this.tournamentLeaderboard()[i].Bonus = this.bonus[i];
      }

    })
  }

  rearrange() {
    setTimeout(() => {
      this.items.forEach((item: ElementRef, i: number) => {
        const element = item.nativeElement as HTMLElement;
        const topValue = i * this.OFFSET_Y;


        element.style.top = `${topValue}px`;

        element.classList.add('moving');

        element.addEventListener('transitionend', function () {
          element.classList.remove('moving');
        });
      });
    }, 1500);
  }

 /* setSorter() {
    this.tournamentLeaderboard.update(tournamentLeaderboard => tournamentLeaderboard.sort((a, b) => b[this.sorter].localeCompare(a[this.sorter])));
    this.rearrange();
  }*/

  /*setSorter() {
    this.tournamentLeaderboard()?.sort((a, b) => b[this.sorter] - a[this.sorter]);
    this.rearrange();
  }*/

  setSorter() {
    const t =  this.tournamentLeaderboard();
    t.sort((a, b) => b['Points'] - a['Points']);
    this.tournamentLeaderboard.set(t);
    this.rearrange();
  }
}

