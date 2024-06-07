import {Directive, Injector} from '@angular/core';
import {Location} from '@angular/common';
import {LocalStorageService} from "@core/services";
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';
import {Validator} from '../../../../../../@core/validators/validators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SaveData} from "@core/services";
import {Router} from "@angular/router";
import {UserLogined} from "@core/services/app/userLogined.service";
import {UtilityService} from "@core/services/app/utility.service";
import {MenuType} from "../../../../../../@core/enums";
import {BaseControllerService} from "../../../../../../@core/services/app/baseController.service";

@Directive()
export class AppCommonLoginComponent extends BaseComponent {

    public fb: FormBuilder;
    public userLogined: UserLogined;
    public baseControllerService: BaseControllerService;
    public saveData: SaveData;
    public router: Router;

    public loginForm: FormGroup;
    public errorMessage: string;

    private utilsService: UtilityService;
    private localStorageService: LocalStorageService;
    public rememberMe = false;
    public submitted = false;
    public openedLogin = false;
    // public isUserIconHidden;
    // public isPasswordIconHidden;
    protected location:Location;

    public changePasswordType: boolean = false;
    public loginFieldsList: Array<any> = [];
    public formReady;

    constructor(public injector: Injector)
    {
        super(injector);
        this.fb = injector.get(FormBuilder);
        this.userLogined = injector.get(UserLogined);
        this.utilsService = injector.get(UtilityService);
        this.saveData = injector.get(SaveData);
        this.router = injector.get(Router);
        this.localStorageService = injector.get(LocalStorageService);
        this.baseControllerService = injector.get(BaseControllerService);
        this.rememberMe = !!this.localStorageService.get('login');
        this.location = injector.get(Location);
        // this.loginForm = this.fb.group({});
        // this.loginForm = this.fb.group({
        //     ClientIdentifier: [this.localStorageService.get('login') || '', [
        //         Validators.required,
        //         Validator.noWhitespaceValidator
        //     ]],
        //     Password: [null, [
        //         Validators.required
        //     ]]
        // });
        this.getFormControlNames();
    }

    getFormControlNames() {
        let loginGroup = {};
        this.baseControllerService.GetMenu(MenuType.LOGIN, 'en').then((menuData) => {
            this.loginFieldsList = this.parseStyleProperties(menuData[0].SubMenu);
            this.loginFieldsList.forEach((input_template) => {

                if (input_template.ValidationName) {
                    loginGroup[input_template.Title] = new FormControl('', [Validators.required]);
                    if (input_template.Title === 'ClientIdentifier') {
                        loginGroup[input_template.Title] = new FormControl(this.localStorageService.get('login') || '', [Validators.required]);
                    } else {
                        loginGroup[input_template.Title] = new FormControl('', [Validators.required]);
                    }
                    if (input_template.Type == 'checkbox') {
                        loginGroup[input_template.Title].setValidators([Validators.requiredTrue]);
                    }

                    if (input_template.Type == 'password') {
                        const savedPassword = this.localStorageService.get('identifier');
                        if(savedPassword) {
                            loginGroup[input_template.Title] = new FormControl(atob(savedPassword), [Validators.required]);
                        }
                    }
                } else {
                    if (input_template.Type == 'checkbox') {
                        if (input_template.Title === 'RememberMe') {
                            loginGroup[input_template.Title] = new FormControl(this.rememberMe, []);
                        } else {
                            loginGroup[input_template.Title] = new FormControl(false, []);
                        }
                    } else {
                        loginGroup[input_template.Title] = new FormControl('', []);
                    }
                }
            });
            this.loginForm = new FormGroup(loginGroup);
            this.formReady = true;
        });
    }

    ngOnInit() {
        this.subscriptions.push(this.userLogined.onLoginError$.subscribe((data) => {
            this.utilsService.showMessageWithDelay(this, [{'errorMessage': data.message}]);
            this.submitted = false;
        }));
        this.openedLogin = true;
    }

    public changePassType() {
        this.changePasswordType = !this.changePasswordType;
    }


    public submit(): any
    {
        this.loginForm.markAllAsTouched();
        this.submitted = true;
        if (this.loginForm.valid) {
            const params = this.loginForm.getRawValue();
            this.userLogined.userLogin(params, false, params?.RememberMe);
        }
    }

    public openForgotPage() {
        this.saveData.clickForgotPassword.next('1');
        this.router.navigate(['/forgot-password']);
    }

    public redirectToSocialProviderLoginPage(provider)
    {
        if(provider.ProviderId)
        {
            window.location.href = provider.ProviderId;
        }
    }
    openModal(type, event) {
        event.stopPropagation();
        if (type === 'Register') {
            this.saveData.clickForgotPassword.next('1');
            this.saveData.openPopup.next(2);
            this.openedLogin = true;
            if (this.loginForm.valid) {
                event.preventDefault();
            }
        } else {
            if (this.loginForm.valid) {
                event.preventDefault();
            }
        }
    }

    parseStyleProperties(stylesList) {
        return stylesList.filter((item) => {
            let parseInfoData = JSON.parse(item.Href);
            if (parseInfoData['FieldSize'] == undefined) {
                item['FieldSize'] = parseInfoData['size'];
            }

            if (parseInfoData['mandatory'] == undefined) {
                item['ValidationName'] = false;
            } else {
                item['ValidationName'] = parseInfoData['mandatory'] == '1' ? true : false;
            }
            if (parseInfoData['hasLabel'] == undefined) {
                item['HasLabel'] = false;
            } else {
                item['HasLabel'] = parseInfoData['hasLabel'] == '1' ? true : false;
            }
            return item;
        });
    }

}
