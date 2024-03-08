import {Directive, Injector} from '@angular/core';
import {Location} from '@angular/common';
import {LocalStorageService} from "@core/services";
import {BaseComponent} from '../../../../../../@theme/components/base/base.component';
import {Validator} from '../../../../../../@core/validators/validators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SaveData} from "@core/services";
import {Router} from "@angular/router";
import {UserLogined} from "@core/services/app/userLogined.service";
import {UtilityService} from "@core/services/app/utility.service";

@Directive()
export class AppCommonLoginComponent extends BaseComponent {

    public fb: FormBuilder;
    public userLogined: UserLogined;
    public saveData: SaveData;
    public router: Router;

    public loginForm: FormGroup;
    public errorMessage: string;

    private utilsService: UtilityService;
    private localStorageService: LocalStorageService;
    public rememberMe: boolean;
    public submitted = false;
    public openedLogin = false;
    // public isUserIconHidden;
    // public isPasswordIconHidden;
    protected location:Location;

    public changePasswordType: boolean = false;

    constructor(public injector: Injector)
    {
        super(injector);
        this.fb = injector.get(FormBuilder);
        this.userLogined = injector.get(UserLogined);
        this.utilsService = injector.get(UtilityService);
        this.saveData = injector.get(SaveData);
        this.router = injector.get(Router);
        this.localStorageService = injector.get(LocalStorageService);
        this.rememberMe = !!this.localStorageService.get('login');
        this.location = injector.get(Location);
        this.loginForm = this.fb.group({
            ClientIdentifier: [this.localStorageService.get('login') || '', [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            Password: [null, [
                Validators.required
            ]]
        });
    }

    ngOnInit() {
        this.subscriptions.push(this.userLogined.onLoginError$.subscribe((data) => {
            this.utilsService.showMessageWithDelay(this, [{'errorMessage': data.message}]);
            this.submitted = false;
        }));
        this.openedLogin = true;
        const savedPassword = this.localStorageService.get('identifier');
        if(savedPassword)
            this.loginForm.get("Password").setValue(atob(savedPassword));
    }

    public changePassType() {
        this.changePasswordType = !this.changePasswordType;
    }


    public submit(): any
    {
        this.submitted = true;
        if (this.loginForm.valid) {
            const params = this.loginForm.getRawValue();
            this.userLogined.userLogin(params, false, this.rememberMe);
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

}
