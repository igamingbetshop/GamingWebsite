import {Component, ComponentRef, createNgModuleRef, NgModuleRef, ViewContainerRef} from "@angular/core";
import {BaseProfile} from "../../../../../../../@theme/components/profile/base-profile";

@Component({
    selector:'profile',
    templateUrl:'profile.component.html',
    styleUrls:['profile.component.scss']
})

export class ProfileComponent extends BaseProfile
{
    async loadSpecialComponents(item)
    {
        switch (item.Type)
        {
            case 'birth-date':
            {
                const { BirthDateModule } = await import('./types/birth-date/birth-date.module');
                const moduleRef = createNgModuleRef(BirthDateModule, this.injector);
                this.createComponentWithInstances(moduleRef, this.birthDateRef, item);
            }
            break;
            case 'send-code':
            {
                let containerRef:ViewContainerRef;
                if(item.Title == 'Email')
                    containerRef = this.emailRef;
                else if(item.Title == 'MobileNumber')
                    containerRef = this.mobileNumberRef;
                const { SendCodeModule } = await import("./types/send-code/send-code.module");
                const moduleRef = createNgModuleRef(SendCodeModule, this.injector);
                this.createComponentWithInstances(moduleRef, containerRef, item);
            }
            break;
            case 'region':
            {
                let containerRef:ViewContainerRef;
                switch (item.Title)
                {
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
                const { RegionModule } = await import("./types/region/region.module");
                const moduleRef = createNgModuleRef(RegionModule, this.injector);
                const componentRef = this.createComponentWithInstances(moduleRef, containerRef, item);
                componentRef.instance.zIndex = 100 - item.Order;
                componentRef.instance.subItem = item.Config?.subItem;
            }
            break;
            case 'language':
            {
                const { LanguageModule } = await import('./types/language/language.module');
                const moduleRef = createNgModuleRef(LanguageModule, this.injector);
                this.createComponentWithInstances(moduleRef, this.languageRef, item);
            }
            break;
        }
    }
    
    private createComponentWithInstances(moduleRef:NgModuleRef<any>, containerRef:ViewContainerRef, formElement):ComponentRef<any>
    {
        const component = moduleRef.instance.getComponent();
        const componentRef:any = containerRef.createComponent(component, {ngModuleRef: moduleRef});
        componentRef.instance.formGroup = this.formGroup;
        componentRef.instance.formControlName = formElement.Title;
        componentRef.instance.type = formElement.Title;
        componentRef.instance.formElement = formElement;
        return componentRef;
    }
}