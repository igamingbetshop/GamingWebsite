import {Injectable, Injector} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../base/base.component";
import {ConfigService} from "@core/services";
import {TranslateService} from "@ngx-translate/core";
import {BannersService} from "@core/services/api/banners.service";
import {MenuType} from "@core/enums";

@Injectable()
export class BaseNewsComponent extends BaseComponent
{
  private route:ActivatedRoute;
  private configService:ConfigService;
  private translate: TranslateService;
  protected bannersService:BannersService;
  public router:Router;
  public paginationCount: number;
  public currentPage: number = 0;
  public page: number = 1;
  public itemsCountInRow: number;
  public news: Array<any> = [];
  public banners:Array<any> = [];

  public subMenuItems: Array<any> = [];

  constructor(public injector: Injector, )
  {
    super(injector);
    this.route = injector.get(ActivatedRoute);
    this.configService = injector.get(ConfigService);
    this.translate = injector.get(TranslateService);
    this.bannersService = injector.get(BannersService);
    this.router = injector.get(Router);
  }

  ngOnInit()
  {
    if (window.innerWidth >= 1200) {
      this.itemsCountInRow = 4;
    }
    else if (window.innerWidth >= 960){
      this.itemsCountInRow = 3;
    } else if (window.innerWidth >= 670) {
      this.itemsCountInRow = 3;
    } else {
      this.itemsCountInRow = 2;
    }

    this.paginationCount = this.itemsCountInRow * 2;

    let newsList = this.configService.settings.MenuList.find(item => item.Type == MenuType.NEWS_MENU);
    this.subMenuItems = newsList.Items.map(item => {
      let translatedItem = item;
      this.translate.get("News." + item.Title).subscribe((res: string) => {
        translatedItem.Title = res;
      });
      return translatedItem;
    });

    this.subscriptions.push(this.bannersService.getBanners(1).subscribe(data => {
      this.updateBanners(data)
    }));

    this.news = this.route.snapshot.data.data as Array<any>;
  }

  public updateBanners(data)
  {
    this.banners = data;
  }
}
