import {Directive, Injectable, Injector} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../base/base.component";
import {TranslateService} from "@ngx-translate/core";
import {News, NewsFragment} from "../../../../@core/models";
import {LangService} from "../../../../@core/services/app/lang.service";
import {HttpClient} from "@angular/common/http";
import {Controllers, Methods} from "../../../../@core/enums";
import {Subscription} from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";

@Directive()
export class BaseNewsComponent extends BaseComponent
{
  selectedIndex = 0;
  currentIndex = 0;
  public newsFragments:NewsFragment[] = [];
  selectedNewsId:number | string;
  latestNewsId:number | string;
  selectedFragment:NewsFragment;
  currentNews:News = new News();
  latestNews:any[] = [];
 /* public newsFragments:any[] = [
    1,2,3,4,5
  ];*/
  private route:ActivatedRoute;
  private translate: TranslateService;
  private languageService:LangService;
  private http:HttpClient;
  public router:Router;
  private subscription:Subscription = new Subscription();
  private baseApiService:BaseApiService;

  public subMenuItems: Array<any> = [];
  newsTypes:any = {
    0:'Sport',
    1:'Casino',
    2:'Live Casino',
    3:'Virtual Games',
    4:'Skill Games'
  }


  constructor(public injector: Injector, )
  {
    super(injector);
    this.route = injector.get(ActivatedRoute);
    this.translate = injector.get(TranslateService);
    this.languageService = injector.get(LangService);
    this.router = injector.get(Router);
    this.http = injector.get(HttpClient);
    this.baseApiService = injector.get(BaseApiService);
  }

  ngOnInit()
  {
    this.getNewsFragments()
    this.subscription.add(this.route.queryParams.subscribe(param => {
      this.selectedNewsId = param.id;
      if(this.selectedNewsId)
      {
        this.http.get<any>(window['debugPath'] + '/assets/json/news/' + param.id
            + '_' +  this.languageService.currentLangKey + '.json' + '?=' + window['VERSION']).subscribe(data => {
          this.currentNews.Content = data.content;
          this.currentNews.Title = data.title;
          this.currentNews.Description = data.description;
          this.currentNews.Id = data.id;
          this.currentNews.DeltaTime = this.timeAgo(data.startDate);
          this.currentNews.ImageName = data.image;
          this.currentNews.Type = data.type;
          window.scrollTo(0,0);
        })
      }
      if(this.newsFragments.length)
        this.selectFragmentByNewsId();
    }))
  }

  getNewsFragments()
  {
    this.subscription.add(this.baseApiService.apiRequest(undefined, Controllers.MAIN,Methods.GET_NEWS, false)
        .subscribe(data => {
          if(data.ResponseCode === 0)
          {
            this.newsFragments = data.ResponseObject.map(f => {
              f.News.forEach(n => {
                if(n.StyleType)
                  n.Style = JSON.parse(n.StyleType);
                if(n.StartDate)
                  n.DeltaTime = this.timeAgo(n.StartDate);
              });
              if(f.StyleType)
                f.Style = JSON.parse(f.StyleType);
              return f;
            });
            this.selectFragmentByNewsId();
          }
          for (let i = 0; i < this.newsFragments.length; i++)
          {
            const news = new News();
            news.Title = this.newsFragments[i].News[0].Title;
            news.Description = this.newsFragments[i].News[0].Description;
            news.Id = this.newsFragments[i].News[0].Id;
            news.StartDate = this.newsFragments[i].News[0].StartDate;
            news.ImageName = this.newsFragments[i].News[0].ImageName;
            news.Type = this.newsFragments[i].News[0].Type;
            this.latestNews.push({index:i, news:news});
          }
        }));
  }

  selectNews(index, news){
    this.latestNews.find(item => item.index === index).news = news;
  }

  private selectFragmentByNewsId()
  {
    this.selectedFragment = null;
    parentLoop:
        for (let i = 0; i < this.newsFragments.length; i++)
        {
          for (let j = 0; j < this.newsFragments[i].News.length; j++)
          {
            if(this.selectedNewsId == this.newsFragments[i].News[j].Id)
            {
              this.selectedFragment = this.newsFragments[i];
              break parentLoop;
            }
          }
        }
  }

  timeAgo(startDate) {

    let seconds = Math.floor((new Date().getTime() - new Date(startDate).getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  currentSlide(index) {
    let i;
    let slides = Array.from(document.getElementsByClassName("product-list") as HTMLCollectionOf<HTMLElement>);
    this.currentIndex = index;

    for (i = 0; i < slides.length; i++){
      slides[i]['style']['display'] = "none";
      slides[i]['style']['width'] = "100vw";
      slides[i]['style']['animation-duration'] = ".3s";
    }

    slides[index]['style']['display'] = "grid";
  }


  public navigateFragment(index): void
  {
    this.selectedIndex = index;
    const slides = Array.from(document.querySelectorAll('.latest-news-block'));
    let box = document.querySelector('.latest-news-section');
    const scrollElem = slides[index];

    box.scrollLeft = scrollElem['offsetLeft'];
  }


}
