import {Directive, Injector} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {VerificationService} from "@core/services/api/verification.service";
import {getParsedUrl} from "@core/utils";
import {VerificationTypes} from "@core/enums";
import {UserLogined} from "@core/services/app/userLogined.service";


@Directive()
export class BaseEmailVerifyComponent extends BaseComponent
{
  public isEmailVerified: boolean;
  public isEmailNotVerified:boolean;

  private verificationService:VerificationService;
  private loginService:UserLogined;
  constructor(injector: Injector)
  {
    super(injector);
    this.loginService = injector.get(UserLogined);
    this.verificationService = injector.get(VerificationService);
  }

  ngOnInit()
  {
    super.ngOnInit();
    let urlKey = getParsedUrl(location.toString())["key"];

    this.subscriptions.push(this.verificationService.notifyEmailSuccessfullyVerified.subscribe(data => {
      this.isEmailVerified = true;
    }));

    this.subscriptions.push(this.verificationService.notifyEmailVerificationError.subscribe(data => {
      this.isEmailNotVerified = true;
    }));

    if (this.loginService.isAuthenticated)
    {
      this.verificationService.sendVerificationCode(VerificationTypes.EMAIL, urlKey).subscribe(data => {});
    }
    else alert("Please login for verification");
  }
}
