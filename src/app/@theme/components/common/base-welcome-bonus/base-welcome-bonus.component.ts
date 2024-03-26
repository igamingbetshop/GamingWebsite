import {Injector, Directive, inject} from '@angular/core';
import {ConfigService} from "@core/services";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";
import {UserLogined} from "@core/services/app/userLogined.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Directive()

export  class BaseWelcomeBonusComponent  {
  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<BaseWelcomeBonusComponent>);
  public chosenBonusCard:any;
  public welcomeBonusActivationKey:any;
  public bonusCards = [
    {
      'Id':0,
      "Flipped": false,
      "Amount": 0
    },
    {
      'Id':1,
      "Flipped": false,
      "Amount": 0
    },
    {
      'Id':2,
      "Flipped": false,
      "Amount": 0
    },
    {
      'Id':3,
      "Flipped": false,
      "Amount": 0
    }
  ];

  private baseApiService: BaseApiService;
  private configService: ConfigService;
  public loginService:UserLogined;

  constructor(public injector: Injector) {
    this.baseApiService = injector.get(BaseApiService);
    this.configService = injector.get(ConfigService);
    this.loginService = injector.get(UserLogined);
  }

  flipCard(card)
  {
    let data = {
      "Index": card.Id,
      "ActivationKey": this.data.welcomeBonusActivationKey,
    };

    this.baseApiService.apiRequest(data, Controllers.MAIN, Methods.GET_WELCOME_BONUS, false).subscribe(data =>
    {
      if(data.ResponseCode == 0)
      {
        this.bonusCards.forEach((card, key) => {
          card.Amount = data.ResponseObject[key]
        });
        card.Flipped = true;
        this.chosenBonusCard = card;
        this.flipAllCards();
      }
    });
  }

  flipAllCards()
  {
    setTimeout(() => {
      this.bonusCards.forEach(card =>
      {
        card.Flipped = true;
      })
    }, 2000)
  }

  refuseBonus()
  {
    this.chosenBonusCard = null;
    this.dialogRef.close();
  }

  addBonusToBalance()
  {

  }
}
