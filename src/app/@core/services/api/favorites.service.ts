import { Injectable } from '@angular/core';
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable()
export class FavoritesService extends BaseApiService
{
  notifyGetFavorites:Subject<any> = new Subject();
  notifyAddFavorites:Subject<any> = new Subject();
  notifyRemoveFavorites:Subject<any> = new Subject();

  isFavoritesFetchedAndMapped:BehaviorSubject<boolean> = new BehaviorSubject(false);

  public toggleFavorite(input)
  {
    this.apiRequest(input.productId, Controllers.PRODUCT, input.isFavorite ? Methods.REMOVE_CLIENT_FAVORITE_PRODUCT : Methods.ADD_TO_FAVORITE_LIST).subscribe(data => {
      if(data.ResponseCode == 0)
      {
        if(input.isFavorite)
          this.notifyRemoveFavorites.next(data.ResponseObject);
        else this.notifyAddFavorites.next(data.ResponseObject);
        input.isFavorite = !input.isFavorite;
      }
    });
  }

  public getFavorites() {
    this.apiRequest(null, Controllers.PRODUCT, Methods.GET_CLIENT_FAVORITE_PRODUCTS).subscribe(data => {
      if(data.ResponseCode == 0)
      {
        this.notifyGetFavorites.next(data.ResponseObject);
      }
    });
  }
}
