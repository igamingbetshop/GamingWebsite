import {Injectable} from '@angular/core';
import {Methods} from "../../../../@core/enums";
import {map} from "rxjs/operators";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {Observable, of} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class CasinoProvidersService
{
    currentFilter;
    providers:any = [];

    constructor(private apiService: BaseApiService,
                private translate: TranslateService)
    {

    }

    getProviders(filter?):Observable<any[]>
    {
        if(!this.isCategoryIdsChange(filter) && this.providers.length)
        {
            return of(this.providers);
        }
        else
        {
           this.currentFilter = filter;
           return  this.apiService.apiRequest(filter, undefined, Methods.GET_GAME_PROVIDERS, false).pipe(map(data => {
                if (data.ResponseCode === 0)
                {
                    this.providers = data.ResponseObject.Providers;
                    this.providers.unshift({Id:0,Name:this.translate.instant("Providers.All providers"), Label:this.translate.instant("Providers.All providers")});
                    return this.providers;
                }
            }));
        }
    }

    isCategoryIdsChange(filter?)
    {
        let hasChange = false;

        if(!this.currentFilter)
            return true;

        if(filter)
        {
            for(let i = 0; i < this.currentFilter.CategoryIds.length; i++)
            {
                if(this.currentFilter.CategoryIds[i] !== filter.CategoryIds[i])
                {
                    hasChange = true;
                    break;
                }
            }
        }
        else return true;

        return hasChange;
    }
}
