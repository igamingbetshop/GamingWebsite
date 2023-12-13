import {Injector, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validator} from '../../../../../../@core/validators/validators';
import {UserDataService} from '../../../../../../@core/services';
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';
import {TranslationService} from "@core/services/api/translation.service";
import {BaseService} from "@core/services/app/base.service";
import {UtilityService} from "@core/services/app/utility.service";

@Injectable()
export class AppCommonForgotPasswordRecoveryComponent extends BaseComponent {

  public userDataService: UserDataService;
  public resetPasswordFormGroup: FormGroup;
  public formBuilder: FormBuilder;
  public baseService: BaseService;
  public utilityService: UtilityService;
  public baseComponent: BaseComponent;
  public isChangePass: boolean = false;
  public responceMessage: string;
  private translate:TranslationService;

  constructor(public injector: Injector) {
    super(injector);
    this.userDataService = injector.get(UserDataService);
    this.formBuilder = injector.get(FormBuilder);
    this.utilityService = injector.get(UtilityService);
    this.baseService = injector.get(BaseService);
    this.baseComponent = injector.get(BaseComponent);
    this.translate = injector.get(TranslationService);

    const urlKey = this.utilityService.getParsedUrl(location.toString())["RecoveryCode"];

    this.resetPasswordFormGroup = this.formBuilder.group({
      RecoveryToken: [urlKey],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    }, {
      validator: Validator.MatchPassword
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.baseService.



    notifyGetResetPasswordError.subscribe((data) => {
      if (data['ResponseCode'] === 0) {
        this.isChangePass = true;
        this.translate.getTranslation("Auth.ChangePasswordSuccessMessage").subscribe((res: string) => {
          this.responceMessage = res;
        });
        this.resetPasswordFormGroup.reset('');
      }else {
        this.responceMessage = data['Description'];
      }

      setTimeout(() => {
        this.responceMessage = '';
      }, 6000);
    }));
  }


  public resetPassword() {
    const getFormValue = this.resetPasswordFormGroup.getRawValue();
    this.baseService.resetPassword(getFormValue);
  }
}
