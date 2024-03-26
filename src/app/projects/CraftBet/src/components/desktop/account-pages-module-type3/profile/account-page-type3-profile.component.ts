import {
  Component,
  ComponentRef,
  createNgModule,
  Inject,
  Injector, Input,
  NgModuleRef,
  ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { BaseProfile } from '../../../../../../../@theme/components/profile/base-profile';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '@core/services';
import { Controllers, Methods } from '@core/enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-page-type3-profile',
  templateUrl: './account-page-type3-profile.component.html',
  styleUrls: ['./account-page-type3-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountPageType3ProfileComponent extends BaseProfile {
  public darkMode = false;
  public oddsFormat = 'Decimal';
  public currencySymbol;
  public userData: any;
  public automaticPayout: any;
  public automaticPayoutOpened: boolean = false;
  public showAutomaticPayoutText: boolean = false;
  public showAutomaticPayoutForm: boolean = false;
  public showSuccessPic = false;
  public payoutCreationTime;
  public showErrorMessage;
  public showSuccessMessage;
  @Inject(DOCUMENT) public document: Document;
  public localStorageService: LocalStorageService;
  public initialAutomaticPayout: number;
  public isSaving: boolean = false;
  public containerOpened: boolean[] = [];
  public toggleOpened: boolean = false;
  public message;
  public automaticPayoutErrorMessage: string = '';
  // @Input() toggleDarkMode$: BehaviorSubject<boolean>;

  constructor(public injector: Injector, public translate: TranslateService) {
    super(injector);
    this.document = injector.get(DOCUMENT);
    this.localStorageService = injector.get(LocalStorageService);
    this.userData = this.localStorageService.get('user');
    this.currencySymbol = this.userData.CurrencySymbol;
  }
  ngOnInit()
  {
    super.ngOnInit();
    this.getAutomaticPayout();
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
        const moduleRef = createNgModule(SendCodeModule, this.injector);
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
        const moduleRef = createNgModule(RegionModule, this.injector);
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

  submitAutomaticPayout() {
    this.isSaving = true;

    const apiRequestCondition = this.automaticPayout === '' ? -1 : Number(this.automaticPayout);
    this.baseApiService.apiRequest(apiRequestCondition, Controllers.CLIENT, Methods.SAVE_PAYOUT_LIMIT).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        if (data.ResponseObject !== null) {
          this.automaticPayout = data.ResponseObject.Limit;
          // this.utilityService.showMessageWithDelay(this, [{ showSuccessMessage: 'Success-Payout' }]);
          this.translate.get('Settings.Success-Payout').subscribe((res: string) => {
            const currentValue = data.ResponseObject;
            this.message = res.replace('value', currentValue);
          });
          this.showSuccessPic = true;
          setTimeout(() => {
            this.automaticPayoutOpened = false;
            this.showAutomaticPayoutForm = false;
            this.showSuccessPic = false;
          }, 3000);
        } else {
          this.automaticPayout = undefined;
          this.initialAutomaticPayout = undefined;
        }
        this.getAutomaticPayout();
      } else {
        this.utilityService.showMessageWithDelay(this, [{ showErrorMessage: data.Description }]);
      }
      this.isSaving = false;
    });
  }

  getAutomaticPayout() {
    this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_PAYOUT_LIMIT).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        if (data.ResponseObject.Limit !== null) {
          this.automaticPayout = data.ResponseObject.Limit;
          this.initialAutomaticPayout = data.ResponseObject.Limit;
          this.payoutCreationTime = data.ResponseObject.CreationDate;
        } else {
          this.automaticPayout = undefined;
          this.initialAutomaticPayout = undefined;
        }
      } else {
        this.utilityService.showMessageWithDelay(this, [{ statusMessage: data.Description }]);
      }
    });
  }

  hasChanges(): boolean {
    return this.automaticPayout !== this.initialAutomaticPayout;
  }

  onInput(event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const maxLength = 11;
    const key = event.key;
    if (value.length >= maxLength) {
      event.preventDefault();
    }
  }

  preventKeys(event: KeyboardEvent) {
    const key = event.key;
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (key === '+' || key === '-') {
      event.preventDefault();
    }
  }

  inputChanging(event) {
    const key = event.key;
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const digits = value.replace(/[^\d.]/g, '');
    const parts = digits.split('.');
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, 4);
    } else {
      if (value.startsWith('0') && key !== '.') {
        if (value === '0') {
          event.preventDefault();
          return;
        }
        const newValue1 = value.slice(1);
        input.value = newValue1;
        event.preventDefault();
        return;
      }
    }
    const newValue = parts.join('.');
    if (newValue !== value) {
      input.value = newValue;
      event.preventDefault();
    }
  }

  validateAutomaticPayout() {
    const enteredValue = Number(this.automaticPayout);

    if (enteredValue < 10) {
      this.automaticPayoutErrorMessage = 'PayoutError';
    } else {
      this.automaticPayoutErrorMessage = '';
    }
  }

  changePayoutToText() {
    this.automaticPayoutOpened = true;
    this.showAutomaticPayoutForm = true;
  }

  returnProfile() {
    this.automaticPayoutOpened = false;
    this.automaticPayout = this.initialAutomaticPayout;
  }

  returnPayoutText() {
    this.showAutomaticPayoutForm = false;
    this.automaticPayoutOpened = true;
  }
  goPayoutText() {
    this.automaticPayoutOpened = true;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  toggleAutomaticPayout() {
    if (this.automaticPayout && this.automaticPayout !== 0) {
      this.automaticPayout = '';
      this.submitAutomaticPayout();
    } else {
      this.goPayoutText();
    }
  }

  toggleContainer(index) {
    if (this.containerOpened[index] === true) {
      this.containerOpened[index] = false;
    } else {
      this.containerOpened[index] = !this.containerOpened[index];
      this.containerOpened = this.containerOpened.map((value, i) => i === index);
    }
  }
}
