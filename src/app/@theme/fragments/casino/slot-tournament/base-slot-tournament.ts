import {
    computed,
    Directive,
    ElementRef, inject,
    Injector,
    OnInit, QueryList,
    signal,
    ViewChildren,
    WritableSignal
} from "@angular/core";
import {Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";
import {LayoutService} from "@core/services/app/layout.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Tournament} from "@core/interfaces";
import {ConfigService} from "@core/services";

@Directive()
export class BaseSlotTournament implements OnInit
{
    @ViewChildren('tournament') items: QueryList<ElementRef>;

    showMore:WritableSignal<boolean> = signal<boolean>(false);
    filteredTournaments = computed(() => this.showMore() ? this.slotTournaments() : this.slotTournaments().slice(0,2));
    baseApiService:BaseApiService;
    layoutService:LayoutService;
    config:ConfigService
    public readonly router: Router;
    dialog = inject(MatDialog);
    timezone: any;
    currencyId:any;

    slotTournaments = signal<Tournament[]>([]);
    currentTournament = signal<Tournament>({Id:0,Name:'',PrizePool:0,CurrencyId:'',FinishTime:new Date(),StartTime:new Date(),Info:'',Bonus:[]});
    selectedTournamentId = computed(() => this.currentTournament()?.Id);

    constructor(protected injector:Injector, private el: ElementRef,)
    {
        this.baseApiService = injector.get(BaseApiService);
        this.layoutService = injector.get(LayoutService);
        this.config = injector.get(ConfigService);
        this.router = injector.get(Router);
    }

    ngOnInit()
    {
      this.getSlotTournament();
      this.startTimezone();
    }

    getSlotTournament(){
        this.baseApiService.apiGet(Methods.GET_ACTIVE_TOURNAMENTS,{Loader:'false'}).subscribe(data => {
            const responseObject = data['ResponseObject'];
            if(data['ResponseCode'] === 0){
                this.slotTournaments.set(responseObject.map((el:Tournament) => {
                    el.StartTime = new Date( el.StartTime);
                    el.FinishTime = new Date(el.FinishTime);
                    const arr = el.Info.split(',').map(info => parseInt(info));
                    el.Bonus = [];
                    el.CurrencyId = this.config.defaultOptions.CurrencySymbol

                    arr.forEach(item => {
                        const bonus = Math.floor(item * el.PrizePool / 100);
                        el.Bonus.push(bonus);
                    });
                    return el;
                }));
                this.updateCurrentTournament(this.slotTournaments()[0]);
            }
          });
    }

    updateCurrentTournament(tournament:any)
    {
        this.currentTournament.set(tournament);
    }

    toggleShowMore(){
        this.showMore.set(!this.showMore());
    }

    startTimezone()
    {
        const tz = this.config.timeZone <= 0 ? this.config.timeZone : "+" + this.config.timeZone;
        this.timezone = `(${tz}GMT)`;
    }
}



