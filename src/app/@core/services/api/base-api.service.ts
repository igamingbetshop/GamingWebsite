import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Request} from "@core/models";
import {Methods} from "@core/enums";
import {ConfigService} from "@core/services";
import {UserLogined} from "@core/services/app/userLogined.service";
import {isNotNullOrUndefined} from "@core/utils";

@Injectable()
export class BaseApiService
{
    languageKey: string;

    constructor(private http: HttpClient,
                private configService: ConfigService,
                private authService: UserLogined) {
        this.languageKey = localStorage.getItem('lang') || this.configService.defaultOptions.DefaultLanguage;
    }

    apiRequest(data: any, controller: string, method: string, isApiRequest: boolean = true, info:{} = {}) {
        const {
            WebApiUrl,
            PartnerId,
        } = this.configService.defaultOptions;

        let request: Request = new Request();
        request.PartnerId = PartnerId;
        request.TimeZone = this.configService.timeZone;
        request.LanguageId = this.languageKey;
        request.ProductId = data && data.ProductId ? data.ProductId : null;
        request.Method = method;
        request.Controller = controller;
        request.CategoryId = data && isNotNullOrUndefined(data.CategoryId) ? data.CategoryId : null;
        request.PageIndex = data && data.PageIndex ? data.PageIndex : 0;
        request.PageSize = data && data.PageSize ? data.PageSize : 100;
        request.ProviderIds = data && data.ProviderIds ? data.ProviderIds : [];
        request.CategoryIds = data && data.CategoryIds ? data.CategoryIds : [];
        request.Index = data && data.Index ? data.Index : null;
        request.ActivationKey = data && data.ActivationKey ? data.ActivationKey : null;
        request.MobileNumber = data && data.MobileNumber ? data.MobileNumber : null;
        request.Email = data && data.Email ? data.Email : null;
        request.Code = data && data.Code ? data.Code : null;
        request.Type = data && data.Type ? data.Type : null;
        request.ClientId = data && data.ClientId ? data.ClientId : null;
        request.PaymentInfo = data && data.PaymentInfo ? data.PaymentInfo : null;
        request.RequestData = typeof data == "object" ? JSON.stringify(data) : data;
        if (data?.Pattern) request.Pattern = data.Pattern;
        if (data?.Name) request.Name = data.Name;

        if (info) {
            Object.assign(request, info);
        }

        /*Authenticated fields*/
        if (this.authService.user)
        {
            request.ClientId = data?.ClientId || this.authService.user.Id;
            request.Token = data?.Token || this.authService.user.Token;
            request.TimeZone = this.configService.timeZone;
        }
        else delete request.ClientId;

        return this.http.post<any>(
            `${WebApiUrl}/${PartnerId}/api/Main/` + (isApiRequest ? Methods.API_REQUEST : method),
            request, {
                headers: new HttpHeaders({'Content-Type': 'application/json'}),
            });
    }

    apiGet(url:string, data = null, contentType:string = 'application/json')
    {
        let reqUrl:string;
        if(url.startsWith('http'))
        {
            reqUrl = url;
        }
        else
        {
            const {
                WebApiUrl,
                PartnerId,
            } = this.configService.defaultOptions;

            reqUrl = `${WebApiUrl}/${PartnerId}/api/Main/${url.toLowerCase()}`;
        }

        let params = new HttpParams();
        if (this.authService.user)
        {
            params = params.set('clientId', this.authService.user.Id.toString());
            params = params.set('token', this.authService.user.Token);
        }
        params = params.set('timeZone', this.configService.timeZone.toString());

        if(data)
        {
            Object.entries(data).forEach(([key, value])=> {
                if(value)
                    params = params.set(key.toLowerCase(), value.toString());
            });
        }
        const options:any = {params:params};
        if(contentType)
        {
            options.withCredentials = true;
            options.headers = new HttpHeaders({
                'Content-Type':  contentType
            });
        }
        return this.http.get<any>(reqUrl, options);
    }

    apiPost(url:string, data:any, method: string, isApiRequest: boolean = true)
    {
        const {
            WebApiUrl,
            PartnerId,
        } = this.configService.defaultOptions;

        if (this.authService.user)
        {
            if(!data.ClientId)
                data.ClientId = this.authService.user.Id;
            data.Token = this.authService.user.Token;
            data.TimeZone = this.configService.timeZone;
        }

        const requestUrl = url || `${WebApiUrl}/${PartnerId}/api/Main/` + (isApiRequest ? Methods.API_REQUEST : method);

        return this.http.post<any>(
            requestUrl,
            data, {
                headers: new HttpHeaders({'Content-Type': 'application/json'}),
            });
    }
}
