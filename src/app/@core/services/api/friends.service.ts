
import {map} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "@core/services/app/config.service";
import {Request} from "@core/models";
import {Controllers, Methods} from "@core/enums";
import {Observable} from "rxjs";
import {LocalStorageService} from "@core/services/app/localStorage.service";

@Injectable()
export class FriendsService
{
  public userData: any;
  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private configService: ConfigService)
  {
    this.userData = this.localStorageService.get("user");
  }

  public getSettings()
  {
    return this.configService.defaultOptions;
  }

  getFriends(range):Observable<any>
  {
    const {WebApiUrl, PartnerId} = this.getSettings();
    let request = new Request();
    request.Controller = Controllers.DOCUMENT;
    request.Method = Methods.GET_FRIENDS;
    request.TimeZone = this.configService.timeZone;
    request.Token = this.userData.Token;
    request.ClientId = this.userData.Id;
    request.PartnerId = PartnerId;
    request.RequestData = range;
    return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).pipe(map(data => {
      return data['ResponseCode'] == 0 ? data['ResponseObject'] : [];
    }));
  }

  inviteFriend(email):Observable<any>
  {
    const {WebApiUrl, PartnerId} = this.getSettings();
    let request = new Request();
    request.Controller = Controllers.CLIENT;
    request.Method = Methods.INVITE_FRIEND;
    request.TimeZone = this.configService.timeZone;
    request.Token = this.userData.Token;
    request.ClientId = this.userData.Id;
    request.PartnerId = PartnerId;
    request.RequestData = JSON.stringify({
      Email: email
    });
    return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request);
  }

  getClientStatus() {
    const {WebApiUrl, PartnerId} = this.getSettings();
    let request = new Request();
    request.Controller = Controllers.DOCUMENT;
    request.Method = Methods.GET_CLIENT_STATUSES;
    request.TimeZone = this.configService.timeZone;
    request.Token = this.userData.Token;
    request.ClientId = this.userData.Id;
    request.RequestData = '';
    return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).pipe(map(data => {
      return data['ResponseCode'] == 0 ? data['ResponseObject'] : [];
    }));
  }
}
