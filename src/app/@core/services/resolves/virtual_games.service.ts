import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ConfigService} from '../app/config.service';
import {BaseControllerService} from "@core/services/app/baseController.service";

@Injectable()
export class VirtualGamesResolve implements Resolve<any> {
  constructor(private configService: ConfigService,
              private baseControllerService: BaseControllerService) {

  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | any {
    let sendData  = {
      "games": this.configService.products,
      "gamesType": "virtual-games"
    }
    return sendData;
  }

}
