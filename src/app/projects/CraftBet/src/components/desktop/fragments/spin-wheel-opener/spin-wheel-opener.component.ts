import {Component, input, ViewEncapsulation} from '@angular/core';
import {BonusesService} from "../../../../../../../@core/services/api/bonuses.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {Bonus} from "@core/models";
import {SlotWheelComponent} from "../slot-wheel/slot-wheel.component";
import {UserLogined} from "@core/services/app/userLogined.service";
import {SaveData} from "@core/services";

@Component({
  selector: 'spin-wheel-opener',
  templateUrl: './spin-wheel-opener.component.html',
  styleUrls:["./spin-wheel-opener.component.scss"],
  imports: [SlotWheelComponent],
  standalone:true,
  encapsulation:ViewEncapsulation.None
})

export class SpinWheelOpenerComponent {

  menuItem = input.required<any>();
  bonus:Bonus;

  constructor(private bonusService:BonusesService,
              private dialog:MatDialog,
              private userLogin:UserLogined,
              private savedData:SaveData)
  {
    if(this.userLogin.isAuthenticated)
    {
      this.bonusService.GetBonuses({PlatformId:2, ProductId:1});
      this.bonusService.notifyGetBonuses.pipe(takeUntilDestroyed()).subscribe(bonuses => {
        this.bonus = bonuses.find((bonus:Bonus) => bonus.TypeId === 4);
      });
    }
  }

  openBonus(event:MouseEvent)
  {
    event.stopPropagation();
    if(this.userLogin.isAuthenticated)
    {
      if(this.bonus)
      {
        this.dialog.open(SlotWheelComponent, {data:{title: 'slot-wheel', bonusId:this.bonus.BonusId, id:this.bonus.Id, reuseNumber:this.bonus.ReuseNumber}});
      }
    }
    else
    {
      this.savedData.openPopup.next("1");
    }
  }
}
