import {
  Component,
  ComponentRef,
  createNgModuleRef,
  Inject,
  Injector, Input,
  NgModuleRef,
  ViewContainerRef
} from '@angular/core';
import { BaseProfile } from '../../../../../../../@theme/components/profile/base-profile';
import { DOCUMENT } from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "@core/services";

@Component({
  selector: 'app-account-page-type3-profile',
  templateUrl: './account-page-type3-profile.component.html',
  styleUrls: ['./account-page-type3-profile.component.scss']
})
export class AccountPageType3ProfileComponent extends BaseProfile {
  public darkMode = false;
  public oddsFormat = 'Decimal';
  public currencySymbol;
  public userData: any;
  @Inject(DOCUMENT) public document: Document;
  public localStorageService: LocalStorageService;
  // @Input() toggleDarkMode$: BehaviorSubject<boolean>;

  constructor(public injector: Injector) {
    super(injector);
    this.document = injector.get(DOCUMENT);
    this.localStorageService = injector.get(LocalStorageService);
    this.userData = this.localStorageService.get('user');
    this.currencySymbol = this.userData.CurrencySymbol;
  }
  ngOnInit()
  {
    super.ngOnInit();
    // this.darkMode = localStorage.getItem('darkMode') && JSON.parse(localStorage.getItem('darkMode'));
    // this.setMode();
  }

  switchMode(isDarkMode: boolean): void {
    // this.darkMode = !this.darkMode;
    if (isDarkMode) {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
    localStorage.setItem('darkMode', '' + this.darkMode);
    // this.toggleDarkMode$.next(this.darkMode);
    this.setMode();
  }

  setMode(): void
  {
    this.document.body.className = this.darkMode ? 'dark' : '';
    const iframe = document.getElementById('main-game-iframe') as HTMLIFrameElement;
    if(iframe && iframe.contentWindow)
    {
      iframe.contentWindow.postMessage({"from": "website", "updateTheme": this.darkMode ? 'dark' : ''}, "*");
    }

  }

  oddsFormatMode(event) {
    this.oddsFormat = event.id;
  }

  async loadSpecialComponents(item) {
    switch (item.Type) {
      case 'send-code':
      {
        let containerRef: ViewContainerRef;
        if(item.Title == 'Email')
          containerRef = this.emailRef;
        else if(item.Title == 'MobileNumber')
          containerRef = this.mobileNumberRef;
        const { SendCodeModule } = await import('./types/send-code/send-code.module');
        const moduleRef = createNgModuleRef(SendCodeModule, this.injector);
        this.createComponentWithInstances(moduleRef, containerRef, item.Title);
      }
        break;
      case 'region':
      {
        let containerRef: ViewContainerRef;
        switch (item.Title)
        {
          case 'CityId':
            containerRef = this.cityRef;
            break;
          case 'CountryId':
            containerRef = this.countryRef;
            break;
        }
        const { RegionModule } = await import('./types/region/region.module');
        const moduleRef = createNgModuleRef(RegionModule, this.injector);
        const componentRef = this.createComponentWithInstances(moduleRef, containerRef, item.Title);
        componentRef.instance.zIndex = 100 - item.Order;
        componentRef.instance.subItem = item.Config?.subItem;
      }
        break;
    }
  }

  private createComponentWithInstances(moduleRef:NgModuleRef<any>, containerRef:ViewContainerRef, title:string):ComponentRef<any>
  {
    const component = moduleRef.instance.getComponent();
    const componentRef: any = containerRef.createComponent(component, {ngModuleRef: moduleRef});
    componentRef.instance.formGroup = this.formGroup;
    componentRef.instance.formControlName = title;
    componentRef.instance.type = title;
    return componentRef;
  }
}
