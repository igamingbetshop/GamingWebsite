import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef, inject,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, ConfigService, SaveData, UserDataService} from "@core/services";
import {TranslateService} from "@ngx-translate/core";
import {Validator} from "@core/validators/validators";
import {BaseComponent} from '../../base/base.component';
import {Router} from "@angular/router";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {BaseService} from "@core/services/app/base.service";
import {UserLogined} from "@core/services/app/userLogined.service";
import {take} from "rxjs";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods, VerificationCodeTypes} from "@core/enums";
import {PasswordValidation} from "@core/services/password-validation";
import {UtilityService} from "@core/services/app/utility.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";


@Directive()
export class BaseForgotPasswordComponent extends BaseComponent implements AfterViewInit{
  @ViewChild('inputElement') public inputElement: ElementRef;
  @ViewChild('verifyOtpRef', { read: ViewContainerRef }) verifyOtpRef;
  public forgotPasswordForm: FormGroup;
  public resetPasswordFormGroup: FormGroup;
  public configService: ConfigService;
  public userDataService: UserDataService;
  public authService: AuthService;
  public baseService: BaseService;
  private translate: TranslateService;
  public fb: FormBuilder;
  public router: Router;
  public userLogined: UserLogined;
  public showErrorMessage;
  public isLogined: boolean = false;
  public step:number = 1;
  protected otp:string;
  public showQuestionsView:boolean;
  public securityQuestions:any[] = [];
  protected securityQuestionIds:number[] = [];

  public showPassword: boolean = false;
  public showConfirmPass: boolean = false;
  public defaultOption: any;
  public showSuccessMessage: boolean = false;
  public errorMessage: string;
  public successMessage: string;
  public activePeriodInMinutes: number;
  public urlKey:string;
  dialog = inject(MatDialog);
  private saveData: SaveData;
  private baseApiService:BaseApiService;
  private recaptchaV3Service: ReCaptchaV3Service;
  public changeDetectionRef:ChangeDetectorRef;
  public utilityService: UtilityService;
  public location:Location;
  protected verificationCodeType:number;

  constructor(public injector: Injector) {
    super(injector);
    this.configService = injector.get(ConfigService);
    this.userDataService = injector.get(UserDataService);
    this.authService = injector.get(AuthService);
    this.fb = injector.get(FormBuilder);
    this.baseService = injector.get(BaseService);
    this.translate = injector.get(TranslateService);
    this.router = injector.get(Router);
    this.recaptchaV3Service = injector.get(ReCaptchaV3Service);
    this.inputElement = injector.get(ElementRef);
    this.userLogined = injector.get(UserLogined);
    this.isLogined = this.userLogined.isAuthenticated;
    this.defaultOption = this.configService.defaultOptions;
    this.saveData = injector.get(SaveData);
    this.baseApiService = injector.get(BaseApiService);
    this.changeDetectionRef = injector.get(ChangeDetectorRef);
    this.utilityService = injector.get(UtilityService);
    this.location = injector.get(Location);
    this.urlKey = this.utilityService.getParsedUrl(location.toString())["RecoveryCode"];
    if (this.urlKey) {
      this.changeStep(3);
    }

    this.forgotPasswordForm = this.fb.group({
      fEmail: ['', [
        Validators.required,
        Validator.noWhitespaceValidator,
        Validators.email
      ]]
    });
    if (this.defaultOption.IsReCaptcha) {
      this.subscriptions.push(this.recaptchaV3Service.execute("register").subscribe(token => {
        this.forgotPasswordForm.addControl('ReCaptcha', new FormControl(token));
        console.log('recovery captcha key is :' + token);
      }));
    }
    this.saveData.openPopup.subscribe((data) => {
      if (data === 1) {
        this.step = 1;
        this.showSuccessMessage = false;
        this.forgotPasswordForm.reset();
      }
    });
  }

  back()
  {
    this.location.back();
  }

  async changeStep(step:number)
  {
    if(step)
    {
      this.step = step;
    }
    else
    {
      this.step++;
      this.changeDetectionRef.detectChanges();
    }

  }

  ngOnInit()
  {
    if(this.isLogined)
    {
      this.router.navigate(['/home']);
    }
    this.initResetForm();
  }

  showSignUp(data, event: MouseEvent) {
    event.stopPropagation();
    if (data === 'open') {
      this.saveData.showSignUpSection.next('signUp');
    }
  }

  openLoginPopup(event: MouseEvent) {
    event.stopPropagation();
    this.saveData.openPopup.next(1);
  }

