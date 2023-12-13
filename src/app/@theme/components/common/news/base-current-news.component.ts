import {OnInit, Injector, Injectable} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {News} from "@core/models";


@Injectable()
export class BaseCurrentNewsComponent implements OnInit
{
  private route:ActivatedRoute;
  public promotions: Array<any> = [];
  public currentNews:News;

  constructor(public injector: Injector)
  {
    this.route = injector.get(ActivatedRoute);
  }

  ngOnInit()
  {
    let allPromotions = this.route.snapshot.data.data[0];

    this.promotions = (allPromotions as Array<any>).slice(0, 4);

    this.currentNews = new News();

    this.route.params.subscribe(routeParams =>
    {
      let currentNews = this.route.snapshot.data.data[1];
      this.currentNews.Content = currentNews.content;
      this.currentNews.Title = currentNews.title;
      this.currentNews.Description = currentNews.description;
      this.currentNews.Id = currentNews.id;
      this.currentNews.Date = currentNews.date;
      this.currentNews.Image = currentNews.image;
      window.scrollTo(0,0);
    });
  }
}
