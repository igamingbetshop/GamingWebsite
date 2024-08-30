import {map} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "@core/services/app/config.service";
import {Request} from "@core/models";
import {Controllers, Methods} from "@core/enums";
import {Observable} from "rxjs";
import {LocalStorageService} from "@core/services";
import {DeviceDetectorService} from "ngx-device-detector";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class BannersService {
  public bannersPath: any;
  public userData: any;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private configService: ConfigService,
              private deviceService: DeviceDetectorService,
              private router: Router) {
    this.bannersPath = window.location.protocol + '//' + this.getSettings().Domain + '/assets/images/b/';
    this.userData = this.localStorageService.get("user");
  }

  public getSettings() {
    return this.configService.defaultOptions;
  }

  getBanners(type): Observable<any> {
    const {WebApiUrl, PartnerId} = this.getSettings();
    let request = new Request();
    request.Controller = Controllers.CLIENT;
    request.Method = Methods.GET_IMAGES;
    request.TimeZone = this.configService.timeZone;
    request.LanguageId = localStorage.getItem('lang');
    if(this.userData)
    {
      request.Token =  this.userData.Token;
      request.ClientId = this.userData.Id;
    }
    else
    {
      request.Token =  "";
      request.ClientId = 0;
    }
    //request.Type = this.router.url.includes('category') ? (this.deviceService.isMobile() ? 200 : 100) + Number(type) : type;
    request.Type =  type;

    return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/GetImages`, request).pipe(map(data => {
      return data['ResponseCode'] == 0 ? data['ResponseObject'] : [];
    }));
  }
}
