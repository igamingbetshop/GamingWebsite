import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigService } from '../app/config.service';

@Injectable()
export class PaymentsService {

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  public getSettings() {
    return this.configService.defaultOptions;
  }

  public changePassword(input) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, input).toPromise();
  }

  public getPaymentSystem(input) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetPartnerPaymentSystems`, input, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).toPromise();
  }


  public defaultRequest(input) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, input).toPromise();
  }

  public GetPartnerBetShops(input) {
    const {WebApiUrl, PartnerId} = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetPartnerBetShops`, input).toPromise();
  }

}
