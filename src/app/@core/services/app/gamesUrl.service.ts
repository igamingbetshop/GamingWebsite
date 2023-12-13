import {Injectable, Injector} from '@angular/core';

import {DeviceDetectorService} from 'ngx-device-detector';
import {ConfigService, LocalStorageService} from "@core/services";
import {UserLogined} from "@core/services/app/userLogined.service";
import {HttpClient} from "@angular/common/http";
import {Subject, take} from "rxjs";

@Injectable()
export class GamesUrlService {

  public configService: ConfigService;
  public localStorageService: LocalStorageService;
  public userLogined: UserLogined;
  public deviceDetectorService: DeviceDetectorService;


  public defaultOption: any;
  public isLogined: boolean;
  public userData: any;
  private http: HttpClient;


  public notifyGetGameUrl: Subject<any> = new Subject<any>();


  constructor(public injector: Injector) {
    this.configService = injector.get(ConfigService);
    this.localStorageService = injector.get(LocalStorageService);
    this.userLogined = injector.get(UserLogined);
    this.deviceDetectorService = injector.get(DeviceDetectorService);
    this.http = injector.get(HttpClient);


    this.defaultOption = this.configService.defaultOptions;
    this.isLogined = this.userLogined.isAuthenticated;
    this.userData = this.localStorageService.get('user');
  }


  getGameUrl(sportPosition) {
    /*Get lang from localstorage*/
    const language = 'en';
    const data = {
      'IsForMobile': this.deviceDetectorService.isMobile(),
      'LanguageId': language,
      'PartnerId': this.defaultOption.PartnerId,
      'ProductId': this.defaultOption.ProductId,
      'Position': sportPosition,
      'TimeZone': this.configService.timeZone
    };

    if (this.isLogined) {
      data['Token'] = this.userData.Token;
      data['ClientId'] = this.userData.Id;
      data['IsForDemo'] = false;
    } else {
      data['IsForDemo'] = true;
    }

    this.getSportGames(data).pipe(take(1)).subscribe(data => {
      this.notifyGetGameUrl.next(data);
    });
  }

  public getSportGames(params)
  {
    const { WebApiUrl, PartnerId } = this.configService.defaultOptions;
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/GetProductUrl`, params);
  }


  /*
  ** Change with all projects (Get ProductId from route data)
  */

  getGameHref(productId, position, type = null)
  {
    let changedDeviceType = JSON.parse(localStorage.getItem('deviceType'));
    const language = localStorage.getItem('lang');
    let tabletSizeEditor = window.innerWidth <= 1024 ? true : false;
    const data = {
      'IsForMobile': changedDeviceType == '1' ? true : tabletSizeEditor,
      'LanguageId': language,
      'PartnerId': this.defaultOption.PartnerId,
      'ProductId': productId,
      'Position': position,
      'TimeZone': this.configService.timeZone
    };
    if (this.isLogined)
    {
      data['Token'] = this.userData.Token;
      data['ClientId'] = this.userData.Id;
      if(type !== null)
        data['IsForDemo'] = !type.toString().startsWith('real');
    }
    else
    {
      data['IsForDemo'] = true;
    }

    this.getSportGames(data).pipe(take(1)).subscribe(data => {
      this.notifyGetGameUrl.next(data);
    });
  }

}
