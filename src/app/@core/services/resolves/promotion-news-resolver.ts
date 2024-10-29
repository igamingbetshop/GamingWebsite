import { ActivatedRouteSnapshot } from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, forkJoin} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {LangService} from "@core/services/app/lang.service";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";
import {map} from "rxjs/operators";

@Injectable()
export class PromotionNewsResolver 
{
  constructor(private http: HttpClient,
              private baseApiService:BaseApiService,
              private languageService:LangService) {}


  resolve(route: ActivatedRouteSnapshot)
  {
    switch (route.routeConfig.path)
    {
      case "promotions":
      case "special-offers":
      case "games/:type/:productId/:productName/:type/:rating":
      case "live-casino/:productId/:productName/:type/:rating":
        return this.baseApiService.apiRequest(undefined, Controllers.MAIN,Methods.GET_PROMOTIONS, false).pipe(map(data => data.ResponseObject));
      case "promotions/:id":
      case "special-offers/:id":
        let getPromotionById = this.http.get(window['debugPath'] + '/assets/json/promotions/' + route.params.id
          + '_' +  this.languageService.currentLangKey + '.json' + '?=' + window['VERSION']);

        let getPromotions = this.baseApiService.apiRequest(undefined, Controllers.MAIN,Methods.GET_PROMOTIONS, false).pipe(map(data => data.ResponseObject));

        return forkJoin([getPromotions, getPromotionById]);
      case "news":
        return this.http.get(window['debugPath'] + '/assets/json/news/list_' + this.languageService.currentLangKey + '.json' + '?=' + window['VERSION']);
      case "news/:id":
        let getNewsById = this.http.get(window['debugPath'] + '/assets/json/news/' + route.params.id
          + '_' +  this.languageService.currentLangKey + '.json' + '?=' + window['VERSION']);

        let getPromotionsForNews = this.baseApiService.apiRequest(undefined, Controllers.MAIN,Methods.GET_PROMOTIONS, false).pipe(map(data => data.ResponseObject));

        return forkJoin([getPromotionsForNews, getNewsById]);
      default:
        return null;
    }
  }
}
