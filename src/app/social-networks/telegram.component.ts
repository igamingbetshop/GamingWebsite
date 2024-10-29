import {Component} from "@angular/core";
import {ConfigService, LocalStorageService} from "@core/services";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'telegram',
    template: ``,
    standalone:true
})
export class TelegramComponent{

    constructor(private config:ConfigService,
                private http: HttpClient,
                private localStorageService:LocalStorageService,
                private router:Router
                )
    {
        const  hash = location.href.split('#')[1];
        const  params = new URLSearchParams(hash);
        const  tgAuthResult = params.get('tgAuthResult');
        const {WebApiUrl, PartnerId} = this.config.defaultOptions;

        this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/TelegramAuth`, {Data: tgAuthResult}).subscribe(data =>
        {
            if(data.ResponseCode === 0)
            {
                this.localStorageService.add('user', data);
                this.router.navigate([this.config.defaultOptions.AfterLoginUrl], {replaceUrl:true}).then(r => {

                })
            }
        });
    }

}