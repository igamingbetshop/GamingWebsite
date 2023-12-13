import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {CommonHomepageComponent} from "../../common/common-homepage/common-homepage.component";
import {TranslateService} from "@ngx-translate/core";
import {ConfigService} from "../../../../../../@core/services";

@Component({
  selector: 'app-app-homepage',
  templateUrl: './app-homepage.component.html',
  styleUrls: ['./app-homepage.component.scss']
})
export class AppHomepageComponent extends CommonHomepageComponent {
  public customStyleName = 'styleType';
  public gameProviderName: Array<any> = [];
  public configService: ConfigService;
  public defaultOptions: any;
  public commonItems:any[] = [];
  public screenSize;

  @ViewChild('productList', {static: true}) productListRef: ElementRef;
  slideConfig = {
    infinite: true,
    slidesToShow: 4,
    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 500,
    vertical: true,
    arrows: false,
  };
  slideConfig1: any = {
    infinite: true,
    slidesToShow: 4,
    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    vertical: false,
    arrows: true,
  };
  @ViewChild('slickCarousel', {static:true}) slickCarousel;
  private slidesUpdateIndex: number = 0;


  constructor(public injector: Injector, private translate: TranslateService) {
    super(injector);
    this.configService = injector.get(ConfigService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.screenSize = window.innerWidth;
    this.baseControllerService.GetMenu('HomeMenu', 'en').then((data: any) => {
      if(data)
      {
        this.homeMenuList = data.filter((item: any) => {
          const styleTypeItem = item['StyleType'];

          if (JSON.parse(JSON.parse(styleTypeItem))['titleVisibility'] != undefined) {
            item['titleVisibility'] = JSON.parse(JSON.parse(styleTypeItem))['titleVisibility'] == "1" ? true : false;
          }

          if (JSON.parse(JSON.parse(styleTypeItem))['height'] != undefined) {
            item['height'] = JSON.parse(JSON.parse(styleTypeItem))['height'] + 'px';
          }

          if (JSON.parse(JSON.parse(styleTypeItem))['slideShow'] != undefined) {
            item['slideShow'] = JSON.parse(JSON.parse(styleTypeItem))['slideShow'];
            this.slideConfig1.slidesToShow = item['slideShow'];
          }

          if (JSON.parse(JSON.parse(styleTypeItem))['autoplaySpeed'] != undefined) {
            item['autoplaySpeed'] = JSON.parse(JSON.parse(styleTypeItem))['autoplaySpeed'];
            this.slideConfig1.autoplaySpeed = item['autoplaySpeed'];
          }

          if (JSON.parse(JSON.parse(styleTypeItem))['autoplay'] != undefined) {
            item['autoplay'] = JSON.parse(JSON.parse(styleTypeItem))['autoplay'] == "1" ? true : false;
            this.slideConfig1.autoplay = item['autoplay'];
          }

          if (JSON.parse(JSON.parse(styleTypeItem))['textAlign'] != undefined) {
            item['textAlign'] = JSON.parse(JSON.parse(styleTypeItem))['textAlign'];
          }

          if (JSON.parse(JSON.parse(styleTypeItem))['fontSize'] != undefined) {
            item['fontSize'] = JSON.parse(JSON.parse(styleTypeItem))['fontSize'] + 'px';
          }

          if (JSON.parse(JSON.parse(styleTypeItem))['marginRight'] != undefined) {
            item['marginRight'] = JSON.parse(JSON.parse(styleTypeItem))['marginRight'];
          }

          if (item.SubMenu.length > 0) {
            item['distanceCalculated'] = ((item.SubMenu.length - 1) * item['marginRight']) + 'px';
          }

          if(item.Type === 'iframe')
          {
            const token = localStorage.getItem('token');
            item.Href = item.Href + '?=languageid=' + this.translate.currentLang + '&token=' + ((token && token != 'null') ? token : '');
          }
          return item;
        });
        data.forEach((item) =>
        {
          if(item['StyleType'])
          {
            const style = JSON.parse(JSON.parse(item['StyleType']))['style'];
            item['className'] = item.Type + '-' +  style;
          }
          this.commonItems.push(item);
        });

        this.commonItems.sort((a, b) => (a.Order > b.Order) ? 1 : ((b.Order > a.Order) ? -1 : 0));
      }

    });
    this.defaultOptions = this.configService.defaultOptions;
  }

}
