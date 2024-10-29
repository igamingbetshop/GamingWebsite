import {
    ApplicationRef,
    computed,
    DestroyRef,
    Directive, EnvironmentInjector,
    inject,
    Injector,
    input,
    OnInit,
    signal,
    WritableSignal
} from "@angular/core";
import {Subscription, take, timer} from "rxjs";
import {SignalRService} from "@core/services/soket/signal-r.service";
import {getFakeAmountRangeByCurrency, getMappedGame, getRandomInt, getRandomUpcomingDate} from "@core/utils";
import {ConfigService} from "@core/services";
import {Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";
import {environment} from "../../../../environments/environment";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {Image} from "../profile/profile-image/profile-image.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLogined} from "@core/services/app/userLogined.service";
import {Tournament} from "@core/interfaces";

export type Bet = {
    BetId:number,
    Amount:number,
    BetAmount:number,
    ProductId:number,
    ClientName:string,
    CurrencyId:string,
    CurrencyIcon:string,
    GameName:string,
    ImageUrl:string,
    ProductName:string,
    Hidden:boolean,
    Multiplayer:number | string;
    Date:Date
}

@Directive()
export class BaseBetsWidgets implements OnInit
{
    itemConfig:any;
    fragmentConfig = input.required({transform: (data: any) => {
            this.itemConfig = data.Config.itemConfig;
            return data;
        }});

    showMore:WritableSignal<boolean> = signal<boolean>(false);
    bets = signal<Bet[]>([]);
    filteredBets = computed(() => this.showMore() ? this.bets() : this.bets().slice(0,10));
    activeTournaments = signal<Tournament[]>([]);
    currentTournament = signal<Tournament>({Id:0,Name:'',PrizePool:0,CurrencyId:'',FinishTime:new Date(),StartTime:new Date(),Info:'',Bonus:[]});
    private games: any[] = [];
    private subscriptions:Subscription;
    protected signalRService: SignalRService;
    configService: ConfigService;
    private apiService: BaseApiService;
    public userLogined: UserLogined;
    private destroyRef = inject(DestroyRef);
    #dialog = inject(MatDialog);
    #blockFakeUpdate:boolean = false;
    #blockUpdatePromise:any;
    #route = inject(ActivatedRoute);
    #currentBet:Bet;

    constructor(protected injector: Injector, public router: Router,  public appRef: ApplicationRef,public environmentInjector: EnvironmentInjector)
    {
        this.signalRService = injector.get(SignalRService);
        this.configService = injector.get(ConfigService);
        this.apiService = injector.get(BaseApiService);
        this.userLogined = injector.get(UserLogined);
    }

    ngOnInit()
    {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.signalRService.onUpdateWinWidget$.subscribe((data:Bet) =>
        {
            data.ImageUrl = (data.ImageUrl && data.ImageUrl.startsWith('http')) ? data.ImageUrl : 'https://resources.' + environment.hostName + '/products/' + data.ImageUrl;
            data.CurrencyIcon = `${window['debugPath']}/assets/images/currencies/${data?.CurrencyId}.svg`;
            data.Date = new Date();
            this.#checkFakeUpdate();
            this.updateBets(data);
        }));
        this.getGames();
    }

    getGames(): void
    {
        const input = {
            PageIndex: 0,
            PageSize: 1000,
        };
        this.apiService.apiRequest(input, undefined, Methods.GET_GAMES, false).pipe(take(1))
            .subscribe(data => {
                if (data.ResponseCode === 0)
                {
                    this.games = data.ResponseObject.Games.map(game => {
                        game = getMappedGame(game);
                        return game;
                    });
                    this.addFakeData(this.games, true);
                    this.#openCurrentBet();
                }
            });
    }

    addFakeData(source:Array<any>, firstTime = false)
    {
        const arr = [];
        const count = firstTime ? 40 : 10;
        for (let i = 0; i < count; i++)
        {
            const fakeItem = source[getRandomInt(0, source.length - 1)];
            let currencyId = this.configService.defaultOptions["Currencies"][getRandomInt(0, this.configService.defaultOptions["Currencies"].length - 1)];
            let item:Bet = {
                GameName: fakeItem["name"],
                ProductName: fakeItem["name"],
                ClientName: "U" + getRandomInt(1, 100000),
                CurrencyId: currencyId,
                CurrencyIcon: `${window['debugPath']}/assets/images/currencies/${currencyId}.svg`,
                ImageUrl: fakeItem.gameImage,
                ProductId: fakeItem.productId,
                BetId:0,
                Hidden:true,
                Date:getRandomUpcomingDate(),
                Amount: getRandomInt(getFakeAmountRangeByCurrency(currencyId), getFakeAmountRangeByCurrency(currencyId) * 100),
                BetAmount: getRandomInt(getFakeAmountRangeByCurrency(currencyId), getFakeAmountRangeByCurrency(currencyId) * 100),
                Multiplayer:1
            };
            item.Multiplayer = (item.Amount / item.BetAmount).toFixed(2);
            arr.push(item);
        }
        if(firstTime)
        {
            this.bets.set(arr);
            timer(0, 3000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tick => {
                if(!this.#blockFakeUpdate)
                {
                    this.addFakeData(this.games, false);
                }
            });
        }
        else
        {
            this.updateBets(arr);
        }
    }

    private updateBets(value:any)
    {
        if(value instanceof Array)
        {
            this.bets().splice(this.bets().length - 10, 10);
            this.bets.update(bets => [...value, ...bets]);
        }
        else
        {
            value.Multiplayer = (value.Amount / value.BetAmount).toFixed(2);
            this.bets().pop();
            this.bets.update(bets => [value, ...bets]);
        }
    }

    toggleShowMore(){
        this.showMore.set(!this.showMore());
    }

    async openBetWidgetInfo(bet:Bet)
    {
        const {BetsWidgetInfoComponent} = await import('./bets-widget-info/bets-widget-info.component');
        this.#dialog.open(BetsWidgetInfoComponent, {data:{ bet: bet}}).afterClosed().subscribe((data:Image) => {
            if(data)
            {

            }
        });
    }


    async openBetStatistics(bet:Bet)
    {
        const {BetStatisticsComponent} = await import('./bet-statistics/bet-statistics.component');
        this.#dialog.open(BetStatisticsComponent, {data:{ bet: bet}}).afterClosed().subscribe((data:Image) => {
        });
    }

    async openRaceLeaderboard(tournament)
    {
        const {RaceLeaderboardComponent} = await import('./race-leaderboard/race-leaderboard.component');
        this.#dialog.open(RaceLeaderboardComponent, {data:{
                tournaments:tournament,
            }, hasBackdrop:true}).afterClosed().subscribe((result) => {

          });
    }

    getActiveTournament() {
        this.apiService.apiGet(Methods.GET_ACTIVE_TOURNAMENTS, {Loader:'false'}).subscribe(data => {
            const responseObject = data['ResponseObject'];
            if (data['ResponseCode'] === 0) {
                const tournaments = responseObject.map((el: Tournament) => {
                    el.StartTime = new Date(el.StartTime);
                    el.FinishTime = new Date(el.FinishTime);
                    return el;
                });

                this.activeTournaments.set(tournaments);

                for(let i = 0; i < tournaments.length; i++)
                {
                    tournaments[i].FormatedStartTime = this.convertStartTime(tournaments[i].StartTime);
                    tournaments[i].FormatedFinishTime = this.convertFinishTime(tournaments[i].FinishTime);
                }
            }
        });
    }


    convertStartTime(time: Date) {

        let seconds = Math.floor((new Date().getTime() - new Date(time).getTime()) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    convertFinishTime(time: Date) {

        let seconds = Math.floor((new Date(time).getTime() - new Date().getTime()) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }


    #checkFakeUpdate()
    {
        if(this.#blockUpdatePromise)
            clearTimeout(this.#blockUpdatePromise);

        this.#blockFakeUpdate = true;
        this.#blockUpdatePromise = setTimeout(() => {
            this.#blockFakeUpdate = false;
        }, 3000);
    }

    #openCurrentBet()
    {
        const betId = this.#route.snapshot.queryParams.bet;
        if(betId)
        {
            const bet = this.bets().find(b => b.BetId == betId);
            if(bet)
            {
                this.openBetWidgetInfo(bet);
            }
        }
    }
}