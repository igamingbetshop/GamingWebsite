import {Injectable, Injector} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';
import {Products} from "@core/enums";
import {isEmptyObject} from "@core/utils";
import {GamesUrlService} from "@core/services/app/gamesUrl.service";

@Injectable()
export class AppCommonSportsComponent extends BaseComponent {

  public route: ActivatedRoute;
  public gamesUrlService: GamesUrlService;

  public showIframe: boolean;
  public iframeUrl: string;

  currentProductId:number;

  constructor(public injector: Injector)
  {
    super(injector);
    this.route = injector.get(ActivatedRoute);
    this.gamesUrlService = injector.get(GamesUrlService);

    let productId = this.route.snapshot.params["productId"] || this.route.snapshot.data["productId"];
    let position = this.route.snapshot.data["position"];
    this.currentProductId = productId;
    this.gamesUrlService.getGameHref(productId, position);
  }

  ngOnInit()
  {
    this.subscriptions.push(this.gamesUrlService.notifyGetGameUrl.subscribe((resData) => {
      if( resData['ResponseCode'] === 0 ) {
        this.showIframe = true;
        this.iframeUrl = resData['ResponseObject'];
      } else {
        this.showIframe = false;
      }
    }));
    this.route.params.subscribe(params => {
      if(!isEmptyObject(params) && params.productId != Products.SPORTSBOOK)
      {
        this.currentProductId = params.productId;
        this.gamesUrlService.getGameHref(params.productId, params.position);
      }
    });
  }



}
