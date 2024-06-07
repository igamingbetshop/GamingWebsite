import {Directive, Injector, input, OnInit} from "@angular/core";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {SignalRService} from "../../../@core/services/soket/signal-r.service";
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../../../@core/services";
import {Methods} from "../../../@core/enums";
import {Subscription, take} from "rxjs";
import {getFakeAmountRangeByCurrency, getMappedGame, getRandomInt} from "../../../@core/utils";


@Directive()
export class BaseWinnersWidgets implements OnInit
{
    itemConfig:any;
    fragmentConfig = input.required({transform: (data: any) => {
            this.itemConfig = data.Config.itemConfig;
            return data;
        }});

    public winners: any[] = [];

    protected isUpdated = false;
    protected currentSlideIndex = 0;
    public updatedData: any;

    public games: any[] = [];
    protected signalRService: SignalRService;
    private apiService: BaseApiService;
    private route: ActivatedRoute;
    private configService: ConfigService;
    private subscriptions:Subscription;

    constructor(protected injector: Injector)
    {
        this.apiService = injector.get(BaseApiService);
        this.signalRService = injector.get(SignalRService);
        this.route = injector.get(ActivatedRoute);
        this.configService = injector.get(ConfigService);
    }

    ngOnInit()
    {
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.signalRService.onUpdateWinWidget$.subscribe(data =>
        {
            this.updatedData = data;
            this.isUpdated = true;
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
                    this.addFakeSlideData(this.games);

                }
            });
    }

    addFakeSlideData(source: Array<any>)
    {
        for (let i = 0; i < 10; i++)
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
                CreationDate: new Date
            };
            this.winners.push(item);
        }
    }

    afterChangeSlide(event) {
        this.currentSlideIndex = event.currentSlide;

        if (this.isUpdated) {
            this.isUpdated = false;
            const index = this.currentSlideIndex - 1 > 0 ? this.currentSlideIndex - 1 : 9;
            this.winners[index].Amount = this.updatedData.Amount;
            this.winners[index].GameName = this.updatedData.GameName;
            this.winners[index].ClientName = this.updatedData.ClientName;
            this.winners[index].CurrencyId = this.updatedData.CurrencyId;
            this.winners[index].ProductId = this.updatedData.ProductId;
            this.winners[index].ImageUrl = this.updatedData.ImageUrl;
            this.winners[index].CreationDate = new Date;
        }
    }
}