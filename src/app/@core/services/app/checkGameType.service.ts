import {Injectable,} from '@angular/core';
import {ConfigService} from "./config.service";
import {BaseControllerService} from './baseController.service';
import {from, Subject} from "rxjs";

@Injectable()
export class CheckGameTypeService {

  public notifyGetGamesList: Subject<any> = new Subject<any>();

  constructor(private configService: ConfigService, public baseControllerService: BaseControllerService)
  {
  }

  filterGameWithType(type):any {

    const resolveData = this.configService.products;
    const observable = from(this.baseControllerService.ReadProductList(resolveData));
    observable.subscribe((responseData: any[]) => {
      responseData.map((filterItem) => {
        if (filterItem.Key === type) {
          this.notifyGetGamesList.next(filterItem.Value);
          return filterItem.Value;
        }
      });
    });

  }

}
