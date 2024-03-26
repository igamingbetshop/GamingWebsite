import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {ConfigService} from '../app/config.service';


@Injectable()
export class LiveGamesResolve  {
  constructor(private configService: ConfigService) {}


  resolve(route: ActivatedRouteSnapshot): Promise<any> | any {
    let sendData  = {
      "games": this.configService.products,
      "gamesType": "live-casino"
    }

    return sendData;
  }

}
