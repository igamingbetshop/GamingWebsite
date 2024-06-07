import {Component, Injector, Input} from '@angular/core';
import {AppCommonLoginComponent} from "../../common/app-common-login/app-common-login.component";
import {ConfigService} from "@core/services";
import {MenuType} from "@core/enums";
import {Location} from "@angular/common";

@Component({
    selector: 'app-mobile-login',
    templateUrl: './mobile-login.component.html',
    styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent extends AppCommonLoginComponent {

    public bgUrl: string = '';
    public logoUrl: string = '';
    public isSignUpButton: any;
    @Input() className: string;

    constructor(public injector: Injector, public configService: ConfigService) {
        super(injector);
        if (this.userLogined.isAuthenticated) {
            this.router.navigate([this.configService.defaultOptions.HomePageType]);
        }
        this.location = injector.get(Location);
    }

    ngOnInit() {
        super.ngOnInit();
        this.scrollToTop();
        this.baseControllerService.GetMenu(MenuType.MOBILE_RIGHT_SIDEBAR, 'en').then((data: any) => {
            this.isSignUpButton = data.filter(item => item.Type === "signupBtn_button")[0];
        });
    }


    submit(): any {
        // if (this.activeTabName == '1') {
        //   const currentLogin = this.currentValueMobileCode.Type + '' + this.currentMobileNumber;
        //   this.loginForm.get('ClientIdentifier').patchValue(currentLogin);
        // }
        super.submit();
    }

    errorHandlerBg(event) {
        event.target.src = '../../../../../../../assets/images/register/mobile_background.png';
    }


    goBack()
    {
        const productUrl = localStorage.getItem('product-url');
        const openedUrl = localStorage.getItem('opened-url');
        if(productUrl)
        {
            localStorage.removeItem('product-url');
            if(openedUrl)
            {
                localStorage.removeItem('opened-url');
                localStorage.removeItem('payment-url');
                this.router.navigate([openedUrl]);
            }
            else this.router.navigate([this.configService.defaultOptions.HomePageType]);
        }
        else
        {
            if(openedUrl)
            {
                localStorage.removeItem('opened-url');
                this.router.navigate([openedUrl]);
            }
            else
            {
                this.location.back();
            }
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

}
