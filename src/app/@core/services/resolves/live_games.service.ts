import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ConfigService} from '../app/config.service';


@Injectable()
export class LiveGamesResolve implements Resolve<any> {
  constructor(private configService: ConfigService) {}


  resolve(route: ActivatedRouteSnapshot): Promise<any> | any {
    let sendData  = {
      "games": this.configService.products,
      "gamesType": "live-casino"
    }

    return sendData;
  }

}
