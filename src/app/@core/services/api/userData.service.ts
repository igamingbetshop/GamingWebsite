import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../app/config.service';
import {Request} from "@core/models";
import {Controllers, Methods} from "@core/enums";
import {LocalStorageService} from "@core/services/app/localStorage.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserDataService {

  public userData: any;
  public notifyUpdateUserMessages:BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private configService: ConfigService)
  {
    this.userData = this.localStorageService.get("user");
  }

  public getSettings() {
    return this.configService.defaultOptions;
  }

  getBalance(params) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetClientBalance`, params).toPromise();
  }

  getrecoverPassword(params) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/RecoverPassword`, params);
  }

  recoveryToken(params) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/SendRecoveryToken`, params).toPromise();
  }

  sendRecoveryToken(params)
  {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/SendRecoveryToken`, params);
  }

  /*Remove this function and get client states from tickets services*/
  getClientStates() {
    const {WebApiUrl, PartnerId} = this.getSettings();
    let request = new Request();
    request.Token = this.userData.Token;
    request.ClientId = this.userData.Id;
    request.PartnerId = PartnerId;
    request.Loader = false;
    request.Controller = Controllers.CLIENT;
    request.Method = Methods.GET_CLIENT_STATES;
    this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
      if(data.ResponseCode == 0)
        this.notifyUpdateUserMessages.next(data);
    });
  }

 /* verifyClientEmail(params) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/SendRecoveryToken`, params).toPromise();
  }*/
}
