import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../app/config.service';
import {Request} from "@core/models";
import {LocalStorageService} from "@core/services/app/localStorage.service";
import {Controllers, Methods, VerificationCodeTypes, VerificationTypes} from "@core/enums";
import {Observable, Subject, take, tap} from "rxjs";
import {BaseApiService} from "@core/services/api/base-api.service";

@Injectable()
export class VerificationService
{

  public userData: any;

  public notifyMobileNumberVerify:Subject<any> = new Subject<any>();
  public notifyMobileNumberVerifyError:Subject<any> = new Subject<any>();

  public notifyEmailSuccessfullyVerified:Subject<any> = new Subject<any>();
  public notifyEmailVerificationError:Subject<any> = new Subject<any>();

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private baseApiService:BaseApiService,
              private configService: ConfigService)
  {
    this.userData = this.localStorageService.get("user");
  }

  public getSettings()
  {
    return this.configService.defaultOptions;
  }


  getVerificationCode(mobileOrEmail:'email'| 'mobile', verificationType = null):Observable<any>
  {
    const {WebApiUrl, PartnerId} = this.getSettings();
    this.userData = this.localStorageService.get('user');
    let request = new Request();
    request.Controller = Controllers.CLIENT;
    request.Token = this.userData.Token;
    request.PartnerId = PartnerId;
    request.ClientId = this.userData.Id;
    if(verificationType)
    {
      const payload = {
        ClientId:this.userData.Id,
        MobileNumber:this.userData.MobileNumber,
        Email:this.userData.Email,
        Type:verificationType
      }
      const method = mobileOrEmail == 'email' ? Methods.SEND_EMAIL_CODE : Methods.SEND_SMS_CODE;
      return this.baseApiService.apiRequest(payload,
          Controllers.MAIN, method, false);
    }
    else
    {
      request.Method = mobileOrEmail == 'email' ? Methods.SEND_VERIFICATION_CODE_TO_EMAIL : Methods.SEND_VERIFICATION_CODE_TO_MOBILE_NUMBER;
      request.RequestData = JSON.stringify({
        ...(mobileOrEmail == 'email' ? { Email: this.userData.Email } : { MobileNumber:this.userData.MobileNumber })
      });
      return  this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request);
    }
  }

  public sendVerificationCode(type:string, code:string, securityQuestions?:string)
  {
    const {WebApiUrl, PartnerId} = this.getSettings();
    let request = new Request();
    request.Token = this.userData.Token;
    request.PartnerId = PartnerId;
    request.Controller = Controllers.CLIENT;
    request.ClientId = this.userData.Id,
    request.Method = type == VerificationTypes.EMAIL ? Methods.VERIFY_CLIENT_EMAIL : Methods.VERIFY_CLIENT_MOBILE_NUMBER;
    request.RequestData = JSON.stringify({
      Key:code,
      SecurityQuestions:securityQuestions
    });
   return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).pipe(take(1), tap(data => {
     if (data['ResponseCode'] == 0 || data['ResponseCode'] ==  96)
     {
       if(type == VerificationTypes.MOBILE)
       {
         this.userData.IsMobileNumberVerified = true;
         this.localStorageService.add('user', this.userData);
         this.notifyMobileNumberVerify.next(true);
       }
       else if(type == VerificationTypes.EMAIL)
       {
         this.userData.IsEmailVerified = true;
         this.localStorageService.add('user', this.userData);
         this.notifyEmailSuccessfullyVerified.next(null);
       }
     }
     else
     {
       if(type == VerificationTypes.MOBILE)
       {
         this.notifyMobileNumberVerifyError.next(data['Description']);
       }
       else if(type == VerificationTypes.EMAIL)
       {
         this.notifyEmailVerificationError.next(data['Description']);
       }
     }
   }));
  }

}

