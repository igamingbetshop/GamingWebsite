import {Component, computed, DestroyRef, inject, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {FortunaFragmentComponent} from "../fortuna-fragment/fortuna-fragment.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BonusesService} from "@core/services/api/bonuses.service";
import {Bonus} from "@core/models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ConfigService} from "@core/services";

export type Slice = {
  id: number;
  transform: string;
  label:number;
  iconSrc:string;
};

type Results = {
  id: number;
  label:number;
};

type KeyValue = {
  Key: number;
  Value:number;
};

export type WinnerInfo = {
  ClientId:number;
  Name:string;
}

@Component({
  selector: 'slot-wheel',
  templateUrl: './slot-wheel.component.html',
  styleUrls:["./slot-wheel.component.scss"],
  imports: [CommonModule, TranslateModule, RouterModule, FortunaFragmentComponent],
  standalone:true,
})

export class SlotWheelComponent {
  data:any = inject(MAT_DIALOG_DATA, {optional:true});
  route = inject(ActivatedRoute);
  config = inject(ConfigService);
  dialogRef = inject(MatDialogRef<SlotWheelComponent>, {optional:true});
  bonusId = this.data ? this.data.bonusId : this.route.snapshot.queryParams.bonusId;
  id = this.data ? this.data.id : this.route.snapshot.queryParams.id;
  bonusInfo: any = {};
  slices = signal<Slice[]>([]);
  results = signal<Results[]>([]);
  ready = computed(() => this.slices().length > 0);
  winnersInfo = signal<WinnerInfo[]>([]);
  wheelDiameter =  window.matchMedia('(max-width: 1200px)').matches ? (window.innerWidth - 60) : 450;
  private destroyRef = inject(DestroyRef);


  constructor(private bonusService:BonusesService)
  {
    if(this.bonusId)
    {
      const bonus = new Bonus();
      bonus.BonusId = +this.bonusId;
      bonus.ReuseNumber = this.data ? this.data.reuseNumber : 1;
      this.bonusService.getTriggers(bonus).pipe(takeUntilDestroyed()).subscribe(data => {

        const length =  data.Bonus.ConnectedBonuses?.length;

        if(length)
        {
          const angle = 360 / length;
          const slices:Slice[] = data.Bonus.ConnectedBonuses.map((el:KeyValue, index:number) => {
            return {
              id: el.Key,
              transform: `translateX(-50%) rotate(${index * angle}deg`,
              label:el.Value,
              iconSrc:`${window.location.protocol}//${this.config.defaultOptions.Domain}/assets/images/bonuses/${el.Key}.png`
            }
          });
          this.slices.set(slices);
        }
        this.bonusInfo = data.Bonus;
      });
     this.getBonusWinnersInfo({BonusId: +this.bonusId});
    }
  }
  close()
  {
    this.dialogRef.close();
  }

  updateWinnersInfo()
  {
    this.getBonusWinnersInfo({BonusId: +this.bonusId})
  }

  getBonusWinnersInfo(bonus:any)
  {
    this.bonusService.getBonusWinnersInfo(bonus).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {
      if(data.ResponseCode === 0)
      {
        this.winnersInfo.set(data.ResponseObject);
      }
    });
  }
}
