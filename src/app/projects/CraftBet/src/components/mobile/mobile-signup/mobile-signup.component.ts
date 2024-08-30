import {Component, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {BaseRegisterDynamicFieldsComponent} from "../../../../../../@theme/components/register/base-register-dynamic-fields.component";
import {UserLogined} from "@core/services/app/userLogined.service";
import {Location} from "@angular/common";
import {SaveData} from "@core/services";

@Component({
  selector: 'app-mobile-signup',
  templateUrl: './mobile-signup.component.html',
  styleUrls: ['./mobile-signup.component.scss']
})
export class MobileSignupComponent extends BaseRegisterDynamicFieldsComponent {

  constructor(public injector: Injector, public router: Router, private userLogined: UserLogined) {
    super(injector);
    if (this.userLogined.isAuthenticated) {
      this.router.navigate(['/']);
    }
    this.saveData = injector.get(SaveData);
    this.location = injector.get(Location);
  }

  public bgUrl: string = '';
  location: Location;
  mobileLoginPreviousState: any;

  getMobileLoginPreviousState() {
      this.mobileLoginPreviousState = this.saveData.mobileLoginPreviousState;
      if (this.mobileLoginPreviousState) {
        this.router.navigateByUrl(this.mobileLoginPreviousState);
      } else {
        this.router.navigateByUrl('/' + this.configService.defaultOptions.HomePageUrl);
      }
  }

  errorHandlerBg(event) {
    event.target.src = '../../../../../../../assets/images/register/mobile_background.png';
  }


  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
