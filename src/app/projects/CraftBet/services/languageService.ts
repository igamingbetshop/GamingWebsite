import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";


@Injectable()
export class LanguageService {

  public languages: Array<any> = [];
  public privacyTexts : Array<any> = [];
  public termsTexts: Array<any> = [];
  public notifyOnTextGet: EventEmitter<boolean> = new EventEmitter();
  public baseUrl: string;

  public notifyGetPageText: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private translateService:TranslateService) {
    const arr = window.location.href.split('/');
    this.baseUrl = arr[0] + '//' + arr[2];
  }

  public loadnew(type)
  {
    this.http.get(window['debugPath'] + `/assets/json/translations/${this.translateService.currentLang}.json`).toPromise().then((resp: any) => {
      if(resp) {
        this.notifyGetPageText.emit(Object.keys(resp[type]));
      }
    });
  }
}
