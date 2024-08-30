import {
  AfterViewInit,
  Component,
  ComponentRef,
  createNgModule,
  HostListener,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CommonMainComponent} from '../../common/common-main/common-main.component';
import {SharedService} from "@core/services";
import {take} from "rxjs";
import {Controllers, Methods} from "@core/enums";

@Component({
  selector: 'app-mobile-main',
  templateUrl: './mobile-main.component.html',
  styleUrls: ['./mobile-main.component.scss']
})
export class MobileMainComponent extends CommonMainComponent implements OnInit, AfterViewInit {

  public rightToLeftOrientation: boolean = false;
  isShowDeviceLayoutBackground:boolean = false;
  private readonly footerExcludedUrls = [
    '/prematch',
    'sport/live',
    '/esport',
    '/login',
    '/signup',
    '/chart',
    '/profile-details'
  ];


  @HostListener('window:resize', ['$event'])
  onResize(event)
  {
    this.checkPortrait();
  }
  deviceOS: string = '';
  showMobilePopup: boolean = true;
  public isLogin: boolean;
  public headerPropertyName = '--m-header-panel1-height';

  isExpired: true;
  @ViewChild('bottomSideBarRef', { read: ViewContainerRef }) bottomSideBarRef;
  bottomSideBarComponent:ComponentRef<any>;
  hideFooter:boolean = true;

  constructor(public injector: Injector,
              public sharedService: SharedService,
              ) {
    super(injector);
    this.isLogin = this.userLogined.isAuthenticated;
  }

  ngOnInit() {
    super.ngOnInit();
    this.checkPortrait();
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.showMobilePopup = false;
    }
    this.sharedService.rightToLeftOrientation.subscribe((responseData) => {
      this.rightToLeftOrientation = responseData;
    });
    window.addEventListener('pathChange', (data) => {
      this.router.navigate([data['detail'].path]);
    });
    this.openCharacters();
  }

  ngAfterViewInit() {
    this.headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue(this.headerPropertyName), 10);
    this.addScrollListener();
  }

  override async loadComponent():Promise<any>
  {
    const data = await this.getCharacters();
    const characters = data['ResponseObject'];
    window['characters'] = characters;
    if(characters.length > 1)
    {
      const { MobileCharactersModule  } = await import('../mobile-homepage/mobile-characters/mobile-characters.module');
      const moduleRef = createNgModule(MobileCharactersModule, this.injector);
      const component = moduleRef.instance.getComponent();
      return component;
    }
    else
    {
      if(characters.length === 1)
      {
        this.baseApiService.apiPost("",{Controller:Controllers.CLIENT, Method:Methods.ADD_CHARACTER_TO_CLIENT, RequestData: characters[0].Id},null).pipe(take(1)).subscribe(data => {
          let user = this.localStorageService.get("user");
          user.CharacterId = data['ResponseObject'];
          this.localStorageService.add("user", user);
          this.loginService.notifyUpdateCharacter();
        });
      }
      return null;
    }
  }

  async getCharacters()
  {
    return this.baseApiService.apiPost("",{Controller:Controllers.MAIN}, Methods.GET_CHARACTERS, false).toPromise();
  }

  closePopup() {
    this.showMobilePopup = false
  }

  openRegister() {
    this.router.navigate(['/signup'], {queryParams: this.savedData.registerReferalData});
  }

  private checkPortrait()
  {
    if(this.configService.defaultOptions.CheckPortrait && this.configService.defaultOptions.CheckPortrait != 0)
    {
      const mediaQueryList = window.matchMedia("(orientation: landscape)");
      this.isShowDeviceLayoutBackground = mediaQueryList.matches;
    }

  }
  protected menuReady()
  {
    setTimeout(() => {
      this.renderLazyLoadComponents()
    }, 10);
    this.checkFooterDisplay();
  }

 async renderLazyLoadComponents()
  {
    if(this.mobileBottomSideBar.length > 0)
    {
       if(!this.bottomSideBarComponent)
       {
         const { BottomSideBarModule } = await import("../../../../../../@theme/components/global-bottom-side-bar/bottom-side-bar.module");
         const moduleRef = createNgModule(BottomSideBarModule, this.injector);
         const component = moduleRef.instance.getComponent();
         this.bottomSideBarComponent = this.bottomSideBarRef.createComponent(component, {ngModuleRef: moduleRef});
       }
      this.bottomSideBarComponent.instance.menuList = this.mobileBottomSideBar;
    }
  }

  private checkFooterDisplay()
  {
    const url = this.router.url;
    this.hideFooter = this.footerExcludedUrls.some(elem => url.includes(elem));
  }
}
