import {Directive, Inject, Injector} from '@angular/core';
import {LocalStorageService, ConfigService, PaymentsService} from "@core/services";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {BaseComponent} from '../../base/base.component';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {CheckGameTypeService} from "@core/services/app/checkGameType.service";
import {filter, map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {DOCUMENT, Location} from '@angular/common';
import {UserLogined} from "@core/services/app/userLogined.service";
import {UtilityService} from "@core/services/app/utility.service";


@Directive()
export class BaseFooterComponent extends BaseComponent {

  @Inject(DOCUMENT) public document: Document;
  public utilityService: UtilityService;
  public localStorageService: LocalStorageService;
  public userLogined: UserLogined;
  public configService: ConfigService;
  public paymentsService: PaymentsService;
  public baseControllerService: BaseControllerService;
  public checkGameTypeService: CheckGameTypeService;
  public router: Router;
  public route: ActivatedRoute;
  public location: Location;


  public defaultOption: any;
  public userData: any;
  public isLogin: boolean;

  public columsCount:string;
  public footerMenuList: Array<any> = [];
  public footerLogoList: any[] = [];
  public subColumsWidth: string;
  public animateFooter: boolean = false;
  public openFooter: boolean = false;
  public subs: Array<Subscription> = [];
  public contactUsItems: Array<any> = [];

  public commonItems:any[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.utilityService = injector.get(UtilityService);
    this.localStorageService = injector.get(LocalStorageService);
    this.userLogined = injector.get(UserLogined);
    this.configService = injector.get(ConfigService);
    this.paymentsService = injector.get(PaymentsService);
    this.baseControllerService = injector.get(BaseControllerService);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.checkGameTypeService = injector.get(CheckGameTypeService);
    this.location = injector.get(Location);
    this.document = injector.get(DOCUMENT);

    this.defaultOption = this.configService.defaultOptions;
    this.isLogin = this.userLogined.isAuthenticated;
    this.userData = this.localStorageService.get('user');

    this.subs[0] = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })).subscribe((route: ActivatedRouteSnapshot) => {
      });

  }

  ngOnInit() {
    super.ngOnInit();
    const data = {PartnerId: this.defaultOption.PartnerId, ClientId: this.isLogin ? this.userData.Id : 0};

    this.checkVisibilityFooter();


    this.location.onUrlChange((x) => {
      this.checkVisibilityFooter();
    });
  }


  checkVisibilityFooter() {
    let currentUrl = this.router.url;
    currentUrl = currentUrl.substring(currentUrl.indexOf("/") + 1);
    if (currentUrl.includes('/')) {
      currentUrl = currentUrl.substring(0, currentUrl.indexOf('/'))
    }

    let routeData: Array<any> = this.configService.defaultOptions.FooterVisibility.filter((responseData) => {
      if (responseData.Title == currentUrl.replace("#", "")) {
        return responseData;
      }
    });

    if (routeData.length > 0) {
      if (routeData[0].Type === '1') {
        this.animateFooter = false;
      } else if (routeData[0].Type === '2') {
        this.animateFooter = true;
      }
    } else {
      this.animateFooter = false;
    }
  }


  public toggleFooter() {
    this.openFooter = !this.openFooter;
  }

  onClickedOutside(e: Event) {
    this.openFooter = false;
  }



  ngOnDestroy() {
    super.ngOnDestroy();
    this.openFooter = false;
    this.animateFooter = false;
  }

}
