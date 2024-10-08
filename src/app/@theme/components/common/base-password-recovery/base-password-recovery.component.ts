import {Injectable, Injector} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseService} from "@core/services/app/base.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {BaseComponent} from "../../base/base.component";
import {Validator} from "@core/validators/validators";
import {UtilityService} from "@core/services/app/utility.service";
import {PasswordValidation} from "@core/services/password-validation";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ConfigService} from "@core/services";
import {passwordConfigs} from "@core/utils";
import {take} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";


@Injectable()
export class BasePasswordRecoveryComponent extends BaseComponent {

  public resetPasswordFormGroup: FormGroup;
  public formBuilder: FormBuilder;
  public baseService: BaseService;
  public userLogined: UserLogined;
  public utilityService: UtilityService;
  public configService: ConfigService;
  public router: Router;
  public isChangePass: boolean;
  public responceMessage: string = '';
  private translate: TranslateService;
  public passwordConfigs;
  public urlKey:string;

  constructor(public injector: Injector) {
    super(injector);

    this.formBuilder = injector.get(FormBuilder);
    this.utilityService = injector.get(UtilityService);
    this.baseService = injector.get(BaseService);
    this.userLogined = injector.get(UserLogined);
    this.translate = injector.get(TranslateService);
    this.configService = this.injector.get(ConfigService);
    this.router = this.injector.get(Router);

    this.urlKey = this.utilityService.getParsedUrl(location.toString())["RecoveryCode"];

    const regex = new RegExp(this.configService.defaultOptions.PassRegEx);
    this.resetPasswordFormGroup = this.formBuilder.group({
      RecoveryToken: [this.urlKey],
      Password: ['', [
        Validators.required,
        Validator.noWhitespaceValidator,
        Validators.minLength(6),
        Validators.pattern(regex)
      ]],
      ConfirmPassword: ['', [
        Validators.required,
        Validator.noWhitespaceValidator,
        Validators.minLength(6)]]
    });
    this.resetPasswordFormGroup.get('ConfirmPassword').setValidators(PasswordValidation.matchTo.bind(this.resetPasswordFormGroup.get('Password')));
    this.subscriptions.push(
        this.resetPasswordFormGroup.get('Password').valueChanges.subscribe(val => {
          val && this.resetPasswordFormGroup.get('ConfirmPassword').updateValueAndValidity();
        })
    );
  }

  ngOnInit() {

    super.ngOnInit();
    this.passwordConfigs = passwordConfigs(this.configService);
    this.resetPasswordFormGroup.get('Password').valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
    ).subscribe((value) => {
      this.checkValidity(value);
    });
    this.subscriptions.push(this.baseService.notifyGetResetPasswordError.subscribe((data) => {
      if (data['ResponseCode'] === 0) {
        this.isChangePass = true;
        const userData = {
          'ClientIdentifier': data['ClientEmail'],
          'Password': this.resetPasswordFormGroup.get('Password').value
        };

        this.userLogined.userLogin(userData, true);
        this.resetPasswordFormGroup.reset('');

      } else {
        this.responceMessage = data['Description'];
        this.isChangePass = false;
      }

      setTimeout(() => {
        this.responceMessage = '';
      }, 6000);
    }));

  }

  public resetPassword() {
    if (this.resetPasswordFormGroup.valid) {
      const getFormValue = this.resetPasswordFormGroup.getRawValue();
      // this.baseService.resetPassword(getFormValue);
      this.baseService.resetPassword(getFormValue).pipe(take(1)).subscribe(data => {
        if(data.ResponseCode == 0)
        {
          this.responceMessage = 'Success';
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        }
        else
        {
          this.responceMessage = data['Description'];
        }
      });
    }
  }
  public checkValidity(value): void {
    if (value) {
      this.passwordConfigs.forEach(item => {
        item.valid = item.condition(value);
      });
    } else {
      this.passwordConfigs.forEach(item => {
        item.valid = undefined;
      });
    }
  }

}
