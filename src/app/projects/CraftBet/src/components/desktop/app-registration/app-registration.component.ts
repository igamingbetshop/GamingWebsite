import {Component, Injector} from '@angular/core';
import {BaseRegisterDynamicFieldsComponent} from "../../../../../../@theme/components/register/base-register-dynamic-fields.component";

@Component({
  selector: 'app-registration',
  templateUrl: './app-registration.component.html',
  styleUrls: ['./app-registration.component.scss']
})
export class AppRegistrationComponent extends BaseRegisterDynamicFieldsComponent {

  constructor(public injector: Injector) {
    super(injector);
    this.logoUrl = '../../../../../../../' + window.location.hostname + '.png';
  }

  ngOnInit() {
    super.ngOnInit();
  }

  errorHandler(event) {
    event.target.src = '../../../../../../../assets/images/logo.png';
  }

  closeCurrentTab()
  {
    this.saveData.clickForgotPassword.next('1');
    this.router.navigate(['/terms']);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