  public submit()
  {
    this.forgotPasswordForm.get('fEmail').setValue(this.forgotPasswordForm.get('fEmail').value.trim(), {emitValue:false});
    if (this.forgotPasswordForm.get('fEmail').value == '')
    {
      // this.showErrorMessage = true;
      this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
    } else {
      const emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
      if ((this.forgotPasswordForm.get('fEmail').value.match(emailValidation))) {
        // this.showErrorMessage = false;
        this.sendData();

      }
      else {
        let value = this.forgotPasswordForm.get('fEmail').value;
        // const numberRegExp = /^[0-9]+$/;
        const numberRegExp = /^[0-9]{6,20}$/;
        if (value.charAt(0) === '0' && value.match(numberRegExp)) {
          this.sendData();
        }
        else if (value.includes('+')) {
          let res = this.forgotPasswordForm.get('fEmail').value.charAt(0);
          if (res == "+") {
            let cutedText = this.forgotPasswordForm.get('fEmail').value.substring(1);
            if (isNaN(parseInt(cutedText))) {
              this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
            } else {
              if (cutedText.includes('+')) {
                this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
              } else if (cutedText.match(numberRegExp)) {
                this.sendData();
              } else {
                this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
              }
            }
          } else {
            this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
          }
        } else {
          this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
        }
        // else {
        //   let value = this.forgotPasswordForm.get('fEmail').value;
        //   if (isNaN(parseInt(value))) {
        //     // this.showErrorMessage = true;
        //     this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
        //   } else {
        //     const symbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        //     if ((this.forgotPasswordForm.get('fEmail').value.match(symbols))) {
        //       // this.showErrorMessage = true;
        //       this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
        //     } else {
        //       const numberRegExp = /^[0-9]+$/;
        //       let res = this.forgotPasswordForm.get('fEmail').value.charAt(0);
        //       console.log('ress', res);
        //       if (res == "+") {
        //         let cutedText = this.forgotPasswordForm.get('fEmail').value.substring(1);
        //         console.log('cutedText', cutedText);
        //         if (isNaN(parseInt(cutedText))) {
        //           // this.showErrorMessage = true;
        //
        //           this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
        //         } else {
        //           if (cutedText.includes('+') && this.forgotPasswordForm.get('fEmail').value.match(numberRegExp)) {
        //             console.log('hos3');
        //             // this.showErrorMessage = true;
        //             this.sendData();
        //           } else {
        //             // this.showErrorMessage = false;
        //             this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
        //           }
        //         }
        //       } else {
        //           this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
        //       }
        //       // if (this.forgotPasswordForm.get('fEmail').value.match(numberRegExp)) {
        //       //   console.log('hos3');
        //       //   // this.showErrorMessage = false;
        //       //   this.sendData();
        //       // } else {
        //       //   // this.showErrorMessage = true;
        //       //   this.utilityService.showMessageWithDelay(this, [{'showErrorMessage': this.translate.instant("Recovery.Wrong-recovery-input") }]);
        //       // }
        //     }
        //   }
        // }

      }
    }
  }

  sendData()
  {
    this.baseService.forgotPassword(this.forgotPasswordForm.getRawValue()).pipe(take(1)).subscribe(data => {
      if(data.ResponseCode === 0)
      {
        this.showSuccessMessage = true;
        this.activePeriodInMinutes = data.ResponseObject?.ActivePeriodInMinutes;
        let currentValue = this.forgotPasswordForm.get("fEmail").value.toString();
        let isEmail = currentValue.includes("@");
        let translateMessageKey = isEmail ? "Auth.ChangePasswordSendEmailSuccessMessage" : "Auth.ChangePasswordSendMobileSuccessMessage";

        this.translate.get(translateMessageKey).subscribe((res: string) => {
          this.successMessage = isEmail ? res.replace("{EMAIL}", currentValue) : res.replace("{MOBILE}", currentValue);
        });
        this.changeStep(2);
      }
      else
      {
        this.showSuccessMessage = false;
        this.errorMessage = data['Description'];
      }
    });
  }
  ngAfterViewInit() {
    this.autoFocus();
  }
  public autoFocus() {
    this.inputElement?.nativeElement.focus();
  }

  protected getRecoveryType():string
  {
    if (this.urlKey)
    {
      this.verificationCodeType = VerificationCodeTypes.PasswordRecoveryByEmailOrMobile;
      return 'MobileOrEmail';
    }
   else
   {
      let currentValue = this.forgotPasswordForm.get("fEmail").value.toString();
      let isEmail = currentValue.includes("@");
      if(isEmail)
        this.verificationCodeType = VerificationCodeTypes.PasswordRecoveryByEmail;
      else this.verificationCodeType = VerificationCodeTypes.PasswordRecoveryByMobile;
      return isEmail ? 'email' : 'mobile';
    }
  }

  protected getSecurityQuestions()
  {
    this.baseApiService.apiRequest(null, Controllers.MAIN, Methods.GET_SECURITY_QUESTIONS, false).pipe(take(1)).subscribe(data => {
      const index = Math.floor(Math.random() * this.securityQuestionIds.length);
      this.securityQuestionIds.splice(index, 1);
      this.securityQuestions = data.ResponseObject.filter(el => {
          return this.securityQuestionIds.includes(el.Id);
      });
    });
  }

  private initResetForm()
  {
    const regex = new RegExp(this.configService.defaultOptions.PassRegEx);
    this.resetPasswordFormGroup = this.fb.group({
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

  resetPassword()
  {
    if (this.resetPasswordFormGroup.valid && this.getSecurityValidation())
    {
      const data = this.resetPasswordFormGroup.getRawValue();
      // data.RecoveryToken = this.urlKey ? this.urlKey : this.otp;
      data.RecoveryToken = this.otp;
      data.SecurityQuestions = this.securityQuestions;
      this.baseService.resetPassword(data).pipe(take(1)).subscribe(data => {
       if(data.ResponseCode == 0)
       {
         this.changeStep(5);
         const time = setTimeout(() => {
           clearTimeout(time);
           this.router.navigate(['/home']);
           this.showSuccessMessage = false;
           this.forgotPasswordForm.reset();
         }, 3000);
       }
       else
       {
         this.showSuccessMessage = false;
         this.errorMessage = data['Description'];
       }
      })
    }
  }

  private getSecurityValidation():boolean
  {
    if(!this.showQuestionsView)
      return true;
    else
    {
      return this.securityQuestions.every(data => !!data.Answer);
    }
  }

  public openNotLoginNewTicket(event:MouseEvent, component:any = null)
  {
    this.dialog.open(component, {data:{
        title: 'Open ticket',
        data: {notLogin: true},
        message: true
      }});
  }
}
