import {
    AfterViewInit,
    Component,
    ComponentRef,
    createNgModule, ElementRef,
    Injector,
    NgModuleRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { LayoutService } from '../../../../../../../@core/services/app/layout.service';
import { BaseProfile } from '../../../../../../../@theme/components/profile/base-profile';
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

@Component({
  selector: 'app-profile',
  templateUrl: './mobile-profile.component.html',
  styleUrls: ['./mobile-profile.component.scss']
})
export class MobileProfileComponent extends BaseProfile implements AfterViewInit {
    @ViewChild('scrollRef') scrollRef: ElementRef;

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }

    ngAfterViewInit() {
        const isScrollLocked = this.saveData.getScrollLockState();
        if (isScrollLocked) {
            disableBodyScroll(this.scrollRef.nativeElement);
        }
    }
    ngOnDestroy()
    {
        enableBodyScroll(this.scrollRef.nativeElement);
    }

  async loadSpecialComponents(item) {
    switch (item.Type) {
      case 'birth-date':
      {
        const { BirthDateModule } = await import('./types/birth-date/birth-date.module');
        const moduleRef = createNgModule(BirthDateModule, this.injector);
        this.createComponentWithInstances(moduleRef, this.birthDateRef, item);
      }
        break;
      case 'send-code':
      {
        let containerRef: ViewContainerRef;
        if (item.Title == 'Email') {
          containerRef = this.emailRef;
        } else if (item.Title == 'MobileNumber') {
          containerRef = this.mobileNumberRef;
 }
        const { SendCodeModule } = await import('./types/send-code/send-code.module');
        const moduleRef = createNgModule(SendCodeModule, this.injector);
        this.createComponentWithInstances(moduleRef, containerRef, item);
      }
        break;
      case 'region':
      {
        let containerRef: ViewContainerRef;
        switch (item.Title) {
          case 'CountryId':
            containerRef = this.countryRef;
            break;
          case 'DistrictId':
            containerRef = this.districtRef;
            break;
          case 'CityId':
            containerRef = this.cityRef;
            break;
          case 'TownId':
            containerRef = this.townRef;
            break;
        }
        const { RegionModule } = await import('./types/region/region.module');
        const moduleRef = createNgModule(RegionModule, this.injector);
        const componentRef = this.createComponentWithInstances(moduleRef, containerRef, item);
        componentRef.instance.zIndex = 100 - item.Order;
        componentRef.instance.subItem = item.Config?.subItem;
      }
        break;
        case 'language':
        {
            const { LanguageModule } = await import('./types/language/language.module');
            const moduleRef = createNgModule(LanguageModule, this.injector);
            this.createComponentWithInstances(moduleRef, this.languageRef, item);
        }
        break;
    }
  }

  private createComponentWithInstances(moduleRef: NgModuleRef<any>, containerRef: ViewContainerRef, formElement):ComponentRef<any>
  {
    const component = moduleRef.instance.getComponent();
    const componentRef: any = containerRef.createComponent(component, { ngModuleRef: moduleRef });
    componentRef.instance.formGroup = this.formGroup;
      componentRef.instance.formControlName = formElement.Title;
      componentRef.instance.type = formElement.Title;
      componentRef.instance.formElement = formElement;
    return componentRef;
  }

}
