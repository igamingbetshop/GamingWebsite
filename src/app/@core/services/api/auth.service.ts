import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../app/config.service';
import {encryptData} from "@core/utils";
import {DownLineClient} from "../../../@theme/components/clients/clients.component";

@Injectable()
export class AuthService
{

    constructor(private http: HttpClient,
                private configService: ConfigService)
    {

    }

    public getSettings()
    {
        return this.configService.defaultOptions;
    }

    login(params) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        params.LanguageId = localStorage.getItem('lang') || 'en';
        const data = encryptData(params);
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/LoginClient`, {Data: data}).toPromise();
    }

    registration(params) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        params.LanguageId = localStorage.getItem('lang') || 'en';
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/RegisterClient`, params);
    }

    quickSmsRegistration(params) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        params.LanguageId = localStorage.getItem('lang') || 'en';
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/QuickSmsRegistration`, params);
    }

    quickEmailRegistration(params) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        params.LanguageId = localStorage.getItem('lang') || 'en';
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/QuickEmailRegistration`, params);
    }

    public getProductUrl(input) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        input.LanguageId = localStorage.getItem('lang') || 'en';
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetProductUrl`, input).toPromise();
    }

    public getProductInfo(input) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        input.PartnerId = PartnerId;
        input.LanguageId = localStorage.getItem('lang') || 'en';
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetProductInfo`, input).toPromise();
    }

    public getRegion(input) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        input.PartnerId = PartnerId;
        input.LanguageId = localStorage.getItem('lang') || 'en';
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetRegions`, input).toPromise();
    }

    public getJobAreas() {
        const {WebApiUrl, PartnerId} = this.getSettings(),
            input = {
                PartnerId: PartnerId,
                LanguageId: localStorage.getItem('lang') || 'en'
            };
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetJobAreas`, input).toPromise();
    }

    public getReferralTypes() {
        const {WebApiUrl, PartnerId} = this.getSettings(),
            input = {
                PartnerId: PartnerId,
                LanguageId: localStorage.getItem('lang') || 'en'
            };
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetReferralTypes`, input).toPromise();
    }

    public getExclusionReasons() {
        const {WebApiUrl, PartnerId} = this.getSettings(),
            input = {
                PartnerId: PartnerId,
                LanguageId: localStorage.getItem('lang') || 'en'
            };
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetExclusionReasons`, input).toPromise();
    }
}
