import {Component, input, signal, ViewEncapsulation} from '@angular/core';
import {BonusesService} from "../../../../../../../@core/services/api/bonuses.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {Bonus} from "@core/models";
import {SlotWheelComponent} from "../slot-wheel/slot-wheel.component";
import {UserLogined} from "@core/services/app/userLogined.service";
import {SaveData} from "@core/services";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {MenuType} from "@core/enums";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'spin-wheel-opener',
  templateUrl: './spin-wheel-opener.component.html',
  styleUrls:["./spin-wheel-opener.component.scss"],
  imports: [SlotWheelComponent, TranslateModule],
  standalone:true,
  encapsulation:ViewEncapsulation.None
})

export class SpinWheelOpenerComponent {

  menuItem = input.required<any>();
  bonus:Bonus;
  showError = signal<boolean>(false);
  #hideSpinWheelResults:boolean = false;

  constructor(private bonusService:BonusesService,
              private dialog:MatDialog,
              private userLogin:UserLogined,
              private baseControllerService:BaseControllerService,
              private savedData:SaveData)
  {
    if(this.userLogin.isAuthenticated)
    {
      this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST).then((data: any) =>
      {
        const bonusDetails = data.find((item) => item.Title == 'MyBonusesDetails');
        if(bonusDetails.StyleType)
          this.#hideSpinWheelResults = JSON.parse(bonusDetails.StyleType).hideSpinWheelResults;
      });
      this.bonusService.GetBonuses({PlatformId:2, ProductId:1});
      this.bonusService.notifyGetBonuses.pipe(takeUntilDestroyed()).subscribe(bonuses => {
        this.bonus = bonuses.find((bonus:Bonus) => bonus.TypeId === 4 && bonus.StatusId === 1);
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
        if(this.bonus.TypeId === 4 && this.bonus.StatusId === 1)
          this.dialog.open(SlotWheelComponent, {data:{title: 'slot-wheel', bonusId:this.bonus.BonusId, id:this.bonus.Id, hideSpinWheelResults:this.#hideSpinWheelResults, reuseNumber:this.bonus.ReuseNumber}});
        else
        {
          this.showError.set(true);
          const p = setTimeout(() => {
            this.showError.set(false);
          }, 3000);
        }
      }
    }
    else
    {
      this.savedData.openPopup.next("1");
    }
  }
}
