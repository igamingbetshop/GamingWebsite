import {Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {getBasePathByEnvironment} from "@core/utils";

@Injectable()
export class OpenGameResolver implements Resolve<Observable<any>>
{
  constructor(private http: HttpClient) {}

  resolve()
  {
    return this.http.get(getBasePathByEnvironment() + '/assets/config/news.json');
  }
}
