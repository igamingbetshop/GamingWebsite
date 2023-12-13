import {Directive, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription, take} from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {ConfigService} from "../../../../@core/services";
import {UserLogined} from "../../../../@core/services/app/userLogined.service";
import {CharacterState, CharacterStateSourse, FragmentData} from "../../../../@core/models";
import {Controllers, Methods} from "../../../../@core/enums";

@Directive()
export class BaseProgressBar implements OnInit, OnDestroy
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    public progressTrack:number

    public characterCurrentState: CharacterStateSourse;
    public step:number;
    public percentage:any[] = [];


    protected userLogged:UserLogined;
    private subscription:Subscription;
    private apiService: BaseApiService;
    protected configService:ConfigService;
    public baseApiService:BaseApiService;


    constructor(protected injector:Injector)
    {
        this.apiService = injector.get(BaseApiService);
        this.configService = injector.get(ConfigService);
        this.userLogged = injector.get(UserLogined);
        this.baseApiService = injector.get(BaseApiService)
    }

    ngOnInit()
    {
        this.subscription = new Subscription();
        this.getCharacterCurrentState();
        this.userLogged.onCharacterUpdate$.subscribe(data => {
            this.getCharacterCurrentState();
        })
    }

    getCharacterCurrentState()
    {
        if(this.userLogged.user?.CharacterId)
        {
            this.baseApiService.apiRequest("", Controllers.CLIENT, Methods.GET_CHARACTER_CURRENT_STATE, true)
                .pipe(take(1)).subscribe(data => {
                this.characterCurrentState = data['ResponseObject'];
                if(this.characterCurrentState.Current == 0){
                    this.progressTrack = 0
                } else if(this.characterCurrentState.Next == null){
                    this.progressTrack = 100
                }else {
                    this.progressTrack = (this.characterCurrentState.Current / this.characterCurrentState.Next?.CompPoints) * 100;
                }
                this.step = Math.round((this.characterCurrentState?.Next.CompPoints  - this.characterCurrentState?.Previous.CompPoints) / 5);

                this.percentage = [this.characterCurrentState.Next?.CompPoints - this.step]
                for(let i = 0 ; i < 5; i++){
                    if(i !== 0){
                        this.percentage.push(this.percentage[i - 1] - this.step)
                    }
                }
            });
        }

    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }
}
