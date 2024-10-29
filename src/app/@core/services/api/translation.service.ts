import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import {ConfigService} from "@core/services";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class TranslationService implements TranslateLoader {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getTranslation(lang: string): Observable<any>
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.configService.defaultOptions['WebApiUrl'] + '/' + this.configService.defaultOptions['PartnerId'] + '/api/Main/GetTranslations', JSON.stringify({
      PartnerId: this.configService.defaultOptions['PartnerId'],
      LanguageId: lang
    }), {headers: headers}).pipe(map(
        (response) => {
          return response['ResponseObject'];
        }
    ));
  }
}
