import {
  ChangeDetectionStrategy,
  Component, DestroyRef, ElementRef, inject, Input, input, OnInit, QueryList, signal, ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Methods} from "@core/enums";
import {Subscription, take, timer} from "rxjs";
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
  #config = inject(ConfigService);
  #destroyRef = inject(DestroyRef).onDestroy(() =>  {
    if(this.timerSubscription.length)
      this.timerSubscription.forEach(el => el.unsubscribe());
  });
  tournamentLeaderboard  = signal<any[]>([]);
  timerSubscription:Subscription[] = [];
  tournamentId = input(0, {transform: (tournamentId:number) => {

    if(tournamentId)
    {
      if(this.timerSubscription.length)
        this.timerSubscription.forEach(el => el.unsubscribe());

      this.timerSubscription.push(timer(0, 60000).subscribe(tick => {
        this.getSlotTournamentLeaderboard(tournamentId)
      }));
    }
    return tournamentId;
    }})

  @Input() bonus;

  ngOnInit() {
    this.setSorter();
    this.currencyId = this.#config.defaultOptions.CurrencySymbol
  }

  getSlotTournamentLeaderboard(tournamentId: number){
    this.#baseApiService.apiGet(Methods.GET_TOURNAMENT_LEADERBOARD, {RequestData:tournamentId}).pipe(take(1)).subscribe(data => {
      if(data['ResponseCode'] === 0)
      {
        if(this.tournamentLeaderboard().length == 0) {
          this.tournamentLeaderboard.set(data['ResponseObject']);
        } else  {
          const newItems = data['ResponseObject'];

         /* const newItems = [
            { Order: 11, Name: 'Has', Points:  Math.floor(Math.random() * (400 - 10 + 1)) + 10},
            { Order: 2, Name: 'New Player', Points: Math.floor(Math.random() * (400 - 10 + 1)) + 10},
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
        this.setSorter();


      }
    })
  }

  rearrange() {
    setTimeout(() => {
      this.items.forEach((item, idx) => {
        const element = item.nativeElement as HTMLElement;
        const newTop = idx * this.OFFSET_Y;
        const currentTop = parseInt(element.style.top) || 0;
        if (newTop != currentTop) {
          element.style.top = `${newTop}px`;
          element.classList.add('moving');
          element.addEventListener('transitionend', function() {
            element.classList.remove('moving');
          });
        }
      });
    }, 1500);
  }

  setSorter() {
    const t =  this.tournamentLeaderboard();
    t.sort((a, b) => b['Points'] - a['Points']);
    this.tournamentLeaderboard.set(t);
    this.rearrange();
  }

}

