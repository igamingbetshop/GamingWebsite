import { Injectable } from '@angular/core';
import { ConfigService } from '../app/config.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DefaultService {
  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  public getSettings() {
    return this.configService.defaultOptions;
  }

  defaultRequest(input) {
    const { WebApiUrl, PartnerId } = this.getSettings();
    return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, input, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).toPromise();
  }
}
