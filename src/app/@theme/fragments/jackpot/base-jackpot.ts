import {Directive, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Controllers, Methods} from "../../../@core/enums";
import {take} from "rxjs/operators";
import {getMappedGame} from "../../../@core/utils";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {FragmentData} from "../../../@core/models";
import {Overlay} from "@angular/cdk/overlay";

@Directive()
export class BaseJackpot implements OnInit, OnDestroy
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    jackpotGames: any[] = [];
    public openPopupIndex : number | null = null;
    public logoPosition:any;
    public style:any;
    private subscription:Subscription;

    constructor(protected injector:Injector,
                private baseApiService: BaseApiService,
                public overlay: Overlay)
    {

    }

    ngOnInit()
    {
       /* this.getGames({PageSize:50});*/
        this.subscription = new Subscription();
        this.logoPosition = this.fragmentConfig?.Config.logoPosition;
        this.style = this.fragmentConfig?.Config.style;
        this.getJackpot()
    }

   /* getGames(filter, concatData = false): void
    {
        this.apiService.apiRequest(filter,undefined, Methods.GET_GAMES, false).pipe(take(1))
            .subscribe(data => {
                if (data.ResponseCode === 0)
                {
                    const games = data.ResponseObject.Games.map(game => {
                        game = getMappedGame(game);
                        return game;
                    });
                    this.games = concatData ? [...this.games, ...games] : games;
                }
            });
    }*/

    getJackpot(){
        this.baseApiService.apiPost("",{Controller:Controllers.MAIN}, Methods.GET_JACKPOTS,false).pipe(take(1)).subscribe(data => {
            this.jackpotGames = data['ResponseObject'];});
    }


    showGamesPopup(index){
        this.openPopupIndex  = index
    }

    closeGamesPopup(){
        this.openPopupIndex  = null
    }


    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }
}
