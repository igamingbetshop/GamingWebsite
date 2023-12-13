import {Injectable} from '@angular/core';
import {UserDataService} from '../api/userData.service'
import {LocalStorageService} from './localStorage.service';
import {DefaultService} from '../api/default.service';
import {LogoutHelper} from '../helpers/logout.helper';
import {ConfigService} from './config.service';
import {Subject} from "rxjs";

@Injectable()
export class BaseService {

  public userData: any;
  public defaultOption: any;
  public notifyGetResetPasswordError: Subject<any> = new Subject<any>();
  public notifyGetForGotPasswordError: Subject<any> = new Subject<any>();

  constructor(private userDataService: UserDataService,
              private localStorageService: LocalStorageService,
              private defaultService: DefaultService,
              private logoutHelper: LogoutHelper,
              private configService: ConfigService) {
    this.userData = this.localStorageService.get('user');
    this.defaultOption = this.configService.defaultOptions;
  }

  public async logOut() {
    const params = {
      'Method': 'LogoutClient',
      'Controller': 'Client',
      'Token': this.userData.Token,
      'ClientId': this.userData.Id
    };

    await this.defaultService.defaultRequest(params);
    this.logoutHelper.logout();
  }

  public async getBalance() {
    const data = {
      'Token': this.userData.Token,
      'ClientId': this.userData.Id,
      'Loader': false,
      'RequestData': JSON.stringify({
        'CurrencyId': this.userData.CurrencyId
      })
    };

    return await this.userDataService.getBalance(data);
  }

  public async getBonuses() {
    const input = {
      "Controller": "Document",
      "Method": "GetBonuses",
      "ClientId": this.userData.Id,
      "Token": this.userData.Token,
      "PartnerId": this.defaultOption.PartnerId,
      "RequestData": 6
    };


    return await this.defaultService.defaultRequest(input);

  }

  public resetPassword(data) {
    const input = {
      RecoveryToken: data['RecoveryToken'],
      Password: data['Password'],
      NewPassword: data['ConfirmPassword'],
      LanguageId: localStorage.getItem('lang'),
      SecurityQuestions:data.SecurityQuestions
    };

    return this.userDataService.getrecoverPassword(input)

  }

  public forgotPassword(data)
  {
    let input = {
      EmailOrMobile: data['fEmail'],
      LanguageId: localStorage.getItem('lang') || this.defaultOption.DefaultLanguage,
      PartnerId: this.defaultOption.PartnerId,
      ReCaptcha:data.ReCaptcha
    };
    return this.userDataService.sendRecoveryToken(input);
  }

}
