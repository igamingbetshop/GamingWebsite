import {Directive, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {take} from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {ConfigService, LocalStorageService} from "../../../../@core/services";
import {UserLogined} from "../../../../@core/services/app/userLogined.service";
import {CharacterHierarchySource, FragmentData} from "../../../../@core/models";
import {Controllers, Methods} from "../../../../@core/enums";
import {DeviceDetectorService} from "ngx-device-detector";

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
    public deviceDetectorService: DeviceDetectorService;
    public lastItem:any;
    public currentItem:any;
    public currentCompPoint:number;
    public page: number = 1;
    public itemCount:number;

    constructor(protected injector:Injector)
    {
        this.configService = injector.get(ConfigService);
        this.userLogined = injector.get(UserLogined);
        this.baseApiService = injector.get(BaseApiService);
        this.localStorageService = injector.get(LocalStorageService);
        this.deviceDetectorService = injector.get(DeviceDetectorService);
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
            const input = {
                'IsForMobile': (this.deviceDetectorService.isMobile() || this.deviceDetectorService.isTablet()),
            };
            this.baseApiService.apiRequest("",Controllers.MAIN, Methods.GET_CHARACTERS_HIERARCHY, false, input).pipe(take(1)).subscribe(data => {
                this.characterHierarchy = data['ResponseObject'];

                parentLoop:
                    for(let i = 0; i < this.characterHierarchy.length; i++)
                    {
                        for(let k = 0; k < this.characterHierarchy[i].Children.length; k++)
                        {
                            if(this.characterHierarchy[i].Children[k].Id === this.userLogined.user.CharacterId)
                            {
                                this.characterHierarchy[i].Children[k].Selected = true;
                                this.currentCompPoint = this.characterHierarchy[i].Children[k].CompPoints;
                                this.currentItem = this.characterHierarchy[i].Children[k];
                                this.selfHierarchy = [...this.characterHierarchy[i].Children];
                                if(this.characterHierarchy[i].Children[k].ParentId === this.characterHierarchy[i].Parent.Id){
                                    this.itemCount = parseInt(this.characterHierarchy[i].Parent.NickName) || 5;
                                }
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
