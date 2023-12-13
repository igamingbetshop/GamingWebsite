import {Directive, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {take} from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {ConfigService, LocalStorageService} from "../../../../@core/services";
import {UserLogined} from "../../../../@core/services/app/userLogined.service";
import {CharacterHierarchySource, FragmentData} from "../../../../@core/models";
import {Controllers, Methods} from "../../../../@core/enums";

@Directive()
export class BaseCharacterHierarchy implements OnInit, OnDestroy
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;

    public selfHierarchy:any[] = [];
    public characterHierarchy: Array<CharacterHierarchySource> = [];
    public userLogined:UserLogined;
    protected configService:ConfigService;
    public baseApiService:BaseApiService;
    private localStorageService:LocalStorageService;
    public lastItem:any;
    public currentCompPoint:number;

    constructor(protected injector:Injector)
    {
        this.configService = injector.get(ConfigService);
        this.userLogined = injector.get(UserLogined);
        this.baseApiService = injector.get(BaseApiService);
        this.localStorageService = injector.get(LocalStorageService)
    }

    ngOnInit()
    {
        this.getCharacterHierarchy();
        this.userLogined.onCharacterUpdate$.subscribe(data => {
            this.getCharacterHierarchy();
        })
    }

    public getCharacterHierarchy()
    {
        if(this.userLogined.user?.CharacterId)
        {
            this.baseApiService.apiPost("",{Controller:Controllers.MAIN}, Methods.GET_CHARACTERS_HIERARCHY, false).pipe(take(1)).subscribe(data => {
                this.characterHierarchy = data['ResponseObject'];

                parentLoop:
                    for(let i = 0; i < this.characterHierarchy.length; i++)
                    {
                        for(let k = 0; k < this.characterHierarchy[i].Children.length; k++)
                        {
                            if(this.characterHierarchy[i].Children[k].Id === this.userLogined.user.CharacterId)
                            {
                                this.characterHierarchy[i].Children[k].Selected = true;
                                this.currentCompPoint = this.characterHierarchy[i].Children[k].CompPoints
                                this.selfHierarchy = [...this.characterHierarchy[i].Children];
                                break parentLoop;
                            }
                        }

                    }
                this.lastItem = this.selfHierarchy[this.selfHierarchy.length - 1];
            });
        }
    }

    ngOnDestroy()
    {

    }
}
