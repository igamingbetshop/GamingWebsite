import {computed, DestroyRef, Directive, inject, Injector, input, OnInit, signal, WritableSignal} from "@angular/core";
import {Subscription, take, timer} from "rxjs";
import {SignalRService} from "@core/services/soket/signal-r.service";
import {getFakeAmountRangeByCurrency, getMappedGame, getRandomInt} from "@core/utils";
import {ConfigService} from "@core/services";
import {Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";
import {environment} from "../../../../environments/environment";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Directive()
export class BaseBetsWidgets implements OnInit
{
    itemConfig:any;
    fragmentConfig = input.required({transform: (data: any) => {
            this.itemConfig = data.Config.itemConfig;
            return data;
        }});

    showMore:WritableSignal<boolean> = signal<boolean>(false);
    bets:WritableSignal<any[]> = signal<any[]>([]);
    filteredBets = computed(() => this.showMore() ? this.bets() : this.bets().slice(0,10));
    private games: any[] = [];
    private subscriptions:Subscription;
    protected signalRService: SignalRService;
    private configService: ConfigService;
    private apiService: BaseApiService;
    private destroyRef = inject(DestroyRef);

    constructor(protected injector: Injector)
    {
        this.signalRService = injector.get(SignalRService);
        this.configService = injector.get(ConfigService);
        this.apiService = injector.get(BaseApiService);
    }

    ngOnInit()
    {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.signalRService.onUpdateWinWidget$.subscribe(data =>
        {
            data.ImageUrl = (data.ImageUrl && data.ImageUrl.startsWith('http')) ? data.ImageUrl : 'https://resources.' + environment.hostName + '/products/' + data.ImageUrl;
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

                }
            });
    }

    addFakeData(source:Array<any>, firstTime = false)
    {
        const arr = [];
        const count = firstTime ? 20 : 10;
        for (let i = 0; i < count; i++)
        {
            const fakeItem = source[getRandomInt(0, source.length - 1)];
            let currencyId = this.configService.defaultOptions["Currencies"][getRandomInt(0, this.configService.defaultOptions["Currencies"].length - 1)];
            let item = {
                GameName: fakeItem["name"],
                ClientName: "U" + getRandomInt(1, 100000),
                CurrencyId: currencyId,
                ImageUrl: fakeItem.gameImage,
                ProductId: fakeItem.productId,
                Amount: getRandomInt(getFakeAmountRangeByCurrency(currencyId), getFakeAmountRangeByCurrency(currencyId) * 100),
                BetAmount: getRandomInt(getFakeAmountRangeByCurrency(currencyId), getFakeAmountRangeByCurrency(currencyId) * 100),
            };
            arr.push(item);
        }
        if(firstTime)
        {
            this.bets.set(arr);
            timer(0, 3000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tick => {
               this.addFakeData(this.games, false);
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
            this.bets().pop();
            this.bets.update(bets => [value, ...bets]);
        }
    }

    toggleShowMore(){
        this.showMore.set(!this.showMore());
    }
}