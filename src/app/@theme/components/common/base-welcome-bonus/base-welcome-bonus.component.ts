import {OnInit, Injector, OnDestroy, Injectable} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {ConfigService} from "@core/services";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";
import {UserLogined} from "@core/services/app/userLogined.service";

export interface ConfirmModel {
  title: string;
  message: boolean;
  data: any;
}

@Injectable()

export  class BaseWelcomeBonusComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit, OnDestroy {

  public title: string;
  public message: boolean;
  public data: any;
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
    super();
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
    this.close();
  }

  addBonusToBalance()
  {

  }

  ngOnInit()
  {

  }

  ngOnDestroy(): void
  {

  }

}
